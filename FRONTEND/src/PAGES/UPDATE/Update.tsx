import React, { useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../CREATE/Create";
import toast, { Toaster } from "react-hot-toast";
import BtnLoader from "../../COMPONETS/BtnLoader";

const Update = () => {
  // NAVIGATION HOOK
  const navigation = useNavigate();
  //   SUBMIT BTN LOADER
  const [btnLoader, setBtnLaoder] = useState(false);

  //   UPDATE BUTTON HANDLER
  const updateHandler = async (e) => {
    try {
      e.preventDefault();
      const updateForm = document.forms["updateProduct"];
      const isValid = validateForm(updateForm);
      console.log(isValid);
      if (!isValid) {
        toast.error("Please check input");
        return null;
      }
      setBtnLaoder(true);
      const updateData = new FormData(updateForm);
      const updateJson = Object.fromEntries(updateData);
      console.log(updateJson);

      const updateRes = await fetch(
        `${import.meta.env.VITE_EXPRESS_API}/66f8c674d5b6fec562e785a5`,
        {
          method: 'PATCH',
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(updateJson),
        }
      );

      console.log(updateRes)

      if (!updateRes.ok) {
        throw new Error(`HTTP error! status: ${updateRes.status}`);
      }

      const updateJsonData = await updateRes.json();

      setTimeout(() => {
        navigation(-1);
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <section className="w-full sm:w-5/6 mx-auto h-full p-4 sm:p-0">
      <br />

      <button
        type="button"
        className="text-xs sm:text-sm font-medium flex items-center gap-3 cursor-pointer"
        onClick={() => navigation(-1)}
      >
        <ArrowBigLeft className="text-red-600" />
        <span className="font-medium dark:text-white">BACK</span>
      </button>

      <h2 className="text-xs sm:text-sm font-semibold text-center text-sky-600">
        UPDATE PRODUCT
      </h2>

      <form
        className="w-5/6 sm:w-1/2 mx-auto mt-6 flex flex-col gap-2"
        onSubmit={updateHandler}
        name="updateProduct"
      >
        <div>
          <div className="relative">
            <input
              type="text"
              id="productName"
              name="name"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                        rounded-lg border border-gray-400 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=""
            />

            <label
              htmlFor="productName"
              className="absolute text-sm text-gray-600 dark:text-gray-200 peer-focus:text-sky-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Product Name
            </label>
          </div>
          <p
            id="productNameHelp"
            className="mt-2 text-xs text-red-600 invisible"
          >
            Please Enter Product Name
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              type="number"
              name="price"
              id="Price"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                        rounded-lg border border-gray-400 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=""
            />

            <label
              htmlFor="Price"
              className="absolute text-sm text-gray-600 dark:text-gray-200 peer-focus:text-sky-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Price
            </label>
          </div>
          <p id="PriceHelp" className="mt-2 text-xs text-red-600 invisible">
            Please Enter Your Price
          </p>
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              name="imgurl"
              id="imageurl"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                        rounded-lg border border-gray-400 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=""
            />

            <label
              htmlFor="imageurl"
              className="absolute text-sm text-gray-600 dark:text-gray-200 peer-focus:text-sky-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Image URL
            </label>
          </div>
          <p id="imageurlHelp" className="mt-2 text-xs text-red-600 invisible">
            Please Enter image url
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="bg-sky-500 text-white p-2.5 rounded-lg text-sm font-medium float-end flex items-center justify-between gap-2"
          >
            {btnLoader && <BtnLoader />}
            {btnLoader ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
      <Toaster />
    </section>
  );
};

export default Update;
