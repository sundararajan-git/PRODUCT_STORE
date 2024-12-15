import logo from "../../ASSETES/logo.svg";


const ResetPassword = () => {
  return (
    <section className="flex items-center justify-center w-full h-full">
      <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/3 h-fit p-4 sm:p-2  flex flex-col gap-4 font-sm">
        <div className="flex items-center pb-2 gap-2">
          <img src={logo} />
          <h2 className="font-bold uppercase text-blue-1100 text-lg">Reset Password</h2>
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

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            className="w-full h-full p-2 bg-blue-1100 rounded-lg text-white font-semibold"
          >
            Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
