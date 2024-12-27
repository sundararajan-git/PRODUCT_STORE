import { useEffect, useState } from "react";
import Loader from "../../COMPONENTS/Loader";
import { LuPackagePlus } from "react-icons/lu";
import Create from "../CREATE/Create";
import Update from "../UPDATE/Update";
import Header from "../../COMPONENTS/Header";
import Profile from "../PROFILE/Profile";
import toast from "react-hot-toast";
import axiosInstance from "../../LIB/axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../LIB/REDUX/SLICES/productSlice";
import { RootState } from "../../LIB/REDUX/store";
import ProductPage from "../PRODUCTPAGE/ProductPage";

const Home = () => {
  // CONTROL THE COMPONENTS
  const [control, setControl] = useState({
    addproduct: false,
    updateproduct: false,
    profileupdate: false,
    productPage: false,
    pageloading: true,
  });

  // GET PRODUCTS FROM THE GLOBALS STATE
  const products = useSelector((state: RootState) => state.products);

  // DISPATH FOR PROFDUCTS
  const dispatch = useDispatch();

  // GET ININITAL PRODUCTS
  useEffect(() => {
    getAvilableProducts();
  }, []);

  // GET THE AVAILBLE PRODUCTS
  const getAvilableProducts = async () => {
    try {
      const getProductResponse = await axiosInstance.get("/products");

      console.log(getProductResponse);

      if (getProductResponse?.data?.success) {
        const { data } = getProductResponse?.data;
        dispatch(setProducts(data));
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error?.message);
    } finally {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.pageloading = false;
        return clone;
      });
    }
  };

  // ADD PRODUCT HANDLER
  const addproductHandler = () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.addproduct = true;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE PRODUCT HANDLER
  const updateProductHandler = (item: any) => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.productPage = item;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE PROFILE HANDLER
  const updateProfileHandler = () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.profileupdate = true;
        return clone;
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {control?.pageloading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className="">
          <Header updateProfileHandler={updateProfileHandler} />

          <section className="w-5/6 mx-auto h-full p-2 mt-16 sm:p-0">
            {control?.productPage ? (
              <ProductPage close={setControl} product={control?.productPage} />
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
                      <div className="flex flex-col items-center justify-between px-4 py-4 text-xs sm:text-sm gap-2">
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
          </section>

          <div className="fixed h-fit  bottom-4 flex justify-end pe-2 sm:pe-8 z-40 w-full">
            <button
              type="button"
              className="bg-sky-500 dark:bg-white dark:text-sky-500 text-white p-3 rounded-lg"
              onClick={addproductHandler}
            >
              <LuPackagePlus size={20} />
            </button>
          </div>
        </div>
      )}

      {control?.addproduct ? <Create close={setControl} /> : null}
      {control?.updateproduct ? (
        <Update close={setControl} data={control?.updateproduct} />
      ) : null}
      {control?.profileupdate ? <Profile close={setControl} /> : null}
    </>
  );
};

export default Home;
