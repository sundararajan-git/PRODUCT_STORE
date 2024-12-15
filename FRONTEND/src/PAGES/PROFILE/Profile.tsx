
const Profile = (props: any) => {
  // PROPS
  const { close } = props;

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
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white rounded-lg shadow fade-up">
        <div className="flex items-center justify-center pt-2">
          <h2 className="text-xs sm:text-sm font-bold text-center text-blue-1100">
            PROFILE
          </h2>
        </div>

        <form
          className="w-full  mx-auto p-2 flex flex-col justify-center items-center gap-4 text-sm"
          name="createProduct"
          id="createProduct"
        >
          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              className="w-20 h-20 object-cover rounded-full cursor-pointer"
            />
            <p className="text-red-600 font-bold">Shankari G</p>
            <p className="text-gray-700">shankari@gmail.com</p>
          </div>

          <div></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-start">Forgot Password</p>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="border text-gray-700  hover:text-blue-1100  px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 "
                onClick={modelCloseHandler}
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-1100 text-white px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
