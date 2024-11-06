import { useState } from "react";
import { CountUpComponent } from "../../../../Animations/CountUp";
import { useRandomUsersData } from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";

const Analytics = () => {
  const [view, setView] = useState("analytics");

  const { randomUsersData, isRandomUsersDataLoading } = useRandomUsersData();

  if (isRandomUsersDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const { results } = randomUsersData || {};

  // output students attendance and behavior
  const studentsList = results?.map((student, i) => (
    <li key={student.id.value || i}>
      <h4>
        Name: {student.name.first} {student.name.last}
      </h4>
      <p>
        Attendance <progress value="95" max="100"></progress>
      </p>
      <p>
        Behavior <progress value="80" max="100"></progress>
      </p>
    </li>
  ));

  return (
    <div className="manageUsers">
      <div className="toggleBtn">
        <button
          className={`${view === "analytics" && "activeBtn"}`}
          onClick={() => {
            setView("analytics");
          }}>
          Analytics
        </button>
        <button
          className={`${view === "attendance" && "activeBtn"}`}
          onClick={() => {
            setView("attendance");
          }}>
          Attendance & Behaviors
        </button>
      </div>

      {view === "analytics" && <CountUpComponent />}

      {view === "attendance" && <ul className="usersList">{studentsList}</ul>}
    </div>
  );
};

export default Analytics;
