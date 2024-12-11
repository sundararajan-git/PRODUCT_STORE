import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../COMPONENTS/Loader";
import BtnLoader from "../../COMPONENTS/BtnLoader";
import { LuPackagePlus } from "react-icons/lu";
import { BiPencil, BiTrash } from "react-icons/bi";
import { homeArr } from "../../TEST/Data";

const Home = () => {
  // NAVIGATION HOOK
  const navigation = useNavigate();

  // PAGE LOADER STATE
  const [pageLaoder, setPageLaoder] = useState(true);

  // AVILABLE PRODUCTS
  const [prod, setProd] = useState([]);

  // DELETE BUTTON LOADER
  const [delBtn, setDelBtn] = useState(false);

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
        // setPageLaoder(false);
      }, 1000);
      const error = err as Error;
      console.error(error?.message);
    }
  };

  const deleteHandler = async (id: any) => {
    try {
      setDelBtn(true);
      const deleteRes = await fetch(
        `${import.meta.env.VITE_EXPRESS_API}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!deleteRes.ok) {
        throw new Error(`HTTP Error ! status: ${deleteRes.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {pageLaoder ? (
        <div className="flex items-center justify-center w-full h-[70vh]">
          <Loader />
        </div>
      ) : (
        <>
          <section className="w-5/6 mx-auto h-full p-4 sm:p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
              {prod.map((i: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col rounded-lg bg-gray-50 dark:bg-gray-950 shadow-lg cursor-pointer overflow-hidden h-[300px]"
                  >
                    <img
                      src={`${i?.imgurl}`}
                      className="hover:scale-105 z-30 object-cover h-[200px] w-full"
                    />
                    <div className="flex items-center justify-between px-3 py-4 text-xs sm:text-sm">
                      <div className="flex flex-col gap-2">
                        <span className="font-bold dark:text-sky-500">
                          {i.name}
                        </span>
                        <span className="font-medium text-red-600">
                          ${i.price}
                        </span>
                      </div>

                      <div className="flex flex-col justify-end gap-2">
                        <button
                          type="button"
                          className="bg-green-100 dark:bg-transparent hover:dark:bg-gray-50 p-2 rounded w-fit text-green-600 shadow hover:scale-110"
                          onClick={() => navigation("/update")}
                        >
                          <BiPencil size={14} />
                        </button>
                        <button
                          type="button"
                          className="bg-red-100 dark:bg-transparent hover:dark:bg-gray-50 p-2 rounded w-fit text-red-600 shadow hover:scale-110"
                          onClick={() => deleteHandler(i._id)}
                        >
                          {delBtn ? (
                            <BtnLoader />
                          ) : (
                            <BiTrash size={14} strokeWidth={2.5} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="sticky bottom-4 sm:bottom-10 flex justify-end pe-2 sm:pe-8 z-40 w-full">
            <button
              type="button"
              className="bg-sky-500 dark:bg-white dark:text-sky-500 text-white p-3 rounded-lg"
              onClick={() => navigation("/create")}
            >
              <LuPackagePlus size={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
