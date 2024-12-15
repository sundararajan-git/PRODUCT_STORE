import { NavLink } from "react-router-dom";
import logo from "../../ASSETES/logo.svg";
import { FaCircleInfo } from "react-icons/fa6";

const SignUp = () => {
  return (
    <section className="flex items-center justify-center w-full h-full">
      <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm fade-up">
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">
            Sign Up
          </h2>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100"
            name="name"
            id="name"
            placeholder="name"
            required
          />
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
            You have account{" "}
            <NavLink
              to={"/login"}
              className="font-medium text-black hover:underline cursor-pointer hover:text-blue-1100"
            >
              Log In
            </NavLink>
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
