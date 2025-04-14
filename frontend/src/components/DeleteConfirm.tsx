import BtnLoader from "./BtnLoader";

const DeleteConfirm = (props: any) => {
  const { deleteBtnHandler, loading, closeDeleteConfirmModel } = props;
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 dark:bg-gray-800/60  flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-2/3  md:w-1/2 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white dark:bg-dark rounded-xl shadow fade-up ">
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <h3 className="text-blue-1100 font-semibold">DELETE</h3>
          <p className="dark:text-gray-500">
            Are you sure delete this product !
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-transparent dark:text-gray-400 border border-gray-500 px-2.5 py-2 rounded-[6px] text-sm  float-end flex items-center justify-between gap-2"
              onClick={closeDeleteConfirmModel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-2.5 py-2 rounded-[6px] text-sm  float-end flex items-center justify-between gap-2 font-semibold dark:font-medium"
              onClick={deleteBtnHandler}
              disabled={loading}
            >
              {loading && <BtnLoader />}
              {loading ? "Loading..." : "Confirm"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DeleteConfirm;
