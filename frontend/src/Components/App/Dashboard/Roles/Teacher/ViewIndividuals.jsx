import { useEffect, useState } from "react";
import {
  useParentChildrenData,
  useUserByIdData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import { Link, useParams } from "react-router-dom";
import PageLoader from "../../../../Animations/PageLoader";
import ChartComponent from "../../../../Custom/Chart/ChartComponent";
import {
  AddChildForm,
  AttendanceSubmitForm,
  SubjectGradeForm,
} from "../../../../Custom/Forms/Forms";
import { LuMessageCircle } from "react-icons/lu";

const ViewIndividuals = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { userId } = useParams();

  const [view, setView] = useState("addChildren");

  const { userData, isUserDataLoading } = useUserData();
  const { userByIdData, isUserByIdDataLoading, refetchUserById } =
    useUserByIdData(userId);

  const { role } = userData || {};
  const {
    _id,
    role: userByIdRole,
    name,
    grades,
    attendance = 0,
    children,
  } = userByIdData || {};

  const {
    parentChildrenData,
    isParentChildrenDataLoading,
    refetchParentChildren,
  } = useParentChildrenData(children);

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

  // children list
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
      </li>
    );
  });

  if (
    isUserByIdDataLoading ||
    isUserDataLoading ||
    isParentChildrenDataLoading
  ) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="manageUsers">
      <div className="viewIndividual-one">
        <h2>{name}</h2>
        <Link to={`/teacher/message/${_id}`}>
          <LuMessageCircle size={30} />
          <p>Message</p>
        </Link>
      </div>

      {userByIdRole !== "student" && (
        <>
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
              refetchUser={refetchUserById}
              refetchChildren={refetchParentChildren}
            />
          )}

          {/* view children form */}
          {view === "viewChildren" && (
            <>
              {childrenList.length === 0 ? (
                <>You have not added a child yet!</>
              ) : (
                <ul className="usersList">{childrenList}</ul>
              )}
            </>
          )}
        </>
      )}

      {userByIdRole !== "parent" && (
        <>
          {role === "teacher" && (
            <>
              <SubjectGradeForm
                refetchStudent={refetchUserById}
                studentId={_id}
              />
              <AttendanceSubmitForm
                refetchStudent={refetchUserById}
                studentId={_id}
              />
            </>
          )}

          {grades?.length > 0 ? (
            <ChartComponent
              key={""}
              type="bar"
              data={gradeDistributionData}
              options={gradeDistributionOptions}
            />
          ) : (
            <p>Graph will be available after grading students</p>
          )}

          <div>
            <p>
              Performance <progress value={grade} max="100"></progress>
            </p>
            <p>
              Attendance <progress value={attendance} max="100"></progress>
            </p>
            <p>
              Behavior <progress value={behavior} max="100"></progress>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewIndividuals;
