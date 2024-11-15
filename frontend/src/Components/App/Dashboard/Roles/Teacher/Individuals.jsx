import { useEffect, useState } from "react";
import { useAllUsersData } from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import { Link } from "react-router-dom";
import ChartComponent from "../../../../Custom/Chart/ChartComponent";

const Individuals = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const [view, setView] = useState("student");

  const { allUsersData, isAllUsersDataLoading } = useAllUsersData("all");

  if (isAllUsersDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const filteredUsers = allUsersData?.filter((user) => user.role === view);

  const usersList = filteredUsers?.map((user) => {
    const { grades, attendance = 0 } = user;

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

    return (
      <li key={user._id}>
        <Link to={`/view/${user.role}/${user._id}`}>
          <h4>Name: {user.name}</h4>
          {user.role === "student" ? (
            <>
              <p>
                Performance <progress value={grade} max="100"></progress>
              </p>
              <p>
                Attendance <progress value={attendance} max="100"></progress>
              </p>
              <p>
                Behavior <progress value={behavior} max="100"></progress>
              </p>
            </>
          ) : (
            <>Children</>
          )}

          {user.role === "student" && (
            <>
              {grades?.length > 0 ? (
                <ChartComponent
                  key={view}
                  type="bar"
                  data={gradeDistributionData}
                  options={gradeDistributionOptions}
                />
              ) : (
                <p>Graph will be available after grading students</p>
              )}
            </>
          )}
        </Link>
      </li>
    );
  });

  return (
    <div className="manageUsers">
      <div className="toggleBtn">
        <button
          className={`${view === "student" && "activeBtn"}`}
          onClick={() => {
            setView("student");
          }}>
          Students
        </button>
        <button
          className={`${view === "parent" && "activeBtn"}`}
          onClick={() => {
            setView("parent");
          }}>
          Parents
        </button>
      </div>

      <ul className="usersList">{usersList}</ul>
    </div>
  );
};

export default Individuals;
