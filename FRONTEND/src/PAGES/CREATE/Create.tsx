import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import { LuArrowBigLeft } from "react-icons/lu";

const Create = () => {
  // NAGIVAGATION HOOK
  const navigation = useNavigate();
  // SUBMIT BTN LAODER
  const [btnLoader, setBtnLoader] = useState(false);

  //  SUBMIT BUTTON HANDLER
  const submitHandler = async (e: any) => {
    try {
      const event = e as Event;
      event.preventDefault();

      // const createForm = document.forms["createProduct"];
      const createForm = document.getElementById(
        "createProduct"
      ) as HTMLFormElement;

      const isValid = validateForm(createForm);

      console.log(isValid);
      if (!isValid) {
        toast.error("Please check input");
        return null;
      }
      setBtnLoader(true);

      const createData = new FormData(createForm);

      const createJson = Object.fromEntries(createData);

      console.log(createJson);

      const creatRes = await fetch(`${import.meta.env.VITE_EXPRESS_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createJson),
      });

      if (!creatRes.ok) {
        throw new Error(`HTTP error! status: ${creatRes.status}`);
      }
      toast.success("Created !");

      const jsonData = await creatRes.json();

      console.log(jsonData);

      setTimeout(() => {
        navigation(-1);
      }, 500);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error(error?.message);
    }
  };

  return (
    <section className="w-full sm:w-5/6 mx-auto h-full flex flex-col p-4 sm:p-0 ">
      <br />

      <button
        type="button"
        className="text-xs sm:text-sm font-medium flex items-center gap-3 cursor-pointer"
        onClick={() => navigation(-1)}
      >
        <LuArrowBigLeft className="text-red-600" />
        <span className="font-medium dark:text-white">BACK</span>
      </button>

      <h2 className="text-xs sm:text-sm font-semibold text-center text-sky-600">
        CREATE PRODUCT
      </h2>

      <form
        className="w-5/6 sm:w-1/2 mx-auto mt-6 flex flex-col gap-2"
        name="createProduct"
        id="createProduct"
        onSubmit={submitHandler}
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
              className="absolute text-sm text-gray-600 peer-focus:text-sky-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-gray-200 dark:bg-dark px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
              id="Price"
              name="price"
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
              id="imageurl"
              name="imgurl"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent 
                        rounded-lg border border-gray-400 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-sky-600 peer"
              placeholder=""
            />

            <label
              htmlFor="imageurl"
              className="absolute text-sm text-gray-600 peer-focus:text-sky-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:text-gray-200 dark:bg-dark px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
            {btnLoader ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;

export const validateForm = (form: any) => {
  try {
    let isValid = true;

    Array.from(form.elements).forEach((ele: any) => {
      if (!ele.value && ele.name) {
        const invalidEle = document.getElementsByName(ele.name);
        invalidEle[0].classList.add("border-red-600");

        const paraEle: any = document.getElementById(`${ele.id}Help`);
        paraEle.classList.remove("invisible");

        isValid = false;
      } else if (ele.name) {
        const validEle = document.getElementsByName(ele.name);
        validEle[0].classList.remove("border-red-600");

        const paraEle: any = document.getElementById(`${ele.id}Help`);
        paraEle.classList.add("invisible");
      }
    });

    return isValid;
  } catch (err) {
    console.error(err);
  }
};
