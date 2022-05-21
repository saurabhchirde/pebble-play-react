import "./VerticalNavBar.css";
import { MenuItems } from "./MenuItems/MenuItems";
import { modalActions } from "Store/store";
import { useDispatch } from "react-redux";

export const MobileVerticalNavBar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => {
          dispatch(modalActions.showNavMenu(false));
        }}
        className="modal-backdrop"
      ></div>
      <div className="vertical-nav-container nav-bar-mobile">
        <div
          className="vertical-nav-menu-close"
          onClick={() => {
            dispatch(modalActions.showNavMenu(false));
          }}
        >
          <i className="fas fa-times"></i>
        </div>
        <MenuItems />
      </div>
    </>
  );
};
