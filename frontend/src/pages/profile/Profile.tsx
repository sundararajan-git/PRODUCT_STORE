import { useState } from "react";
import BtnLoader from "../../components/BtnLoader";
import userSvg from "/AvatarDP.jpg";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../lib/redux/slices/useSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../lib/redux/store";
import useJwtToken from "../../hook/useJwtToken";

const Profile = (props: any) => {
  const { close } = props;
  const { setJwtToken, removeJwtToken } = useJwtToken();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [control, setControl] = useState({
    btnloader: false,
  });

  const forgotPasswordHandler = async () => {
    try {
      const json = { email: user?.email };
      const endpoint = `/user/forgotpassword`;
      const { data, status } = await toast.promise(
        axiosInstance.post(endpoint, json),
        {
          loading: "Sending email...",
          success: <span>Email sent successfully!</span>,
          error: <span>Failed to send email.</span>,
        }
      );

      if (status === 200) {
        const { data: user, token } = data;
        setJwtToken(token);
        dispatch(updateUser({ ...user }));
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const logoutHandler = async () => {
    try {
      setControl((prev: any) => {
        return { ...prev, btnloader: true };
      });
      const endpoint = `/user/logout`;
      const { status } = await axiosInstance.post(endpoint);
      if (status === 200) {
        toast.success("Logout Sucessfully");
        removeJwtToken();
        dispatch(updateUser({}));
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const modelCloseHandler = () => {
    close((prev: any) => {
      return { ...prev, profileupdate: false };
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 dark:bg-gray-800/60 flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-2/3  md:w-1/2 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white dark:bg-dark rounded-xl shadow fade-up">
        <div className="flex items-center justify-center pt-2">
          <h2 className="text-sm font-bold text-center text-blue-1100">
            PROFILE
          </h2>
        </div>

        <div className="w-full  mx-auto p-2 flex flex-col justify-center items-center gap-4 text-sm">
          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src={userSvg}
              className="w-20 h-20 object-cover rounded-full cursor-pointer"
            />
            <p className="text-red-600 font-bold">{user?.name}</p>
            <p className="text-gray-700 dark:text-gray-300">{user?.email}</p>
          </div>

          <div></div>

          <div className="w-full flex items-center justify-between">
            <p
              className="text-start cursor-pointer hover:text-red-600 dark:text-gray-500 dark:hover:text-red-600 hover:underline"
              onClick={forgotPasswordHandler}
            >
              Forgot Password
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="border text-gray-700  hover:text-blue-1100  px-2.5 py-2 rounded-[6px] text-sm  float-end flex items-center justify-between gap-2 dark:text-gray-300"
                onClick={modelCloseHandler}
                disabled={control?.btnloader}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-blue-1100 text-white px-2.5 py-2 rounded-[6px] text-sm  float-end flex items-center justify-between gap-2 font-medium dark:text-dark"
                onClick={logoutHandler}
                disabled={control?.btnloader}
              >
                {control?.btnloader ? <BtnLoader /> : null}
                {control?.btnloader ? "Loading..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
