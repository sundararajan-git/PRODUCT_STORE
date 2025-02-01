import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../lib/redux/slices/productSlice";
import { IoMdArrowBack } from "react-icons/io";
import DeleteConfirm from "../../components/DeleteConfirm";

const ProductPage = (props: any) => {
  // props
  const { close, product } = props;

  //   constrol the componet
  const [control, setControl] = useState({
    btnLoading: false,
    deletePopModel: false,
  });

  // dispatch
  const dispatch = useDispatch();

  //   back handler
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

  //  update handler
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

  //   delete handler
  const deleteBtnHandler = async () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.btnLoading = true;
        return clone;
      });

      const reqObj = {
        data: {
          id: product._id,
        },
      };

      const deleteResponse = await axiosInstance.delete(
        "/products/deleteproduct",
        reqObj
      );

      if (deleteResponse?.data?.success) {
        const { data } = deleteResponse?.data;
        console.log(data);
        toast.success("Deleted !");
        dispatch(deleteProduct(data));
        backHandler();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // delete pop confirm model on
  const deleteConfrimModel = () => {
    // triger the delete pop model
    setControl((prev) => {
      const clone = { ...prev };
      clone.deletePopModel = true;
      return clone;
    });
  };

  // delete pop confirm model off
  const closeDeleteConfirmModel = () => {
    // triger the delete pop model
    setControl((prev) => {
      const clone = { ...prev };
      clone.deletePopModel = false;
      return clone;
    });
  };

  return (
    <div className="w-full h-full p-12  dark:bg-dark">
      <a
        className="dark:text-red-600 hover:underline hover:text-red-600 cursor-pointer flex items-center gap-2"
        onClick={backHandler}
      >
        <IoMdArrowBack />
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
              className="p-2 bg-red-600 rounded-md outline-none text-white cursor-pointer"
              onClick={deleteConfrimModel}
            >
              Delete
            </button>

            <button
              type="button"
              className="p-2 bg-blue-1100 rounded-md outline-none cursor-pointer"
              onClick={updateBtnHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {control?.deletePopModel ? (
        <DeleteConfirm
          deleteBtnHandler={deleteBtnHandler}
          loading={control?.btnLoading}
          closeDeleteConfirmModel={closeDeleteConfirmModel}
        />
      ) : null}
    </div>
  );
};

export default ProductPage;
