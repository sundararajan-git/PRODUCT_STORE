import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import ModelCloseBtn from "../../COMPONENTS/ModelCloseBtn";

const Create = (props: any) => {
  // PROPS
  const { close } = props;

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

  // MODEL CLOSE HANDLER
  const modelCloseHandler = () => {
    try {
      close((prev: any) => {
        const clone = { ...prev };
        clone.addproduct = false;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-full bg-gray-400/70  flex items-center justify-center p-6 z-50">
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/2 mx-auto h-fit flex flex-col p-4 bg-white rounded-lg shadow fade-up">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xs sm:text-sm font-semibold text-center text-sky-600">
            CREATE PRODUCT
          </h2>

          <ModelCloseBtn onClick={modelCloseHandler} />
        </div>

        <form
          className="w-5/6  mx-auto mt-6 flex flex-col gap-4 text-sm"
          name="createProduct"
          id="createProduct"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="name"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-400 focus:border-blue-600"
              placeholder=""
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="name"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-400 focus:border-blue-600"
              placeholder=""
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="Price">Price</label>
            <input
              type="number"
              id="Price"
              name="price"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-400 focus:border-blue-600"
              placeholder=""
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="imageurl">Image URL</label>
            <input
              type="text"
              id="imageurl"
              name="imgurl"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-400 focus:border-blue-600"
              placeholder=""
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-sky-500 text-white px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 font-semibold"
            >
              {btnLoader && <BtnLoader />}
              {btnLoader ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    </div>
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
