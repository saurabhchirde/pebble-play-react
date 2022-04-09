import NavbarLoginButton from "./NavbarLoginButton/NavbarLoginButton";
import SearchBar from "./SearchBar/SearchBar";
import logoIcon from "../../../Data/logo/icon.svg";
import NavbarAvatar from "./Avatar/NavbarAvatar";
import { useAuth, useFilter, useModal, useTheme } from "../../../Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "../Button/IconButton";

const MobileNavigationBar = () => {
  const { auth, authDispatch, showProfileMenu, setShowProfileMenu } = useAuth();
  const { filterDispatch, searchInput, setSearchInput } = useFilter();
  const location = useLocation();
  const navigate = useNavigate();
  const { setAlertText, setShowAlert, setShowNavMenu } = useModal();
  const { darkTheme, setDarkTheme } = useTheme();

  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    filterDispatch({ type: "bySearch", payload: searchInput });
    navigate(`/products/search?query=${searchInput}`);
    setSearchInput("");
  };

  const onSearchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const logoutClickHandler = () => {
    authDispatch({ type: "logout" });
    setAlertText("Logged out successfully");
    setShowAlert(true);
    if (
      location.pathname.includes(
        "checkout" || "user" || "profile" || "settings"
      )
    ) {
      navigate("/products");
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((show) => !show);
  };

  const toggleAccountNavMenu = () => {
    setShowNavMenu((show) => !show);
  };

  const onThemeTogglerClick = () => {
    setDarkTheme((preTheme) => !preTheme);
  };

  const navBarClass = darkTheme
    ? "mobile-navigation-bar dark-nav-bar"
    : "mobile-navigation-bar";

  const themeIcon = darkTheme ? "fa fa-sun" : "fa fa-moon";

  return (
    <>
      <nav className={navBarClass}>
        <div className="nav-header">
          {location.pathname.includes("account") && (
            <div onClick={toggleAccountNavMenu} className="hamburger">
              <i className="fas fa-bars"></i>
            </div>
          )}
          <Link to="/">
            <img className="logo" src={logoIcon} alt="logo" />
          </Link>
        </div>
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
        </div>
        <div className="profile-theme-toggle">
          {auth.login && (
            <div>
              <NavbarAvatar
                onClick={toggleProfileMenu}
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

export default MobileNavigationBar;
