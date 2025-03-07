import { createContext, useEffect, useState } from "react";

// create the theme provider context
export const ThemeContext = createContext<any>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // store the theme value
  const [isDarkMode, setDrkMode] = useState<any>(() =>
    localStorage.getItem("theme")
  );

  // initial setup for dark apply each time it's change
  useEffect(() => {
    //   update the local storage
    localStorage.setItem("theme", isDarkMode);
    //  toggle the theme
    setDrkMode(() => {
      if (isDarkMode === "dark") {
        const ele: any = document.getElementById("root");
        ele.classList.add("dark");
        return "dark";
      } else {
        const ele: any = document.getElementById("root");
        ele.classList.remove("dark");
        return "light";
      }
    });
  }, [isDarkMode]);

  //   update the theme handler
  const setThemeHandler = (theme: string) => {
    // update the theme state
    setDrkMode(theme);
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, setThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
