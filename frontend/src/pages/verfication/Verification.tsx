import { useState } from "react";
import logo from "../../assetes/logo.svg";
import BtnLoader from "../../components/BtnLoader";
import { validateForm } from "../../common/helper";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../lib/axios";
import { updateUser } from "../../lib/redux/slices/useSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { Navigate } from "react-router-dom";

const Verification = () => {
  // control the component
  const [contol, setControl] = useState({
    btnloader: false,
  });

  // get products & user from the globals state
  const user = useSelector((state: RootState) => state.user);

  if (user.isVerfied) {
    return <Navigate to="/" />;
  }

  //  dispatch from the  redux
  const dispatch = useDispatch();

  // verification btn handler
  const vertificationHandler = async () => {
    try {
      // get from element
      const verificationForm = document.getElementById(
        "verificationForm"
      ) as HTMLFormElement;

      // get value from all elements are valid
      const isValidForm = validateForm(verificationForm);

      // validate the form
      if (!isValidForm) {
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
      const data = new FormData(verificationForm);

      // convert form data to json
      const json = Object.fromEntries(data);

      // endpoint
      const endpoint = `/users/verify`;

      const response = await axiosInstance.post(endpoint, json);

      if (response?.data?.success) {
        toast.success("Verification Successfull");
        const { data } = response?.data;
        // update the user
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
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Verify</h2>
        </div>

        <form id="verificationForm" className="flex flex-col gap-2 w-full">
          <label htmlFor="Code" className="dark:text-gray-300">
            Code
          </label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300 dark:border-gray-400"
            name="code"
            id="Code"
            placeholder="Code"
            required
          />
        </form>

        <div className="flex flex-col gap-2 w-full pt-4">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-medium flex items-center gap-2 justify-center"
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
