import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import ModelCloseBtn from "../../COMPONENTS/ModelCloseBtn";
import { validateForm } from "../../COMMON/Helper";

const Update = (props: any) => {
  // PROPS
  const { close } = props;

  // NAVIGATION HOOK
  const navigation = useNavigate();

  //   SUBMIT BTN LOADER
  const [btnLoader, setBtnLaoder] = useState(false);

  //   UPDATE BUTTON HANDLER
  const updateHandler = async (e: any) => {
    try {
      // PREVENT THE DEFAULT LAODING
      e.preventDefault();

      // GET FORM ELEMENT
      const updateForm = document.getElementById(
        "updateProduct"
      ) as HTMLFormElement;

      // CHECK IS VALID OR NOT
      const isValid = validateForm(updateForm);

      console.log(isValid);

      if (!isValid) {
        toast.error("Please check input");
        return null;
      }

      //  TRIGGER THE BTN LOADER
      setBtnLaoder(true);

      const updateData = new FormData(updateForm);
      const updateJson = Object.fromEntries(updateData);

      console.log(updateJson);

      const updateRes = await fetch(
        `${import.meta.env.VITE_EXPRESS_API}/66f8c674d5b6fec562e785a5`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateJson),
        }
      );

      console.log(updateRes);

      if (!updateRes.ok) {
        throw new Error(`HTTP error! status: ${updateRes.status}`);
      }

      const updateJsonData = await updateRes.json();

      console.log(updateJsonData);

      setTimeout(() => {
        navigation(-1);
      }, 500);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error.message);
    }
  };

  // MODEL CLOSE HANDLER
  const modelCloseHandler = () => {
    try {
      close((prev: any) => {
        const clone = { ...prev };
        clone.updateproduct = false;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70 flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white dark:bg-dark rounded-lg shadow fade-up">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-center text-blue-1100">
            UPDATE PRODUCT
          </h2>

          <ModelCloseBtn onClick={modelCloseHandler} />
        </div>

        <form
          className="w-full  mx-auto mt-6 p-2 flex flex-col gap-4 text-sm"
          id="updateProduct"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productName" className="dark:text-white">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              placeholder="productName"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="dark:text-white">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              placeholder="description"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="Price" className="dark:text-white">Price</label>
            <input
              type="number"
              id="Price"
              name="price"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              placeholder="price"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="imageurl" className="dark:text-white">Image URL</label>
            <input
              type="text"
              id="imageurl"
              name="imgurl"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              placeholder="url"
              required
            />
          </div>

          <div>
            <button
              type="button"
              className="bg-blue-1100 text-white px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 font-semibold
              dark:text-dark"
              onClick={updateHandler}
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
