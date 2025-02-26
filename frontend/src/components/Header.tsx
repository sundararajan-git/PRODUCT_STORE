import { useContext } from "react";
import { BiMoon } from "react-icons/bi";
import { LuSunMoon } from "react-icons/lu";
import logo from "../assetes/logo.svg";
import userSvg from "../assetes/user.svg";
import { ThemeContext } from "../layouts/ThemeProvider";
import { useNavigate } from "react-router-dom";

const Header = (props: any) => {
  const { updateProfileHandler, isValidUser } = props;
  const navigate = useNavigate();
  const { isDarkMode, setThemeHandler } = useContext(ThemeContext);

  const themeHandler = (e: any) => {
    const { id } = e.target;
    setThemeHandler(id);
  };

  const logoClickHandler = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-white dark:bg-dark">
      <div className="fade-up w-full sm:w-5/6  mx-auto flex justify-between p-3">
        <div>
          <h2
            className="cursor-pointer flex text-sky-500 items-center gap-2"
            onClick={logoClickHandler}
          >
            <img src={logo} alt="logo" className="size-4 sm:size-6" />
            <span className="logo text-sm sm:text-xl ">PRODUCT STORE</span>
          </h2>
        </div>

        <div className="flex flex-row-reverse items-center gap-4">
          {isValidUser && (
            <img
              src={userSvg}
              className="w-7 h-7 object-cover rounded-full cursor-pointer"
              onClick={updateProfileHandler}
            />
          )}

          {isDarkMode === "dark" ? (
            <button
              type="button"
              id="light"
              className="p-2 rounded-lg text-yellow-500 hover:scale-110 outline-none"
              onClick={themeHandler}
            >
              <LuSunMoon id="light" size={20} />
            </button>
          ) : (
            <button
              type="button"
              id="dark"
              className="p-2 rounded-lg text-sky-500 hover:scale-110 outline-none"
              onClick={themeHandler}
            >
              <BiMoon id="dark" size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
