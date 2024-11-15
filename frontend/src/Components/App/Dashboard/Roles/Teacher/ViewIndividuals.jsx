import { useEffect } from "react";
import {
  useUserByIdData,
  useUserData,
} from "../../../../Hooks/useQueryFetch/useQueryData";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageLoader from "../../../../Animations/PageLoader";
import ChartComponent from "../../../../Custom/Chart/ChartComponent";
import {
  AttendanceSubmitForm,
  SubjectGradeForm,
} from "../../../../Custom/Forms/Forms";
import { LuMessageCircle } from "react-icons/lu";

const ViewIndividuals = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const navigate = useNavigate();
  const { userRole, userId } = useParams();

  useEffect(() => {
    if (userRole !== "student") {
      navigate("/dashboard");
    }
  }, [userRole, navigate]);

  const { userData, isUserDataLoading } = useUserData();
  const { userByIdData, isUserByIdDataLoading, refetchUserById } =
    useUserByIdData(userId);

  const { role } = userData || {};
  const { _id, name, grades, attendance = 0 } = userByIdData || {};

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

  if (isUserByIdDataLoading || isUserDataLoading) {
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

      {role === "teacher" && (
        <>
          <SubjectGradeForm refetchStudent={refetchUserById} studentId={_id} />
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
    </div>
  );
};

export default ViewIndividuals;
