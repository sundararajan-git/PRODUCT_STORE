import { NavLink, useNavigate } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import { useContext, useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import { validateForm } from "../../utils/helper";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/useSlice";
import useJwtToken from "../../hook/useJwtToken";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const { setJwtToken } = useJwtToken();
  const { setPageLoading } = useContext(AuthContext);
  const [control, setControl] = useState({
    btnloader: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginBtnHandler = async () => {
    try {
      const loginForm = document.getElementById("login") as HTMLFormElement;
      const isValid = validateForm(loginForm);
      if (!isValid) {
        toast.error("Invalid Inputs !");
        return;
      }

      setControl((prev: any) => {
        return { ...prev, btnloader: true };
      });

      const formData = new FormData(loginForm);
      const json = Object.fromEntries(formData);
      const endpoint = `/user/login`;
      const { data, status } = await axiosInstance.post(endpoint, json);
      if (status === 200) {
        toast.success("Sign In Successfully");
        const { data: user, token } = data;
        setJwtToken(token);
        dispatch(updateUser(user));
        navigate("/");
        setPageLoading(true);
      }
    } catch (err: any) {
      toast.error(err);
    } finally {
      setControl((prev: any) => {
        return { ...prev, btnloader: false };
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <form
        className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm"
        id="login"
      >
        <div className="flex items-center pb-2 gap-2">
          {/* <img src={logo} alt="logo" className="size-6" /> */}
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Log In</h2>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="border border-gray-300 outline-none rounded-[6px] p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-400 dark:border-gray-600"
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
            className="border border-gray-300 outline-none rounded-[6px] p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-400 dark:border-gray-600"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </div>

        <div className="text-sm">
          <p className="text-gray-500 flex items-center gap-2 py-3">
            <FaCircleInfo />
            You don't have account{" "}
            <NavLink
              to={"/signup"}
              className="font-medium text-black hover:underline cursor-pointer hover:text-blue-1100 dark:hover:text-blue-1100 dark:text-gray-300"
            >
              Sign Up
            </NavLink>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-[6px] text-white font-medium flex items-center justify-center gap-2"
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
