import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { LuPackagePlus } from "react-icons/lu";
import Create from "../create/Create";
import Update from "../update/Update";
import Header from "../../components/Header";
import Profile from "../profile/Profile";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../lib/redux/slices/productSlice";
import { RootState } from "../../lib/redux/store";
import ProductPage from "../productPage/ProductPage";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [control, setControl] = useState({
    addproduct: false,
    updateproduct: false,
    profileupdate: false,
    productPage: false,
    pageloading: true,
  });
  const products = useSelector((state: RootState) => state.products);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  if (!user.isVerfied) {
    return <Navigate to="/verification" />;
  }

  useEffect(() => {
    getAvilableProducts();
  }, []);

  const getAvilableProducts = async () => {
    try {
      const endpoint = `/products`;
      const { data, status } = await axiosInstance.get(endpoint);
      if (status === 200) {
        const { data: products } = data;
        dispatch(setProducts(products));
      }
    } catch (err: any) {
      toast.error(err);
    } finally {
      setControl((prev: any) => {
        return { ...prev, pageloading: false };
      });
    }
  };

  const addproductHandler = () => {
    setControl((prev: any) => {
      return { ...prev, addproduct: true };
    });
  };

  const updateProductHandler = (item: any) => {
    const updatedData = products?.map((p) => {
      if (p?._id === item?._id) {
        return { ...p, isCurrent: true };
      } else {
        return { ...p, isCurrent: false };
      }
    });
    dispatch(setProducts(updatedData));
    setControl((prev: any) => {
      return { ...prev, productPage: true };
    });
  };

  const updateProfileHandler = () => {
    setControl((prev: any) => {
      return { ...prev, profileupdate: true };
    });
  };

  return (
    <>
      {control?.pageloading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen">
          <Header
            updateProfileHandler={updateProfileHandler}
            isValidUser={true}
          />
          <section className="w-11/12 sm:w-5/6 mx-auto h-full p-2 mt-16 sm:p-0">
            {control?.productPage ? (
              <ProductPage close={setControl} />
            ) : (
              <>
                {!products?.length ? (
                  <div className="flex justify-center items-center h-[80vh] ">
                    <p className="text-sm dark:text-white">No products.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8 h-full">
                    {products.map((i: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col rounded-lg bg-gray-50 dark:bg-gray-950 shadow-lg cursor-pointer overflow-hidden h-[300px] fade-up"
                          onClick={() => updateProductHandler(i)}
                        >
                          <img
                            src={`${i?.image}`}
                            className="hover:scale-105 ease-out z-30 object-cover h-[200px] w-full"
                          />
                          <div className="flex flex-col items-center justify-between px-4 py-4 text-sm gap-2">
                            <div className="flex justify-between items-center w-full gap-4">
                              <span className="font-medium dark:text-sky-500 truncate">
                                {i?.name}
                              </span>
                              <span className="font-medium text-red-600">
                                ${i?.price}
                              </span>
                            </div>

                            <p className="line-clamp-2 text-gray-600">
                              {i?.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </section>

          <div className="fixed h-fit right-0 bottom-4 flex justify-end pe-2 sm:pe-8 z-40 w-fit">
            <button
              type="button"
              className="bg-sky-500 text-white p-3 rounded-xl"
              onClick={addproductHandler}
            >
              <LuPackagePlus size={20} />
            </button>
          </div>
        </div>
      )}

      {control?.addproduct ? <Create close={setControl} /> : null}
      {control?.updateproduct ? <Update close={setControl} /> : null}
      {control?.profileupdate ? <Profile close={setControl} /> : null}
    </>
  );
};

export default Home;
