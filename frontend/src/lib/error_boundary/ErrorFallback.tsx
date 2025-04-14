const ErrorFallBack = ({ error, resetErrorBoundary }: any) => {
  console.log(error);
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 dark:bg-gray-800  flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-2/3  md:w-1/2 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white dark:bg-dark rounded-xl shadow fade-up ">
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <h3 className="text-blue-1100 font-semibold">Error</h3>
          <p className="dark:text-gray-500">Oops ! Something went wrong</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-red-600 text-white px-6 py-2 rounded-[6px] text-sm  float-end flex items-center justify-between gap-2 font-semibold dark:font-medium"
              onClick={resetErrorBoundary}
            >
              Ok
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ErrorFallBack;
