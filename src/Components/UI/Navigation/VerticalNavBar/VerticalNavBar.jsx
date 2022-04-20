import { useTheme } from "Context";
import { IconButton } from "Components";
import "./VerticalNavBar.css";
import { MenuItems } from "./MenuItems/MenuItems";

export const VerticalNavBar = () => {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "dark" ? "fa fa-sun" : "far fa-moon";

  return (
    <div className="vertical-nav-container nav-bar-desktop">
      <MenuItems />
      <hr className="section-break-line" />
      <div className="theme-toggler">
        <IconButton
          onClick={toggleTheme}
          icon={themeIcon}
          btnClassName="btn icon-btn-md"
        />
        <p onClick={toggleTheme}>{theme === "dark" ? "Day" : "Night"} Mode</p>
      </div>
    </div>
  );
};
