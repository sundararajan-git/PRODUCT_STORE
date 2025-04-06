import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import useJwtToken from "../hook/useJwtToken";
import { useDispatch } from "react-redux";
import axiosInstance from "../lib/axios";
import { updateUser } from "../lib/redux/slices/useSlice";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getJwtToken } = useJwtToken();
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkIsValidUser = async () => {
    try {
      console.log("checkIsValidUser");
      const { data, status } = await axiosInstance.get("/user/isvaliduser", {
        headers: { Authorization: "Bearer " + getJwtToken() },
      });
      if (status === 200) {
        const { user } = data;
        dispatch(updateUser(user));
        setIsValidUser(true);
      }
    } catch (err: any) {
      setIsValidUser(false);
      toast.error(err);
    } finally {
      setPageLoading(false);
    }
  };
  useEffect(() => {
    console.log("AuthProvider useEffect");
    checkIsValidUser();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{ isValidUser, pageLoading, userRole: "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
