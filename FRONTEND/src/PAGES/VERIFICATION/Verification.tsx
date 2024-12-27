import { useState } from "react";
import logo from "../../ASSETES/logo.svg";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import { validateForm } from "../../COMMON/helper";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axiosInstance from "../../LIB/axios";
import { updateUser } from "../../LIB/REDUX/SLICES/useSlice";

const Verification = () => {
  // CONTROL THE COMPONENT
  const [contol, setControl] = useState({
    btnloader: false,
  });

  //  DISPATCH FROM THE  REDUX
  const dispatch = useDispatch();

  // VERIFICATION BTN HANDLER
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
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });

      const data = new FormData(verificationForm);
      const json = Object.fromEntries(data);

      console.log(json);

      const response = await axiosInstance.post("/users/verify", json);

      if (response?.data?.success) {
        toast.success("Verification Successfull");
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
          <img src={logo} alt="logo" className="size-6" />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Verify</h2>
        </div>

        <form id="verificationForm" className="flex flex-col gap-2 w-full">
          <label htmlFor="Code">Code</label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100"
            name="code"
            id="Code"
            placeholder="Code"
            required
          />
        </form>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-semibold flex items-center gap-2 justify-center"
            onClick={vertificationHandler}
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
