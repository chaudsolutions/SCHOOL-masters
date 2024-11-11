import { Link } from "react-router-dom";
import PageLoader from "../../Animations/PageLoader";
import { useSurveyData } from "../../Hooks/useQueryFetch/useQueryData";

const Survey = () => {
  const { surveyData, isSurveyDataLoading } = useSurveyData();

  if (isSurveyDataLoading) {
    return (
      <div className="loader-container">
        <PageLoader />
      </div>
    );
  }

  const surveyList = surveyData?.map((survey) => (
    <li key={survey._id}>
      <Link to={`/survey/${survey._id}`}>
        <h4>{survey.title}</h4>
        <p>{new Date(survey.createdAt).toDateString()}</p>
      </Link>
    </li>
  ));

  return (
    <div className="manageUsers">
      <h2>Surveys</h2>

      {surveyData.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        <ul className="usersList">{surveyList}</ul>
      )}
    </div>
  );
};

export default Survey;
