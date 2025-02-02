import toast from "react-hot-toast";
import logo from "../../ASSETES/logo.svg";
import { validateForm } from "../../common/helper";
import { useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import axiosInstance from "../../lib/axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/useSlice";

const ResetPassword = () => {
  // control the component
  const [control, setControl] = useState({
    btnloader: false,
  });

  //  use dispatch
  const dispatch = useDispatch();

  // use location
  const location = useLocation();

  // reset btn handler
  const resetBtnHandler = async () => {
    try {
      // get the form
      const resetPasswordForm = document.getElementById(
        "resetpassword"
      ) as HTMLFormElement;

      // get form is valid or not
      const isvalid = validateForm(resetPasswordForm);

      //  validate the form
      if (!isvalid) {
        toast.error("Invalid Inputs");
        return;
      }

      // triger the btn loader
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });

      // construct the form data
      const data = new FormData(resetPasswordForm);
      // construct the json data
      const json = Object.fromEntries(data);

      // get token from url
      const token = location.pathname.split("/")[2];

      // endpoint
      const endpoint = `/users/resetpassword/${token}`;

      const response = await axiosInstance.put(endpoint, json);

      if (response?.data?.success) {
        toast.success("Password updated");
        const { data } = response?.data;
        // upaate the user
        dispatch(updateUser({ ...data }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          {/* <img src={logo} alt="logo" className="size-6" /> */}
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Reset Password
          </h2>
        </div>

        <form className="flex flex-col gap-2 w-full" id="resetpassword">
          <label htmlFor="password" className="dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300 dark:border-gray-400"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </form>

        <div className="flex flex-col gap-2 w-full pt-4">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-medium flex gap-2 justify-center"
            onClick={resetBtnHandler}
            disabled={control?.btnloader}
          >
            {control?.btnloader ? <BtnLoader /> : null}
            {control?.btnloader ? "Loading.." : "Update"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
