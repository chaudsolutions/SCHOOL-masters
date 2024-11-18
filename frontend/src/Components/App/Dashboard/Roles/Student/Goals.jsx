import { useEffect, useState } from "react";
import { SetGoalForm } from "../../../../Custom/Forms/Forms";
import { useUserData } from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import { differenceInDays } from "date-fns";
import axios from "axios";
import { serVer, useToken } from "../../../../Hooks/useVariable";
import toast from "react-hot-toast";
import ButtonLoad from "../../../../Animations/ButtonLoad";

const Goals = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { token } = useToken();

  const [view, setView] = useState("set-goals");
  const [deleteBtn, setDeleteBtn] = useState("Delete Goal");
  const [progressBtn, setProgressBtn] = useState("Update Progress");
  const [progress, SetProgress] = useState(0);

  const { userData, isUserDataLoading, refetchUserData } = useUserData();

  const { goals } = userData || {};

  //   goals list
  const goalsList = goals
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.map((goal) => {
      // delete goal function
      const deleteGoal = async () => {
        const isConfirmed = confirm("Are you sure you want to delete");

        if (isConfirmed) {
          setDeleteBtn(<ButtonLoad />);

          try {
            const res = await axios.delete(
              `${serVer}/student/goal/${goal._id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            await refetchUserData();

            toast.success(res.data);
          } catch (error) {
            toast.error(error.response.data);
          } finally {
            setDeleteBtn("Delete Goal");
          }
        }
      };

      // update progress function
      const updateGoalProgress = async () => {
        if (progress > 100 || progress < 1) {
          toast.error("Progress must be between 1 and 100");
          return;
        }

        try {
          const res = await axios.put(
            `${serVer}/student/goal/progress/${goal._id}`,
            { progress },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          await refetchUserData();

          SetProgress(0);

          toast.success(res.data);
        } catch (error) {
          toast.error(error.response.data);
        } finally {
          setProgressBtn("Update Progress");
        }
      };

      return (
        <li key={goal._id}>
          <h3>Goal: {goal.goal}</h3>
          <progress value={goal.progress} max="100">
            {goal.progress}%
          </progress>
          <p>
            Ends In: {differenceInDays(goal.dueDate, goal.createdAt)} day(s)
          </p>

          <div className="updateInput">
            {goal.progress < 100 && (
              <input
                type="number"
                placeholder="progress"
                value={progress}
                onChange={(e) => SetProgress(e.target.value)}
              />
            )}
            <div>
              {goal.progress < 100 && (
                <button className="updateBtn" onClick={updateGoalProgress}>
                  {progressBtn}
                </button>
              )}
              <button className="deleteBtn" onClick={deleteGoal}>
                {deleteBtn}
              </button>
            </div>
          </div>
        </li>
      );
    });

  if (isUserDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <div className="toggleBtn">
        <button
          className={`${view === "set-goals" && "activeBtn"}`}
          onClick={() => {
            setView("set-goals");
          }}>
          Set Goals
        </button>
        <button
          className={`${view === "view-goals" && "activeBtn"}`}
          onClick={() => {
            setView("view-goals");
          }}>
          View Goals
        </button>
      </div>

      {view === "set-goals" && <SetGoalForm refetchStudent={refetchUserData} />}

      {view === "view-goals" && (
        <>
          {goals?.length === 0 ? (
            <p>No Goals created Yet...</p>
          ) : (
            <ul className="usersList">{goalsList}</ul>
          )}
        </>
      )}
    </div>
  );
};

export default Goals;
