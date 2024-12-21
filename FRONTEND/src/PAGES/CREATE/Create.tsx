import { useState } from "react";
import toast from "react-hot-toast";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import ModelCloseBtn from "../../COMPONENTS/ModelCloseBtn";
import { validateForm } from "../../COMMON/Helper";
import axiosInstance from "../../LIB/axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../LIB/REDUX/SLICES/productSlice";

const Create = (props: any) => {
  // PROPS
  const { close } = props;

  // SUBMIT BTN LAODER
  const [btnLoader, setBtnLoader] = useState(false);

  // DISPATH FOR CREATE PRODUCT
  const dispatch = useDispatch();

  //  SUBMIT BUTTON HANDLER
  const submitHandler = async () => {
    try {
      const createForm = document.getElementById(
        "createProduct"
      ) as HTMLFormElement;

      const isValid = validateForm(createForm);

      console.log(isValid);
      if (!isValid) {
        toast.error("Invalid inputs !");
        return null;
      }

      setBtnLoader(true);

      const createData = new FormData(createForm);

      const createJson = Object.fromEntries(createData);

      console.log(createJson);

      const creatrProductresponse = await axiosInstance.post(
        "/products/createproduct",
        createJson
      );

      console.log(creatrProductresponse);

      if (creatrProductresponse?.data?.success) {
        toast.success("Created !");
        dispatch(addProduct(creatrProductresponse?.data?.data));
        modelCloseHandler();
      }
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
      <section className="w-full sm:w-5/6  md:w-2/3 lg:w-1/3 mx-auto h-fit flex flex-col p-4 bg-white dark:bg-dark rounded-lg shadow fade-up">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-center text-blue-1100">
            CREATE PRODUCT
          </h2>

          <ModelCloseBtn onClick={modelCloseHandler} />
        </div>

        <form
          className="w-full  mx-auto mt-6 p-2 flex flex-col gap-4 text-sm"
          id="createProduct"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="productName" className="dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              placeholder="product name"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="dark:text-white">
              Description
            </label>
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
            <label htmlFor="Price" className="dark:text-white">
              Price
            </label>
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
            <label htmlFor="imageurl" className="dark:text-white">
              Image URL
            </label>
            <input
              type="text"
              id="imageurl"
              name="image"
              className="border border-gray-300 outline-none rounded-lg p-2.5 focus:ring-1 focus:ring-blue-1100 focus:border-blue-1100 dark:bg-transparent dark:text-gray-300"
              placeholder="url"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="bg-blue-1100 text-white px-2.5 py-2 rounded-lg text-sm  float-end flex items-center justify-between gap-2 font-semibold  dark:text-dark"
              onClick={submitHandler}
            >
              {btnLoader && <BtnLoader />}
              {btnLoader ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
