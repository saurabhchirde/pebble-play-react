import { useModal } from "Context";
import "./VerticalNavBar.css";
import { MenuItems } from "./MenuItems/MenuItems";

export const MobileVerticalNavBar = () => {
  const { setShowNavMenu } = useModal();

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
      </div>
    </>
  );
};
