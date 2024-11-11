import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ButtonLoad from "../../Animations/ButtonLoad";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { serVer, useToken } from "../../Hooks/useVariable";
import PropTypes from "prop-types";

export const SendMessageForm = ({ refetchMessages }) => {
  SendMessageForm.propTypes = {
    refetchMessages: PropTypes.func.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { message } = data;

    try {
      const res = await axios.post(
        `${serVer}/admin/send/messages`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchMessages();

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
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Message"
          {...register("message", {
            required: "Message is required",
          })}
        />
        <p>{errors.message?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <IoSend />}
      </button>
    </form>
  );
};

export const CreateAssignment = ({ refetchAssignments }) => {
  CreateAssignment.propTypes = {
    refetchAssignments: PropTypes.func.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { assignmentTitle, assignmentDescription } = data;

    try {
      const res = await axios.post(
        `${serVer}/teacher/createAssignment`,
        { assignmentTitle, assignmentDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchAssignments();

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
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Assignment Title"
          {...register("assignmentTitle", {
            required: "Assignment Title is required",
          })}
        />
        <p>{errors.assignmentTitle?.message}</p>
      </div>
      <div className="inputContainer">
        <textarea
          type="text"
          placeholder="Assignment Description"
          {...register("assignmentDescription", {
            required: "Assignment Description is required",
          })}
        />
        <p>{errors.assignmentDescription?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <>Create Assignment</>}
      </button>
    </form>
  );
};

// assignment submission form
export const SubmitAssignmentForm = ({ refetchAssignment, assignmentId }) => {
  SubmitAssignmentForm.propTypes = {
    refetchAssignment: PropTypes.func.isRequired,
    assignmentId: PropTypes.string.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { assignmentDetails } = data;

    try {
      const res = await axios.put(
        `${serVer}/student/completeAssignment/${assignmentId}`,
        { assignmentDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchAssignment();

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
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <div className="inputContainer">
        <textarea
          type="text"
          placeholder="Assignment Details"
          {...register("assignmentDetails", {
            required: "Assignment Details is required",
          })}
        />
        <p>{errors.assignmentDetails?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <>Submit Assignment</>}
      </button>
    </form>
  );
};
