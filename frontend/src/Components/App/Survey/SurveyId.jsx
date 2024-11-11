import { useNavigate, useParams } from "react-router-dom";
import {
  useSurveyIdData,
  useUserData,
} from "../../Hooks/useQueryFetch/useQueryData";
import PageLoader from "../../Animations/PageLoader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ButtonLoad from "../../Animations/ButtonLoad";
import axios from "axios";
import { serVer, useToken } from "../../Hooks/useVariable";

const SurveyId = () => {
  const { surveyId } = useParams();

  const { token } = useToken();

  const navigate = useNavigate();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  const { userData, isUserDataLoading } = useUserData();
  const { surveyIdData, isSurveyIdDataLoading } = useSurveyIdData(surveyId);

  const { title, questions } = surveyIdData || {};
  const { role } = userData || {};

  // map questions into DOM for users
  const questionsList = questions?.map((question) => (
    <div key={question?._id} className="inputContainer">
      <label htmlFor={question?.text}>{question?.text}</label>
      <input
        id={question?.text}
        type="text"
        placeholder={question?.text}
        {...register(`answers.${question?._id}`, {
          required: `${question?.text} is required`,
        })}
      />
      <p>{errors.answers?.[question?._id]?.message}</p>
    </div>
  ));

  // map questions and answers into DOM for admin
  const surveyDetails = questions?.map((question) => (
    <li key={question._id}>
      <h4>Question: {question.text}</h4>
      <ul>
        {question.answers.map((answer, i) => (
          <li key={i}>-{answer}</li>
        ))}
      </ul>
    </li>
  ));

  // Function to register
  const onSubmit = async (data) => {
    // Prepare the answers in the correct format for the backend
    const answers = Object.keys(data.answers).map((questionId) => ({
      questionId,
      answer: data.answers[questionId],
    }));

    try {
      const res = await axios.put(
        `${serVer}/user/addSurvey/${surveyId}`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      reset();

      toast.success(res.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const onError = () => {
    toast.error("Failed to submit, check inputs and try again");
  };

  // delete survey function
  const deleteSurvey = async () => {
    const userConfirmed = confirm("Are you sure");

    if (userConfirmed) {
      try {
        const res = await axios.delete(
          `${serVer}/admin/deleteSurvey/${surveyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        navigate("/surveys");

        toast.success(res.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  };

  if (isSurveyIdDataLoading || isUserDataLoading) {
    <div className="loader-container">
      <PageLoader />
    </div>;
  }

  return (
    <div className="manageUsers">
      <h2>{title}</h2>

      {role === "admin" ? (
        <>
          <ul className="usersList">{surveyDetails}</ul>
          <button onClick={deleteSurvey} className="deleteBtn">
            Delete
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <ul>{questionsList}</ul>

          <button type="submit" disabled={isSubmitting} className="submitBtn">
            {isSubmitting ? <ButtonLoad /> : <>Submit Survey</>}
          </button>
        </form>
      )}
    </div>
  );
};

export default SurveyId;
