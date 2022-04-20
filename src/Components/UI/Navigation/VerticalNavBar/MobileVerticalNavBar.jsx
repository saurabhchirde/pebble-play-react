import { useModal, useTheme } from "Context";
import { IconButton } from "Components";
import "./VerticalNavBar.css";
import { MenuItems } from "./MenuItems/MenuItems";

export const MobileVerticalNavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { setShowNavMenu } = useModal();

  const themeIcon = theme === "dark" ? "fa fa-sun" : "far fa-moon";

  return (
    <>
      <div
        onClick={() => {
          setShowNavMenu(false);
        }}
        className="modal-backdrop"
      ></div>
      <div className="vertical-nav-container nav-bar-mobile">
        <div
          className="vertical-nav-menu-close"
          onClick={() => {
            setShowNavMenu(false);
          }}
        >
          <i className="fas fa-times"></i>
        </div>
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
    </>
  );
};
