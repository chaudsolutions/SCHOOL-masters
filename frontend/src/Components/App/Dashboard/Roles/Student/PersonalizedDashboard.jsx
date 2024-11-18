import { useEffect, useState } from "react";
import {
  useAssignmentsData,
  useExamsData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import ChartComponent from "../../../../Custom/Chart/ChartComponent";
import { Link } from "react-router-dom";
import { FcProcess } from "react-icons/fc";
import { MdCancel } from "react-icons/md";

const PersonalizedDashboard = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const [view, setView] = useState("dashboard");

  const { userData, isUserDataLoading } = useUserData();
  const { assignmentsData, isAssignmentsDataLoading } = useAssignmentsData();
  const { examsData, isExamsDataLoading } = useExamsData();

  const { name, grades, attendance = 0 } = userData || {};
  const { from, to } = examsData[0] || {};

  const grade =
    grades?.reduce((acc, current) => acc + current.score, 0) / grades?.length;

  const behavior = (grade + attendance) / 2;

  const gradeDistributionData = {
    labels: grades?.map((grade) => grade.subject), // Grade labels
    datasets: [
      {
        label: "Subjects",
        data: grades?.map((grade) => grade.score), // Example data - replace with dynamic data
        backgroundColor: [
          "#4CAF50",
          "#FFC107",
          "#2196F3",
          "#FF5722",
          "#9E9E9E",
        ],
      },
    ],
  };

  const gradeDistributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grade Distribution",
      },
    },
  };

  // assignments list
  // filter assignments
  const filteredAssignments = assignmentsData?.filter(
    (assignment) => assignment.active
  );

  const assignmentsList = filteredAssignments?.map((assignment) => (
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

  if (isUserDataLoading || isAssignmentsDataLoading || isExamsDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <h2>Hy {name}</h2>

      <div className="toggleBtn">
        <button
          className={`${view === "dashboard" && "activeBtn"}`}
          onClick={() => {
            setView("dashboard");
          }}>
          Dashboard
        </button>
        <button
          className={`${view === "assignments" && "activeBtn"}`}
          onClick={() => {
            setView("assignments");
          }}>
          Assignments
        </button>
        <button
          className={`${view === "exams" && "activeBtn"}`}
          onClick={() => {
            setView("exams");
          }}>
          Exams
        </button>
      </div>

      {/* dashboard view */}
      {view === "dashboard" && (
        <div className="dashboard-overview">
          <div>
            <p>
              <span>Performance</span>{" "}
              <progress value={grade} max="100"></progress>
            </p>
            <p>
              <span>Attendance</span>{" "}
              <progress value={attendance} max="100"></progress>
            </p>
            <p>
              <span>Behavior</span>{" "}
              <progress value={behavior} max="100"></progress>
            </p>
          </div>

          <div>
            {grades?.length > 0 ? (
              <ChartComponent
                key={view}
                type="bar"
                data={gradeDistributionData}
                options={gradeDistributionOptions}
              />
            ) : (
              <p>Graph will be available after You have been graded</p>
            )}
          </div>
        </div>
      )}

      {/* assignments view */}
      {view === "assignments" && (
        <>
          {assignmentsData?.length === 0 ? (
            <p>No assignments yet</p>
          ) : (
            <ul className="usersList">{assignmentsList}</ul>
          )}
        </>
      )}

      {/* exams view */}
      {view === "exams" && (
        <>
          {examsData?.length === 0 ? (
            <p>No upcoming exams yet</p>
          ) : (
            <p>
              {new Date(from).toLocaleDateString()} to{" "}
              {new Date(to).toLocaleDateString()}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalizedDashboard;
