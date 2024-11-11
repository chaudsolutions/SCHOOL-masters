import { useState } from "react";
import {
  generateMockClasses,
  useStudentsData,
} from "../../../../Hooks/useMockData";

const Overview = () => {
  const [view, setView] = useState("class");
  const [classes] = useState(generateMockClasses());

  const { studentsList } = useStudentsData(view);

  const classList = classes?.map((item) => (
    <li key={item.id}>
      <h4>{item.className}</h4>
      <p>{item.subject}</p>
      <p>time: 40mins</p>
    </li>
  ));

  return (
    <div className="manageUsers">
      <div className="toggleBtn">
        <button
          className={`${view === "class" && "activeBtn"}`}
          onClick={() => {
            setView("class");
          }}>
          Classes
        </button>
        <button
          className={`${view === "student" && "activeBtn"}`}
          onClick={() => {
            setView("student");
          }}>
          Students
        </button>
      </div>

      {view === "class" && <ul className="usersList">{classList}</ul>}
      {view === "student" && <ul className="usersList">{studentsList}</ul>}
    </div>
  );
};

export default Overview;
