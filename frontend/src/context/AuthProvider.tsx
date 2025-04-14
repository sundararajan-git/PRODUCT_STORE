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
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeProvider";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getJwtToken } = useJwtToken();
  const token = getJwtToken();
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      checkIsValidUser();
    } else {
      setIsValidUser(null);
      setPageLoading(false);
    }
  }, [location.pathname, navigate, dispatch, token]);

  const checkIsValidUser = async () => {
    try {
      setPageLoading(true);
      setIsValidUser(null);
      const { data, status } = await axiosInstance.get("/user/isvaliduser", {
        headers: { Authorization: "Bearer " + token },
      });

      if (status === 200) {
        const { user } = data;
        dispatch(updateUser(user));
        setIsValidUser(user?.isVerfied ? true : false);
      }
    } catch (err: any) {
      setIsValidUser(null);
      toast.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isValidUser, pageLoading, userRole: "admin", setPageLoading }}
    >
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: isDarkMode === "dark" ? "#030712" : "#fff",
            color: isDarkMode === "dark" ? "#fff" : "#000",
            padding: "10px 20px 10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
