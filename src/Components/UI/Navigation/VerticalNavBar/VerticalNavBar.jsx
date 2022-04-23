import { useAuth } from "Context";
import "./VerticalNavBar.css";
import { MenuItems } from "./MenuItems/MenuItems";
import { ThemeToggler } from "./ThemeToggler/ThemeToggler";

export const VerticalNavBar = () => {
  const {
    auth: { login },
  } = useAuth();

  return (
    <>
      <ThemeToggler />
      <div className="vertical-nav-container nav-bar-desktop">
        <MenuItems />
      </div>
    </>
  );
};
