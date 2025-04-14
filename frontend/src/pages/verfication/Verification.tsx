import { useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import { validateForm } from "../../utils/helper";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../lib/axios";
import { updateUser } from "../../lib/redux/slices/useSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Verification = () => {
  const [contol, setControl] = useState({
    btnloader: false,
  });
  const user = useSelector((state: any) => state.user);

  if (user.isVerfied) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vertificationHandler = async () => {
    try {
      const verificationForm = document.getElementById(
        "verificationForm"
      ) as HTMLFormElement;
      const isValidForm = validateForm(verificationForm);
      if (!isValidForm) {
        toast.error("Invalid Inputs");
        return;
      }
      setControl((prev: any) => {
        return { ...prev, btnloader: true };
      });
      const formData = new FormData(verificationForm);
      const json = Object.fromEntries(formData);
      const endpoint = `/user/verify`;
      const { data, status } = await axiosInstance.post(endpoint, json);
      if (status === 200) {
        toast.success("Verification Successfull");
        const { data: user } = data;
        dispatch(updateUser({ ...user }));
        navigate("/");
      }
    } catch (err: any) {
      setControl((prev: any) => {
        return { ...prev, btnloader: false };
      });
      toast.error(err);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="w-full sm:w-1/2 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Verify</h2>
        </div>
        <form id="verificationForm" className="flex flex-col gap-2 w-full">
          <label htmlFor="Code" className="dark:text-gray-300">
            Code
          </label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-[6px] p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300 dark:border-gray-400"
            name="code"
            id="Code"
            placeholder="Code"
            required
          />
        </form>

        <div className="flex flex-col gap-2 w-full pt-4">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-[6px] text-white font-medium flex items-center gap-2 justify-center"
            onClick={vertificationHandler}
            disabled={contol?.btnloader}
          >
            {contol?.btnloader ? <BtnLoader /> : null}
            {contol?.btnloader ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Verification;
