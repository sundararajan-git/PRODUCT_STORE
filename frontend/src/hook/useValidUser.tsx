import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../lib/axios";
import { updateUser } from "../lib/redux/slices/useSlice";
import toast from "react-hot-toast/headless";
import useJwtToken from "./useJwtToken";

const useValidUser = () => {
  const { getJwtToken } = useJwtToken();
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const [pageloading, setPageloading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log("useValidUser is running", location.pathname);
    setPageloading(true);
    checkIsValidUser();
    return () => {
      setPageloading(true);
    };
  }, [location.pathname]);

  const checkIsValidUser = async () => {
    try {
      console.log("it's running time", getJwtToken());
      const { data, status } = await axiosInstance.get("/user/isvaliduser", {
        headers: { Authorization: "Bearer " + getJwtToken() },
      });
      // console.log("data", data);
      if (status === 200) {
        console.log("status", status);
        const { user } = data;
        dispatch(updateUser(user));
        setIsValidUser(true);
        setPageloading(false);
      }
    } catch (err: any) {
      setIsValidUser(false);
      toast.error(err);
      setPageloading(false);
    }
  };

  return { isValidUser, pageloading };
};

export default useValidUser;
