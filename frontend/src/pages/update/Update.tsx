import { useState } from "react";
import toast from "react-hot-toast";
import BtnLoader from "../../components/BtnLoader";
import ModelCloseBtn from "../../components/ModelCloseBtn";
import { validateForm } from "../../common/helper";
import axiosInstance from "../../lib/axios";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../lib/redux/slices/productSlice";

const Update = (props: any) => {
  const { close, data: proudct } = props;
  const [btnLoader, setBtnLaoder] = useState(false);
  const dispatch = useDispatch();

  const updateHandler = async () => {
    try {
      const updateForm = document.getElementById(
        "updateProduct"
      ) as HTMLFormElement;
      const isValid = validateForm(updateForm);
      if (!isValid) {
        toast.error("Please check input");
        return null;
      }
      setBtnLaoder(true);

      const updateData = new FormData(updateForm);
      const updateJson = Object.fromEntries(updateData);
      updateJson.id = proudct._id;
      const endpoint = `/products/updateproduct`;
      const { data, status } = await axiosInstance.put(endpoint, updateJson);

      if (status === 200) {
        toast.success("Updated !");
        const { data: updatedProduct } = data;
        dispatch(updateProduct(updatedProduct));
        modelCloseHandler();
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const modelCloseHandler = () => {
    close((prev: any) => {
      return { ...prev, updateproduct: null };
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 dark:bg-gray-800/60 flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/2 mx-auto h-fit flex flex-col p-4 sm:p-8 bg-white dark:bg-dark rounded-xl shadow fade-up">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-center text-blue-1100">
            UPDATE PRODUCT
          </h2>
          <ModelCloseBtn onClick={modelCloseHandler} disabled={btnLoader} />
        </div>

        <form
          className="w-full  mx-auto mt-6 p-2 flex flex-col gap-4 text-sm"
          id="updateProduct"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productName" className="dark:text-gray-200">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              defaultValue={proudct?.name}
              placeholder="productName"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="dark:text-gray-200">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              defaultValue={proudct?.description}
              placeholder="description"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="Price" className="dark:text-gray-200">
              Price
            </label>
            <input
              type="number"
              id="Price"
              name="price"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              defaultValue={proudct?.price}
              placeholder="price"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="imageurl" className="dark:text-gray-200">
              Image URL
            </label>
            <input
              type="text"
              id="imageurl"
              name="image"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              defaultValue={proudct?.image}
              placeholder="url"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="bg-blue-1100 text-white px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 font-semibold dark:font-medium
              dark:text-dark"
              onClick={updateHandler}
              disabled={btnLoader}
            >
              {btnLoader && <BtnLoader />}
              {btnLoader ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Update;
