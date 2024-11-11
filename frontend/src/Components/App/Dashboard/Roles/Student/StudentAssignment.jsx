import { Link } from "react-router-dom";
import PageLoader from "../../../../Animations/PageLoader";
import {
  useAssignmentsData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import { FcProcess } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { useState } from "react";

const StudentAssignment = () => {
  const [view, setView] = useState("active-assignment");
  const [filterAssignment, setFilterAssignment] = useState(true);

  const { userData, isUserDataLoading } = useUserData();
  const { assignmentsData, isAssignmentsDataLoading } = useAssignmentsData();

  const { _id } = userData || {};

  if (isUserDataLoading || isAssignmentsDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  // filter assignments
  const filteredAssignments = assignmentsData?.filter(
    (assignment) => assignment.active === filterAssignment
  );

  const assignmentsList = filteredAssignments?.map((assignment) => {
    const students = assignment?.students;
    // check if user has done the assignment by checking if hes part of the students
    const doneAssignment = students.some(
      (student) => student.studentId === _id
    );

    return (
      <li key={assignment._id}>
        <Link to={`/assignment/${assignment._id}`}>
          <h4>Name: {assignment.assignmentTitle}</h4>
          <p>Description: {assignment.assignmentDescription}</p>
          <p>
            Active:{" "}
            {assignment.active ? (
              <>
                Ongoing <FcProcess />
              </>
            ) : (
              <>
                Closed <MdCancel />
              </>
            )}
          </p>
          <strong>
            Status:{" "}
            {doneAssignment
              ? "You have done this assignment"
              : "You are yet to do this assignment"}
          </strong>
          <p>{new Date(assignment.createdAt).toLocaleDateString()}</p>
        </Link>
      </li>
    );
  });

  return (
    <div className="manageUsers">
      <h2>Assignments</h2>
      <div className="toggleBtn">
        <button
          className={`${view === "active-assignment" && "activeBtn"}`}
          onClick={() => {
            setView("active-assignment");
            setFilterAssignment(true);
          }}>
          Active
        </button>
        <button
          className={`${view === "notActive-assignment" && "activeBtn"}`}
          onClick={() => {
            setView("notActive-assignment");
            setFilterAssignment(false);
          }}>
          Non Active
        </button>
      </div>

      {assignmentsList?.length === 0 ? (
        <p>No assignments yet</p>
      ) : (
        <ul className="usersList">{assignmentsList}</ul>
      )}
    </div>
  );
};

export default StudentAssignment;
