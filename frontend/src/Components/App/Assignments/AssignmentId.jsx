import { useParams } from "react-router-dom";
import {
  useAssignmentsByIdData,
  useUserData,
} from "../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../Animations/PageLoader";
import { SubmitAssignmentForm } from "../../Custom/Forms/Forms";

const AssignmentsId = () => {
  const { assignmentId } = useParams();

  const { userData, isUserDataLoading } = useUserData();
  const {
    assignmentByIdData,
    isAssignmentByIdDataLoading,
    refetchAssignmentById,
  } = useAssignmentsByIdData(assignmentId);

  const { role, _id } = userData || {};
  const { assignmentTitle, assignmentDescription, students } =
    assignmentByIdData || {};

  // check if student has done the assignment
  const doneAssignment = students?.includes(_id);

  // students list
  const studentsList = students?.map((student) => <li key={student._id}></li>);

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
      <p>{assignmentDescription}</p>

      {/* view for teacher and student */}
      {role === "teacher" && <ul>{studentsList}</ul>}
      {role === "student" && (
        <SubmitAssignmentForm
          refetchAssignment={refetchAssignmentById}
          assignmentId={assignmentId}
        />
      )}
    </div>
  );
};

export default AssignmentsId;
