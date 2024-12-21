import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../ASSETES/logo.svg";
import { FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import { validateForm } from "../../COMMON/Helper";
import toast from "react-hot-toast";
import axiosInstance from "../../LIB/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../LIB/REDUX/SLICES/useSlice";

const Login = () => {
  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    btnloader: false,
  });

  //  DISPATCH FROM THE  REDUX
  const dispatch = useDispatch();

  // NAVIGATE HOOK
  const navigate = useNavigate();

  // LOGIN BTN HANDLER
  const loginBtnHandler = async () => {
    try {
      const loginForm = document.getElementById("login") as HTMLFormElement;

      const isValid = validateForm(loginForm);

      if (!isValid) {
        toast.error("Invalid Inputs !");
        return;
      }

      const data = new FormData(loginForm);

      const json = Object.fromEntries(data);

      console.log(json);

      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });

      const response = await axiosInstance.post("/users/login", json);

      if (response?.data?.success) {
        const { data } = response?.data;
        dispatch(updateUser(data));
        setTimeout(() => {
          toast.success("Sign In Successfully");
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err?.message);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <form
        className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm"
        id="login"
      >
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Log In</h2>
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
            You don't have account{" "}
            <NavLink
              to={"/signup"}
              className="font-medium text-black hover:underline cursor-pointer hover:text-blue-1100"
            >
              Sign Up
            </NavLink>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
            onClick={loginBtnHandler}
          >
            {control.btnloader ? <BtnLoader /> : null}
            {control.btnloader ? "Loading..." : "log In"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
