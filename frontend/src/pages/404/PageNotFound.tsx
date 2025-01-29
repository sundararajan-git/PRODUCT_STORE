import pageNotFound from "../../assetes/pageNotFound.svg";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen">
      <img src={pageNotFound} alt="page not found" className="w-[300px]" />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-gray-700 font-medium">Page Not Found</p>
        <button
          type="button"
          className="w-fit px-2 py-1.5 bg-red-1100 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2"
        >
          <span>Go Home</span>
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
