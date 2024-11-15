import { useForm } from "react-hook-form";
import { roles, serVer, useToken } from "../../../../Hooks/useVariable";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonLoad from "../../../../Animations/ButtonLoad";
import { useEffect } from "react";

const ResourcesManagement = () => {
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
    const { resourcesTitle, resourcesDescription, role } = data;

    try {
      const res = await axios.post(
        `${serVer}/admin/createResources`,
        { resourcesTitle, resourcesDescription, role },
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
      <h2>Create Resources</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Resources Title"
            {...register("resourcesTitle", {
              required: "Resources Title is required",
            })}
          />
          <p>{errors.resourcesTitle?.message}</p>
        </div>
        <div className="inputContainer">
          <textarea
            type="text"
            placeholder="Resources Description"
            {...register("resourcesDescription", {
              required: "Resources Description is required",
            })}
          />
          <p>{errors.resourcesDescription?.message}</p>
        </div>

        <div className="inputContainer">
          <select
            id="role"
            {...register("role", {
              required: "Resources Category",
            })}>
            <option value="">Select a Category</option>
            {roles.map((role, i) => (
              <option key={i} value={role}>
                {role}
              </option>
            ))}
          </select>
          <p>{errors.role?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="submitBtn">
          {isSubmitting ? <ButtonLoad /> : <>Create Resource</>}
        </button>
      </form>
    </div>
  );
};

export default ResourcesManagement;
