import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../lib/axios";
import { updateUser } from "../lib/redux/slices/useSlice";
import toast from "react-hot-toast/headless";

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
      const { data, status } = await axiosInstance.get("/users/isvaliduser");
      if (status === 200) {
        const { user } = data;
        dispatch(updateUser(user));
        setIsValidUser(user);
      }
    } catch (err: any) {
      setIsValidUser(false);
      toast.error(err);
    } finally {
      setControl((prev: any) => {
        return { ...prev, pageloading: false };
      });
    }
  };

  return { isValidUser, pageloading: control?.pageloading };
};

export default useValidUser;
