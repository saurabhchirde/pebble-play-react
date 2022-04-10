import logoLight from "../../../../Data/Logo/logo-light.svg";
import logoDark from "../../../../Data/Logo/logo-dark.svg";
import SearchBar from "../SearchBar/SearchBar";
import NavbarLoginButton from "../NavbarLoginButton/NavbarLoginButton";
import NavbarAvatar from "../Avatar/NavbarAvatar";
import { useFilter, useAuth, useModal, useTheme } from "../../../../Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./DesktopNavigationBar.css";

export const DesktopNavigationBar = () => {
  const { setAlertText, setShowAlert } = useModal();
  const { filterDispatch, searchInput, setSearchInput } = useFilter();
  const { auth, authDispatch, showProfileMenu, setShowProfileMenu } = useAuth();
  const { theme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

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
    if (location.pathname.includes("account" || "settings")) {
      navigate("/videos");
    }
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((show) => !show);
  };

  return (
    <>
      <nav className="desktop-navigation-bar">
        <Link to="/">
          <img
            className="company-logo"
            src={theme === "dark" ? logoLight : logoDark}
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
        </div>
      </nav>
    </>
  );
};
