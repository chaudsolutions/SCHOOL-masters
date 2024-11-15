import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ButtonLoad from "../../../../Animations/ButtonLoad";
import axios from "axios";
import { serVer, useToken } from "../../../../Hooks/useVariable";
import { useEffect } from "react";

const Announcements = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { token } = useToken();

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { subject, announcement } = data;

    try {
      const res = await axios.post(
        `${serVer}/admin/createAnnouncement`,
        { subject, announcement },
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
      <h2>Create an Announcement</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Subject"
            {...register("subject", {
              required: "Subject is required",
            })}
          />
          <p>{errors.subject?.message}</p>
        </div>
        <div className="inputContainer">
          <textarea
            type="text"
            placeholder="Announcement"
            {...register("announcement", {
              required: "Announcement is required",
            })}
          />
          <p>{errors.announcement?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="submitBtn">
          {isSubmitting ? <ButtonLoad /> : <>Create Announcement</>}
        </button>
      </form>
    </div>
  );
};

export default Announcements;
