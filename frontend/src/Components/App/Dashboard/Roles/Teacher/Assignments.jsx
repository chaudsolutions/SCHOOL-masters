import { useState } from "react";
import { CreateAssignment } from "../../../../Custom/Forms/Forms";
import { useAssignmentsData } from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import { Link } from "react-router-dom";
import { FcProcess } from "react-icons/fc";
import { MdCancel } from "react-icons/md";

const Assignments = () => {
  const [view, setView] = useState("create-assignment");

  const { assignmentsData, isAssignmentsDataLoading, refetchAssignments } =
    useAssignmentsData();

  if (isAssignmentsDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const assignmentsList = assignmentsData?.map((assignment) => (
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
        <p>Number of students done: {assignment.students?.length}</p>
        <p>{new Date(assignment.createdAt).toLocaleDateString()}</p>
      </Link>
    </li>
  ));

  return (
    <div className="manageUsers">
      <div className="toggleBtn">
        <button
          className={`${view === "create-assignment" && "activeBtn"}`}
          onClick={() => {
            setView("create-assignment");
          }}>
          Create
        </button>
        <button
          className={`${view === "grade-assignment" && "activeBtn"}`}
          onClick={() => {
            setView("grade-assignment");
          }}>
          Assignments
        </button>
      </div>

      {view === "create-assignment" && (
        <CreateAssignment refetchAssignments={refetchAssignments} />
      )}

      {view === "grade-assignment" && (
        <>
          {assignmentsData?.length === 0 ? (
            <p>No assignments yet</p>
          ) : (
            <ul className="usersList">{assignmentsList}</ul>
          )}
        </>
      )}
    </div>
  );
};

export default Assignments;
