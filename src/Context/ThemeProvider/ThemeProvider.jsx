import { createContext, useContext, useState, useEffect } from "react";

const themeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("pebbleplay-theme") ?? "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("pebbleplay-theme", theme);
    localStorage.setItem("pebbleplay-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export { ThemeProvider, useTheme };
