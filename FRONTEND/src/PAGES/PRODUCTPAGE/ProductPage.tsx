import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../LIB/axios";
import { useDispatch } from "react-redux";

const ProductPage = (props: any) => {
  // PROPS
  const { close, product } = props;

  //   CONSTROL THE COMPONET
  const [control, setControl] = useState({
    btnLoading: false,
  });

  // DISPATCH
  const dispatch = useDispatch();

  //   BACK HANDLER
  const backHandler = () => {
    try {
      close((prev: any) => {
        const clone = { ...prev };
        clone.productPage = false;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  //  UPDATE HANDLER
  const updateBtnHandler = () => {
    try {
      close((prev: any) => {
        const clone = { ...prev };
        clone.updateproduct = product;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  //   DELETE HANDLER
  const deleteBtnHandler = async () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnLoading = true;
        return clone;
      });

      const reqObj: any = {
        id: product._id,
      };

      const deleteResponse = await axiosInstance.delete(
        "/products/deleteproduct",
        reqObj
      );

      if (deleteResponse?.data?.success) {
        const { data } = deleteResponse?.data;
        console.log(data);
        toast.success("Deleted !");
        dispatch(updateProduct(data));
        backHandler();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen p-12  dark:bg-dark">
      <a
        className="dark:text-red-600 hover:underline hover:text-red-600 cursor-pointer"
        onClick={backHandler}
      >
        Back
      </a>
      <div className="flex flex-col rounded-lg cursor-pointer overflow-hidden h-fit fade-up dark:bg-gray-950 mt-4">
        <img
          src={`${product?.image}`}
          className="hover:scale-105 ease-out z-30 object-cover h-[300px] w-full shadow"
        />
        <div className="flex flex-col justify-between px-4 py-4 text-xs sm:text-sm gap-2 pt-6">
          <div className="flex justify-between items-center w-full gap-4">
            <span className="font-medium dark:text-sky-500 truncate">
              {product?.name}
            </span>
            <span className="font-medium text-red-600">${product?.price}</span>
          </div>

          <p className="text-gray-600 text-start">{product?.description}</p>
          <div className="flex items-center justify-end gap-2 pt-6">
            <button
              type="button"
              className="p-2 bg-red-600 rounded-md outline-none text-white"
              onClick={deleteBtnHandler}
            >
              Delete
            </button>
            <button
              type="button"
              className="p-2 bg-blue-1100 rounded-md outline-none"
              onClick={updateBtnHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
