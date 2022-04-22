import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("data-pebbleplay-theme") ?? "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-pebbleplay-theme", theme);
    localStorage.setItem("data-pebbleplay-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
