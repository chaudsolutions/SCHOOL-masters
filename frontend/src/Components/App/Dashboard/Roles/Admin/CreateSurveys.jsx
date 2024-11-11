import { useForm } from "react-hook-form";
import { serVer, useToken } from "../../../../Hooks/useVariable";
import axios from "axios";
import toast from "react-hot-toast";
import ButtonLoad from "../../../../Animations/ButtonLoad";

const CreateSurveys = () => {
  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { title } = data;

    const questions = [
      { text: data.questionOne, answers: [] },
      { text: data.questionTwo, answers: [] },
      { text: data.questionThree, answers: [] },
      { text: data.questionFour, answers: [] },
      { text: data.questionFive, answers: [] },
    ];

    try {
      const res = await axios.post(
        `${serVer}/admin/createSurvey`,
        { title, questions },
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

  return (
    <div className="manageUsers">
      <h2>Create a Survey</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Question One"
            {...register("questionOne", {
              required: "Question is required",
            })}
          />
          <p>{errors.questionOne?.message}</p>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Question Two"
            {...register("questionTwo", {
              required: "Question is required",
            })}
          />
          <p>{errors.questionTwo?.message}</p>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Question Three"
            {...register("questionThree", {
              required: "Question is required",
            })}
          />
          <p>{errors.questionThree?.message}</p>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Question Four"
            {...register("questionFour", {
              required: "Question is required",
            })}
          />
          <p>{errors.questionFour?.message}</p>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Question Five"
            {...register("questionFive", {
              required: "Question is required",
            })}
          />
          <p>{errors.questionFive?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="submitBtn">
          {isSubmitting ? <ButtonLoad /> : <>Create Announcement</>}
        </button>
      </form>
    </div>
  );
};

export default CreateSurveys;
