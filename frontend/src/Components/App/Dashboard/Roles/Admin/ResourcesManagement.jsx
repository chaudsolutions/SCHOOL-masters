import { useForm } from "react-hook-form";
import { roles, serVer, useToken } from "../../../../Hooks/useVariable";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonLoad from "../../../../Animations/ButtonLoad";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

const ResourcesManagement = () => {
  useEffect(() => {
    window.scroll(0, 0); // scroll to top on component mount
  }, []);

  const { token } = useToken();

  const [selectedFileName, setSelectedFileName] = useState("");

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const { resourcesTitle, resourcesDescription, role, resourceFile } = data;

    // Create FormData object
    const formData = new FormData();
    formData.append("resourcesTitle", resourcesTitle);
    formData.append("resourcesDescription", resourcesDescription);
    formData.append("role", role);
    formData.append("resourceFile", resourceFile[0]); // Files are in an array, take the first one

    try {
      const res = await axios.post(
        `${serVer}/admin/createResources`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile?.name || "");
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
          <label htmlFor="file">
            {selectedFileName || (
              <>
                Add Resources File <FaCamera />
              </>
            )}

            <input
              type="file"
              accept=".pdf"
              id="file"
              {...register("resourceFile", {
                required: "Resources Description is required",
                onChange: handleFileChange,
              })}
              style={{ display: "none" }}
            />
            <p>{errors.resourceFile?.message}</p>
          </label>
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
