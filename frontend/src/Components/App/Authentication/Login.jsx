import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import { localStorageToken, serVer } from "../../Hooks/useVariable";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import ButtonLoad from "../../Animations/ButtonLoad";
import "./auth.css";
import { LinkOne } from "../../Custom/Buttons/LinkBtn";

const Login = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const { login } = useAuthContext();

  // Password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // React Hook Form
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  // Function to register
  const onSubmit = async (data) => {
    const url = `${serVer}/auth/login`;
    const { email, password } = data;

    try {
      const response = await axios.post(url, {
        email,
        password,
      });

      if (response.status === 200) {
        // Save the user to local storage
        localStorage.setItem(localStorageToken, JSON.stringify(response.data));

        // Update the auth Context
        login(response.data);
        toast.success("Welcome");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      const { response } = error;
      toast.error(response?.data || "An error occurred");
    }
  };

  const onError = () => {
    toast.error("Failed to submit, check inputs and try again");
  };

  return (
    <div className="authentication">
      <h1>Welcome Back</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className="inputContainer">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <div onClick={togglePasswordVisibility} className="toggle">
            {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />}
          </div>
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="submitBtn">
          {isSubmitting ? <ButtonLoad /> : <>Login</>}
        </button>
      </form>

      <div className="auth-end">
        <p>New Here?</p>
        <LinkOne linkDetails={[{ name: "Sign Up", url: "/register" }]} />
      </div>
    </div>
  );
};

export default Login;
