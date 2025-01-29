import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../lib/axios";
import { updateUser } from "../lib/redux/slices/useSlice";

const useValidUser = () => {
  // store the is valid user not
  const [isValidUser, setIsValidUser] = useState(false);

  // dispath for update user
  const dispatch = useDispatch();

  // control the compoent
  const [control, setControl] = useState({
    pageloading: true,
  });

  //  location hook
  const location = useLocation();

  // check is valid user
  useEffect(() => {
    checkIsValidUser();
  }, [location]);

  const checkIsValidUser = async () => {
    try {
      // call api for is valid user
      const validUserResponse = await axiosInstance.get("/users/isvaliduser");

      console.log(validUserResponse);

      if (validUserResponse?.data?.success) {
        const { user } = validUserResponse?.data;
        dispatch(updateUser(user));
        setIsValidUser(true);
      }
    } catch (err) {
      setIsValidUser(false);
    } finally {
      setControl((prev: any) => {
        const clone = { ...prev };
        clone.pageloading = false;
        return clone;
      });
    }
  };

  return { isValidUser, pageloading: control?.pageloading };
};

export default useValidUser;
