import { useEffect, useState } from "react";
import { CountUpComponent } from "../../../../Animations/CountUp";
import { useStudentsData } from "../../../../Hooks/useMockData";

const Analytics = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const [view, setView] = useState("analytics");

  const { studentsList } = useStudentsData(view);

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
