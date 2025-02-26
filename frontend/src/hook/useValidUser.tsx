import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../lib/axios";
import { updateUser } from "../lib/redux/slices/useSlice";

const useValidUser = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const dispatch = useDispatch();
  const [control, setControl] = useState({
    pageloading: true,
  });
  const location = useLocation();

  useEffect(() => {
    checkIsValidUser();
  }, [location]);

  const checkIsValidUser = async () => {
    try {
      const validUserResponse = await axiosInstance.get("/users/isvaliduser");
      if (validUserResponse?.data?.success) {
        const { user } = validUserResponse?.data;
        dispatch(updateUser(user));
        setIsValidUser(user);
      }
    } catch (err) {
      setIsValidUser(false);
    } finally {
      setControl((prev: any) => {
        return { ...prev, pageloading: false };
      });
    }
  };

  return { isValidUser, pageloading: control?.pageloading };
};

export default useValidUser;
