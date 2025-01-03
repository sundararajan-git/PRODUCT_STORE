import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../ASSETES/logo.svg";
import { FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateForm } from "../../COMMON/helper";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import axiosInstance from "../../LIB/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../LIB/REDUX/SLICES/useSlice";

const SignUp = () => {
  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    btnloader: false,
  });

  // NAVIAGTE HOOK
  const navigate = useNavigate();

  //  DISPATCH FROM THE  REDUX
  const dispatch = useDispatch();

  // SIGN UP BTN HANDLER
  const signUpBtnHanlder = async () => {
    try {
      // GET FORM ELEMENT
      const signUpForm = document.getElementById("signup") as HTMLFormElement;

      // CHECK IS VALID OR NOT
      const isValid = validateForm(signUpForm);

      console.log(isValid);

      if (!isValid) {
        toast.error("Invalid inputs");
        return null;
      }

      const data = new FormData(signUpForm);

      const json = Object.fromEntries(data);

      console.log(json);

      //  TRIGGER THE BTN LOADER

      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });

      const response = await axiosInstance.post("/users/signup", json);

      console.log(response);

      if (response?.data?.success) {
        const { data } = response?.data;
        toast.success("Sign Up Successfully");
        dispatch(updateUser({ ...data }));
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <form
        className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm fade-up"
        id="signup"
      >
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} alt="logo" className="size-6" />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Sign Up
          </h2>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100"
            name="name"
            id="name"
            placeholder="name"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100"
            name="email"
            id="email"
            placeholder="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>

        <div className="text-sm">
          <p className="text-gray-500 flex items-center gap-2">
            <FaCircleInfo />
            You have account{" "}
            <NavLink
              to={"/login"}
              className="font-medium text-black hover:underline cursor-pointer hover:text-blue-1100"
            >
              Log In
            </NavLink>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-semibold"
            onClick={signUpBtnHanlder}
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
