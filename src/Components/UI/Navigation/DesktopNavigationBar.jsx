import logoLight from "../../../Data/logo/logo-light.svg";
import logoDark from "../../../Data/logo/logo-dark.svg";
import BadgeIconButton from "../Button/BadgeIconButton";
import SearchBar from "./SearchBar/SearchBar";
import NavbarLoginButton from "./NavbarLoginButton/NavbarLoginButton";
import NavbarAvatar from "./Avatar/NavbarAvatar";
import {
  useCart,
  useFilter,
  useAuth,
  useModal,
  useTheme,
} from "../../../Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "../Button/IconButton";
import "./DesktopNavigationBar.css";

const DesktopNavigationBar = () => {
  const {
    cartState: { cart, wishlist },
  } = useCart();

  const { setShowLogin, setAlertText, setShowAlert } = useModal();
  const { filterDispatch, searchInput, setSearchInput } = useFilter();
  const { auth, authDispatch, showProfileMenu, setShowProfileMenu } = useAuth();
  const { darkTheme, setDarkTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const hideOnCheckout = location.pathname.includes("/checkout") ? false : true;

  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    filterDispatch({ type: "bySearch", payload: searchInput });
    navigate(`/products/search?query=${searchInput}`);
    setSearchInput("");
  };

  const onSearchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onWishlistClickHandler = () => {
    if (!auth.login) {
      setShowLogin(true);
    }
  };

  const onCartClickHandler = () => {
    if (!auth.login) {
      setShowLogin(true);
    }
  };

  const logoutClickHandler = () => {
    authDispatch({ type: "logout" });
    setAlertText("Logged out successfully");
    setShowAlert(true);
    if (location.pathname.includes("checkout" || "account" || "settings")) {
      navigate("/products");
    }
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((show) => !show);
  };

  const onThemeTogglerClick = () => {
    setDarkTheme((preTheme) => !preTheme);
  };

  const themeIcon = darkTheme ? "fa fa-sun" : "fa fa-moon";
  const navBarClass = darkTheme
    ? "desktop-navigation-bar dark-nav-bar"
    : "desktop-navigation-bar";

  return (
    <>
      <nav className={navBarClass}>
        <Link to="/">
          <img
            className="company-logo"
            src={darkTheme ? logoLight : logoDark}
            alt="logo"
          />
        </Link>
        <SearchBar
          searchWrapper="search-container"
          micIcon="hide"
          searchIcon="fas fa-search"
          placeholder="Search"
          onChange={onSearchInputHandler}
          onSubmit={onSearchSubmitHandler}
          value={searchInput}
        />
        <div className="nav-bar-btns">
          {!auth.login && (
            <NavbarLoginButton
              label={auth.login ? "Logout" : "Login"}
              btnClassName="btn primary-btn-md"
            />
          )}
          {hideOnCheckout && (
            <Link to="wishlist">
              <BadgeIconButton
                btnWrapper="badge-container"
                btnClassName="btn badge-icon-btn-lg"
                icon="far fa-heart"
                badgeClassName={
                  wishlist.length !== 0 ? "badge-on-icon" : "hide"
                }
                badgeValue={auth.login ? wishlist.length : null}
                onClick={onWishlistClickHandler}
              />
            </Link>
          )}
          {hideOnCheckout && (
            <Link to="cart">
              <BadgeIconButton
                btnWrapper="badge-container"
                btnClassName="btn badge-icon-btn-lg"
                icon="fas fa-shopping-cart"
                badgeClassName={cart.length !== 0 ? "badge-on-icon" : "hide"}
                badgeValue={auth.login ? cart.length : null}
                onClick={onCartClickHandler}
              />
            </Link>
          )}
          {auth.login && (
            <div onClick={toggleProfileMenu}>
              <NavbarAvatar
                avatarWrapper="badge-container"
                avatarClassName="avatar text-avatar-xsm-round"
                imgDisplay="hide"
                src={auth.user.dp !== "" ? auth.user.dp.toUpperCase() : ""}
              />
              {showProfileMenu && (
                <div className="profile-hover-menu card-shadow-two">
                  <Link to="account">
                    <h2>Profile</h2>
                  </Link>
                  <Link to="account/support">
                    <h2>Support</h2>
                  </Link>
                  <Link to="account/settings">
                    <h2>Settings</h2>
                  </Link>
                  <h2 onClick={logoutClickHandler}>Logout</h2>
                </div>
              )}
            </div>
          )}
          <IconButton
            onClick={onThemeTogglerClick}
            icon={themeIcon}
            btnClassName="btn icon-btn-md"
          />
        </div>
      </nav>
    </>
  );
};

export default DesktopNavigationBar;
