import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<any>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;
  const [isDarkMode, setDrkMode] = useState<any>(() =>
    localStorage.getItem("theme")
  );

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ?? "dark");
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

  const setThemeHandler = (theme: string) => {
    setDrkMode(theme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setThemeHandler }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
