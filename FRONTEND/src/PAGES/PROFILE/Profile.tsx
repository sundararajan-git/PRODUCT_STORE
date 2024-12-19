import { useState } from "react";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import userSvg from "../../ASSETES/user.svg"

const Profile = (props: any) => {
  // PROPS
  const { close } = props;

  // CONTROL THE COMPONENT
  const [control, setControl] = useState({
    btnloader: false,
  });

  // FORGOT PASSWORD HANDLER
  const forgotPasswordHandler = () => {
    try {
    } catch (err) {
      console.error(err);
    }
  };

  // LOGOUT HANDLER
  const logoutHandler = () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnloader = true;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  // MODEL CLOSE HANDLER
  const modelCloseHandler = () => {
    try {
      close((prev: any) => {
        const clone = { ...prev };
        clone.profileupdate = false;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white dark:bg-dark rounded-lg shadow fade-up">
        <div className="flex items-center justify-center pt-2">
          <h2 className="text-xs sm:text-sm font-bold text-center text-blue-1100">
            PROFILE
          </h2>
        </div>

        <div className="w-full  mx-auto p-2 flex flex-col justify-center items-center gap-4 text-sm">
          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src={userSvg}
              className="w-20 h-20 object-cover rounded-full cursor-pointer"
            />
            <p className="text-red-600 font-bold">Arun K</p>
            <p className="text-gray-700 dark:text-gray-300">Arun@gmail.com</p>
          </div>

          <div></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-start cursor-pointer hover:text-red-600 dark:text-gray-300" onClick={forgotPasswordHandler}>
              Forgot Password
            </p>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="border text-gray-700  hover:text-blue-1100  px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 dark:text-gray-300"
                onClick={modelCloseHandler}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-blue-1100 text-white px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 font-semibold dark:text-dark"
                onClick={logoutHandler}
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
