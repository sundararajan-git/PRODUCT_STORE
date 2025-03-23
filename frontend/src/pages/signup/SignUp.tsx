import { NavLink, useNavigate } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateForm } from "../../common/helper";
import BtnLoader from "../../components/BtnLoader";
import axiosInstance from "../../lib/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/useSlice";
import useJwtToken from "../../hook/useJwtToken";

const SignUp = () => {
  const { setJwtToken } = useJwtToken();
  const [control, setControl] = useState({
    btnloader: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpBtnHanlder = async () => {
    try {
      const signUpForm = document.getElementById("signup") as HTMLFormElement;
      const isValid = validateForm(signUpForm);
      if (!isValid) {
        toast.error("Invalid inputs");
        return null;
      }
      const formData = new FormData(signUpForm);
      const json = Object.fromEntries(formData);
      setControl((prev: any) => {
        return { ...prev, btnloader: true };
      });
      const endpoint = `/user/signup`;
      const { data, status } = await axiosInstance.post(endpoint, json);
      if (status === 200) {
        toast.success("Sign Up Successfully");
        const { data: user, token } = data;
        setJwtToken(token);
        dispatch(updateUser({ ...user }));
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <form
        className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm fade-up"
        id="signup"
      >
        <div className="flex items-center pb-2 gap-2">
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Sign Up
          </h2>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-400 dark:border-gray-600"
            name="name"
            id="name"
            placeholder="name"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-400 dark:border-gray-600"
            name="email"
            id="email"
            placeholder="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-400 dark:border-gray-600"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>

        <div className="text-sm">
          <p className="text-gray-500 flex items-center gap-2 py-2">
            <FaCircleInfo />
            You have account{" "}
            <NavLink
              to={"/login"}
              className="font-medium text-black hover:underline cursor-pointer hover:text-blue-1100 dark:hover:text-blue-1100  dark:text-gray-300"
            >
              Log In
            </NavLink>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-medium"
            onClick={signUpBtnHanlder}
            disabled={control.btnloader}
          >
            {control.btnloader && <BtnLoader />}
            {control.btnloader ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
