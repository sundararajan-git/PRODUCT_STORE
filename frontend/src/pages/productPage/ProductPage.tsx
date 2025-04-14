import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../lib/redux/slices/productSlice";
import { IoMdArrowBack } from "react-icons/io";
import DeleteConfirm from "../../components/DeleteConfirm";
import { RootState } from "../../lib/redux/store";

const ProductPage = (props: any) => {
  const { close } = props;
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const [control, setControl] = useState({
    btnLoading: false,
    deletePopModel: false,
  });

  const product = useMemo(() => {
    return products.filter((f) => f.isCurrent)[0];
  }, [products]);

  const backHandler = () => {
    close((prev: any) => {
      return { ...prev, productPage: false };
    });
  };

  const updateBtnHandler = () => {
    close((prev: any) => {
      return { ...prev, updateproduct: product };
    });
  };

  const deleteBtnHandler = async () => {
    try {
      setControl((prev: any) => {
        return { ...prev, btnLoading: true };
      });

      const reqObj = {
        data: {
          id: product._id,
        },
      };
      const endpoint = `/products/deleteproduct`;
      const { data, status } = await axiosInstance.delete(endpoint, reqObj);
      if (status === 200) {
        toast.success("Deleted !");
        const { data: product } = data;
        dispatch(deleteProduct(product));
        backHandler();
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  const deleteConfrimModel = () => {
    setControl((prev: any) => {
      return { ...prev, deletePopModel: true };
    });
  };

  const closeDeleteConfirmModel = () => {
    setControl((prev) => {
      return { ...prev, deletePopModel: false };
    });
  };

  return (
    <div className="w-full h-full sm:p-12  dark:bg-dark">
      <a
        className="dark:text-red-600 hover:underline text-sm sm:text-base hover:text-red-600 cursor-pointer flex items-center gap-2"
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
        <div className="flex flex-col justify-between px-4 py-4 text-sm gap-2 pt-6">
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
              className="p-2 bg-red-600 rounded-[6px] outline-none text-white cursor-pointer"
              onClick={deleteConfrimModel}
            >
              Delete
            </button>

            <button
              type="button"
              className="p-2 bg-blue-1100 rounded-[6px] outline-none cursor-pointer"
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
