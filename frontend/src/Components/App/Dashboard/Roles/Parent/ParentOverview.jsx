import { useEffect, useRef, useState } from "react";
import { AddChildForm } from "../../../../Custom/Forms/Forms";
import {
  useParentChildrenData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../../../Animations/PageLoader";
import ChartComponent from "../../../../Custom/Chart/ChartComponent";
import { useReactToPrint } from "react-to-print";

const ParentOverview = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  // Initialize the ref properly
  const contentRef = useRef(null);

  // Use the useReactToPrint hook
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Child Report",
  });

  const [view, setView] = useState("addChildren");
  const { userData, isUserDataLoading, refetchUserData } = useUserData();

  const { children } = userData || {};

  const {
    parentChildrenData,
    isParentChildrenDataLoading,
    refetchParentChildren,
  } = useParentChildrenData(children);

  // children list
  const childrenList = parentChildrenData?.map((child) => {
    const { grades, attendance = 0 } = child;

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
      <li key={child._id} className="child">
        <div ref={contentRef} className="contentP">
          <h3>{child.name}</h3>
          <h4>{child.email}</h4>
          <p>
            Performance <progress value={grade} max="100"></progress>
          </p>
          <p>
            Attendance <progress value={attendance} max="100"></progress>
          </p>
          <p>
            Behavior <progress value={behavior} max="100"></progress>
          </p>

          {grades?.length > 0 ? (
            <ChartComponent
              key={view}
              type="bar"
              data={gradeDistributionData}
              options={gradeDistributionOptions}
            />
          ) : (
            <p>Graph will be available after student has been graded</p>
          )}
        </div>

        <button onClick={reactToPrintFn} className="deleteBtn">
          Download Report
        </button>
      </li>
    );
  });

  if (isUserDataLoading || isParentChildrenDataLoading) {
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
          className={`${view === "addChildren" && "activeBtn"}`}
          onClick={() => {
            setView("addChildren");
          }}>
          Add a Child
        </button>
        <button
          className={`${view === "viewChildren" && "activeBtn"}`}
          onClick={() => {
            setView("viewChildren");
          }}>
          Children
        </button>
      </div>

      {/* add a child form */}
      {view === "addChildren" && (
        <AddChildForm
          refetchUser={refetchUserData}
          refetchChildren={refetchParentChildren}
        />
      )}

      {/* view children form */}
      {view === "viewChildren" && <ul className="usersList">{childrenList}</ul>}
    </div>
  );
};

export default ParentOverview;
