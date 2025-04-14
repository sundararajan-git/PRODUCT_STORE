import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const naviagte = useNavigate();
  const goHomeBtnHandler = () => {
    naviagte("/");
  };
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen dark:bg-dark">
      <p className="text-5xl text-sky-600 font-extrabold">404</p>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-gray-700 font-medium">Page Not Found</p>
        <button
          type="button"
          className="w-fit px-2 py-2 bg-red-600 text-white rounded-[6px] font-medium text-sm flex items-center justify-center gap-1"
          onClick={goHomeBtnHandler}
        >
          <span>Go Home</span>
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
