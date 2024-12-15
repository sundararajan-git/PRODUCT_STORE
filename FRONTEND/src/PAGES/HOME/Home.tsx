import { useEffect, useState } from "react";
import Loader from "../../COMPONENTS/Loader";
import { LuPackagePlus } from "react-icons/lu";
import { homeArr } from "../../TEST/Data";
import Create from "../CREATE/Create";
import Update from "../UPDATE/Update";
import Header from "../../COMPONENTS/Header";
import Profile from "../PROFILE/Profile";

const Home = () => {
  // PAGE LOADER STATE
  const [pageLaoder, setPageLaoder] = useState(true);

  // CONTROL THE COMPONENTS
  const [control, setControl] = useState({
    addproduct: false,
    updateproduct: false,
    profileupdate: false,
  });

  // AVILABLE PRODUCTS
  const [prod, setProd] = useState([]);

  // GET ININITAL PRODUCTS
  useEffect(() => {
    getAvilableProducts();
  }, []);

  // GET THE AVAILBLE PRODUCTS
  const getAvilableProducts = async () => {
    try {
      const productRes = await fetch(`${import.meta.env.VITE_EXPRESS_API}`);

      if (!productRes.ok) {
        throw new Error(`HTTP error! status: ${productRes.status}`);
      }
      const productJson = await productRes.json();

      if (productJson.success) {
        setProd(productJson.data);
        // setTimeout(() => {
        //   setPageLaoder(false);
        // }, 1000);
      } else {
        throw new Error(productJson.error);
      }
    } catch (err) {
      setProd(homeArr);
      setTimeout(() => {
        setPageLaoder(false);
      }, 1000);
      const error = err as Error;
      console.error(error?.message);
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
  const updateProductHandler = () => {
    try {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.updateproduct = true;
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
      {pageLaoder ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div>
          <Header updateProfileHandler={updateProfileHandler} />
          <section className="w-5/6 mx-auto h-full p-2 mt-16 sm:p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8 h-full">
              {prod.map((i: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-gray-50 dark:bg-gray-950 shadow-lg cursor-pointer overflow-hidden h-[300px] fade-up"
                    onClick={updateProductHandler}
                  >
                    <img
                      src={`${i?.imgurl}`}
                      className="hover:scale-105 ease-out z-30 object-cover h-[200px] w-full"
                    />
                    <div className="flex flex-col items-center justify-between px-4 py-4 text-xs sm:text-sm gap-2">
                      <div className="flex justify-between items-center w-full gap-4">
                        <span className="font-medium dark:text-sky-500 truncate">
                          {i.name}
                        </span>
                        <span className="font-medium text-red-600">
                          ${i.price}
                        </span>
                      </div>

                      <p className="line-clamp-2 text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Corporis laudantium eaque placeat adipisci natus
                        provident quidem, eveniet vero quas unde recusandae, id
                        dolore quam nesciunt, voluptatibus doloribus aut dolorem
                        sequi! Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Corporis laudantium eaque placeat
                        adipisci natus provident quidem, eveniet vero quas unde
                        recusandae, id dolore quam nesciunt, voluptatibus
                        doloribus aut dolorem sequi!
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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
      {control?.updateproduct ? <Update close={setControl} /> : null}
      {control?.profileupdate ? <Profile close={setControl} /> : null}
    </>
  );
};

export default Home;
