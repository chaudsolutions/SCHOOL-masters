import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ButtonLoad from "../../Animations/ButtonLoad";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { serVer, useToken } from "../../Hooks/useVariable";
import PropTypes from "prop-types";

// send message form
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

// send group chat message form
export const SendGroupChatMessage = ({ refetchMessages }) => {
  SendGroupChatMessage.propTypes = {
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
        `${serVer}/student/groupChat`,
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

// send message form for teacher and student
export const TeacherStudentMessageForm = ({
  refetchUser,
  studentId,
  userId,
}) => {
  TeacherStudentMessageForm.propTypes = {
    refetchUser: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
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
      const res = await axios.put(
        `${serVer}/teacher/send/message/${studentId}/${userId}`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchUser();

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

// grade assignments form
export const GradeAssignmentForm = ({
  refetchAssignment,
  assignmentId,
  studentId,
}) => {
  GradeAssignmentForm.propTypes = {
    refetchAssignment: PropTypes.func.isRequired,
    assignmentId: PropTypes.string.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { grade } = data;

    try {
      const res = await axios.put(
        `${serVer}/teacher/gradeAssignment/${assignmentId}/${studentId}`,
        { grade },
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
        <input
          type="number"
          placeholder="Grade"
          {...register("grade", {
            required: "Grade is required",
          })}
        />
        <p>{errors.grade?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <>Grade</>}
      </button>
    </form>
  );
};

// subjects grade form
export const SubjectGradeForm = ({ refetchStudent, studentId }) => {
  SubjectGradeForm.propTypes = {
    refetchStudent: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { maths, science, english, history } = data;

    const subjects = [
      {
        subject: "Maths",
        score: maths,
      },
      {
        subject: "Science",
        score: science,
      },
      {
        subject: "English",
        score: english,
      },
      {
        subject: "History",
        score: history,
      },
    ];

    try {
      const res = await axios.put(
        `${serVer}/teacher/gradeSubjects/${studentId}`,
        { subjects },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchStudent();

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
        <label>Maths</label>
        <input
          type="number"
          placeholder="Maths"
          {...register("maths", {
            required: "Maths is required",
          })}
        />
        <p>{errors.maths?.message}</p>
      </div>
      <div className="inputContainer">
        <label>Science</label>
        <input
          type="number"
          placeholder="Science"
          {...register("science", {
            required: "Science is required",
          })}
        />
        <p>{errors.science?.message}</p>
      </div>
      <div className="inputContainer">
        <label>English</label>
        <input
          type="number"
          placeholder="English"
          {...register("english", {
            required: "English is required",
          })}
        />
        <p>{errors.english?.message}</p>
      </div>
      <div className="inputContainer">
        <label>History</label>
        <input
          type="number"
          placeholder="History"
          {...register("history", {
            required: "History is required",
          })}
        />
        <p>{errors.history?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <>Grade</>}
      </button>
    </form>
  );
};

// submit attendance form
export const AttendanceSubmitForm = ({ refetchStudent, studentId }) => {
  AttendanceSubmitForm.propTypes = {
    refetchStudent: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { attendance } = data;

    try {
      const res = await axios.put(
        `${serVer}/teacher/submitAttendance/${studentId}`,
        { attendance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchStudent();

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
          type="number"
          placeholder="Attendance"
          {...register("attendance", {
            required: "Attendance is required",
          })}
        />
        <p>{errors.attendance?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <>Mark</>}
      </button>
    </form>
  );
};

// form to add a new goal
export const SetGoalForm = ({ refetchStudent }) => {
  SetGoalForm.propTypes = {
    refetchStudent: PropTypes.func.isRequired,
  };

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function
  const onSubmit = async (data) => {
    const { goal } = data;

    try {
      const res = await axios.put(
        `${serVer}/student/add-goal`,
        { goal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refetchStudent();

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
          placeholder="Goal"
          {...register("goal", {
            required: "Goal is required",
          })}
        />
        <p>{errors.goal?.message}</p>
      </div>

      <button type="submit" disabled={isSubmitting} className="submitBtn">
        {isSubmitting ? <ButtonLoad /> : <>Create Goal</>}
      </button>
    </form>
  );
};
