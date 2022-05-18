import { useModal } from "Context";
import "./VerticalNavBar.css";
import { MenuItems } from "./MenuItems/MenuItems";

export const MobileVerticalNavBar = () => {
  const { modalDispatch } = useModal();

  return (
    <>
      <div
        onClick={() => {
          modalDispatch({ type: "showNavMenu", payload: false });
        }}
        className="modal-backdrop"
      ></div>
      <div className="vertical-nav-container nav-bar-mobile">
        <div
          className="vertical-nav-menu-close"
          onClick={() => {
            modalDispatch({ type: "showNavMenu", payload: false });
          }}
        >
          <i className="fas fa-times"></i>
        </div>
        <MenuItems />
      </div>
    </>
  );
};
