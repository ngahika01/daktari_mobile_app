import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext();

export function ThemeContextProvider({ thmetype, children }) {
  const [th, setTheme] = useState("light");

  useEffect(() => {
    if (thmetype === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [thmetype]);
  return (
    <themeContext.Provider value={{ th }}>{children}</themeContext.Provider>
  );
}

export function useMyTheme() {
  return useContext(themeContext);
}
