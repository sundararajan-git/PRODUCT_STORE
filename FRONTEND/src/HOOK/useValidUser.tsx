import { useEffect, useState } from "react";
import axiosInstance from "../LIB/axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../LIB/REDUX/SLICES/useSlice";

const useValidUser = () => {
  // STORE THE IS VALID USER NOT
  const [isValidUser, setIsValidUser] = useState(false);

  // DISPATH FOR UPDATE USER
  const dispatch = useDispatch();

  // CONTROL THE COMPOENT
  const [control, setControl] = useState({
    pageloading: true,
  });

  //  LOCATION HOOK
  const location = useLocation();

  // CHECK IS VALID USER
  useEffect(() => {
    checkIsValidUser();
  }, [location]);

  const checkIsValidUser = async () => {
    try {
      // CALL API FOR IS VALID USER
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
