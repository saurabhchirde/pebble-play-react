import { IconButton } from "Components/UI/Button";
import { useTheme } from "Context";
import "./ThemeToggler.css";

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "dark" ? "fa fa-sun" : "far fa-moon";

  return (
    <div className="theme-toggler" onClick={toggleTheme}>
      <IconButton icon={themeIcon} btnClassName="btn icon-btn-md" />
    </div>
  );
};
