import { useParams } from "react-router-dom";
import {
  useAssignmentsByIdData,
  useUserData,
} from "../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../Animations/PageLoader";
import {
  GradeAssignmentForm,
  SubmitAssignmentForm,
} from "../../Custom/Forms/Forms";
import { useEffect } from "react";
import "./assignment.css";
import toast from "react-hot-toast";
import { serVer, useToken } from "../../Hooks/useVariable";
import axios from "axios";

const AssignmentsId = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { assignmentId } = useParams();

  const { token } = useToken();

  const { userData, isUserDataLoading } = useUserData();
  const {
    assignmentByIdData,
    isAssignmentByIdDataLoading,
    refetchAssignmentById,
  } = useAssignmentsByIdData(assignmentId);

  const { role, _id } = userData || {};
  const { assignmentTitle, assignmentDescription, active, students } =
    assignmentByIdData || {};

  const activeAssignment = active ? "End Assignment" : "Resume Assignment";

  // check if student has done the assignment
  const doneAssignment = students?.some((student) => student.studentId === _id);
  // student grade
  const student = students?.find((student) => student.studentId === _id);
  const { grade } = student || {};

  // students list
  const studentsList = students?.map((student) => (
    <li key={student._id}>
      <h4>Name: {student.studentName}</h4>
      <h4>Email: {student.studentEmail}</h4>
      <p>Assignment: {student.assignmentDetails}</p>
      <p>Grade: {student.grade ? student.grade : "Not graded yet"}</p>

      {!student.grade && (
        <GradeAssignmentForm
          refetchAssignment={refetchAssignmentById}
          assignmentId={assignmentId}
          studentId={student.studentId}
        />
      )}
    </li>
  ));

  // func to end assignment
  const endAssignment = async () => {
    const isConfirmed = confirm("Are you sure");

    if (isConfirmed) {
      try {
        const res = await axios.put(
          `${serVer}/teacher/endAssignment/${assignmentId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await refetchAssignmentById();

        toast.success(res.data);
      } catch (e) {
        toast.error(e.response.data);
      }
    }
  };

  if (isAssignmentByIdDataLoading || isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <h2>{assignmentTitle}</h2>
      <p>Description: {assignmentDescription}</p>

      {/* view for teacher and student */}
      {role === "teacher" && (
        <>
          <div className="students">
            <h3>Students done assignment</h3>
            <ul className="usersList">{studentsList}</ul>
          </div>

          <button
            className="endBtn"
            onClick={endAssignment}
            style={{
              backgroundColor: !active ? "var(--accent-color)" : "red",
            }}>
            {activeAssignment}
          </button>
        </>
      )}

      {role === "student" && (
        <>
          {doneAssignment ? (
            <>
              {grade ? (
                <p>Your grade is: {grade}</p>
              ) : (
                <div>
                  <p>Assignment Submitted, wait for grading...</p>
                  <center>
                    <PageLoader />
                  </center>
                </div>
              )}
            </>
          ) : (
            <>
              {active ? (
                <SubmitAssignmentForm
                  refetchAssignment={refetchAssignmentById}
                  assignmentId={assignmentId}
                />
              ) : (
                <strong>This assignment is closed/has ended</strong>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AssignmentsId;
