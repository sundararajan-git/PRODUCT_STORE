import toast from "react-hot-toast";
import { validateForm } from "../../utils/helper";
import { useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import axiosInstance from "../../lib/axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/redux/slices/useSlice";

const ResetPassword = () => {
  const [control, setControl] = useState({
    btnloader: false,
  });
  const dispatch = useDispatch();
  const location = useLocation();

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
        return { ...prev, btnloader: true };
      });

      const formData = new FormData(resetPasswordForm);
      const json = Object.fromEntries(formData);
      const token = location.pathname.split("/")[2];
      const endpoint = `/user/resetpassword/${token}`;
      const { data, status } = await axiosInstance.put(endpoint, json);
      if (status === 200) {
        toast.success("Password updated");
        const { data: user } = data;
        dispatch(updateUser({ ...user }));
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
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
            className="border border-gray-300 outline-none rounded-[6px] p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300 dark:border-gray-400"
            name="password"
            id="password"
            placeholder="password"
            required
          />
        </form>

        <div className="flex flex-col gap-2 w-full pt-4">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-[6px] text-white font-medium flex gap-2 justify-center"
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
