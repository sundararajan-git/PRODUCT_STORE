import toast from "react-hot-toast";
import logo from "../../ASSETES/logo.svg";
import { validateForm } from "../../COMMON/helper";
import { useState } from "react";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import axiosInstance from "../../LIB/axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../LIB/REDUX/SLICES/useSlice";

const ResetPassword = () => {
  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    btnloader: false,
  });

  //  USE DISPATCH
  const dispatch = useDispatch();

  // USE LOCATION
  const location = useLocation();

  // RESET BTN HANDLER
  const resetBtnHandler = async () => {
    try {
      const resetPasswordForm = document.getElementById(
        "resetpassword"
      ) as HTMLFormElement;

      const isvalid = validateForm(resetPasswordForm);

      if (!isvalid) {
        toast.error("Invalid Inputs");
        return;
      }

      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });
      const data = new FormData(resetPasswordForm);
      const json = Object.fromEntries(data);
      console.log(json);

      const token = location.pathname.split("/")[2];
      const response = await axiosInstance.put(
        `/users/resetpassword/${token}`,
        json
      );

      console.log(response);

      if (response?.data?.success) {
        toast.success("Password updated");
        const { data } = response?.data;
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
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Reset Password
          </h2>
        </div>

        <form className="flex flex-col gap-2 w-full" id="resetpassword">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </form>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-semibold flex gap-2 justify-center"
            onClick={resetBtnHandler}
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
