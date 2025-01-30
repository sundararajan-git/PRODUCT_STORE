import { useContext } from "react";
import { BiMoon } from "react-icons/bi";
import { LuSunMoon } from "react-icons/lu";
import logo from "../assetes/logo.svg";
import userSvg from "../assetes/user.svg";
import { ThemeContext } from "../hook/ThemeProvider";

const Header = (props: any) => {
  // props
  const { updateProfileHandler } = props;

  // get the global context
  const { isDarkMode, setThemeHandler } = useContext(ThemeContext);
  const themeHandler = (e: any) => {
    try {
      const { id } = e.target;
      setThemeHandler(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50  bg-white dark:bg-dark">
      <div className="fade-up w-full sm:w-5/6  mx-auto flex justify-between p-3">
        <div>
          <h2 className="cursor-pointer flex text-sky-500 items-center gap-2">
            <img src={logo} alt="logo" className="size-6" />
            <span className="logo text-xl ">PRODUCT STORE</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {isDarkMode === "dark" ? (
            <button
              type="button"
              id="light"
              className="p-2 rounded-lg text-yellow-500 hover:bg-white"
              onClick={themeHandler}
            >
              <LuSunMoon id="light" size={20} />
            </button>
          ) : (
            <button
              type="button"
              id="dark"
              className="p-2 rounded-lg text-sky-500 hover:bg-blue-100"
              onClick={themeHandler}
            >
              <BiMoon id="dark" size={18} />
            </button>
          )}

          <img
            src={userSvg}
            className="w-7 h-7 object-cover rounded-full cursor-pointer"
            onClick={updateProfileHandler}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
