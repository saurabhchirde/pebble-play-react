import {
  NavbarLoginButton,
  SearchBar,
  NavbarAvatar,
  AlertToast,
} from "Components";
import logoIcon from "Data/Logo/logoIcon.svg";
import { useModal, useTheme } from "Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MobileNavigationBar.css";
import { ThemeToggler } from "..";
import { useSelector, useDispatch } from "react-redux";
import {
  authActions,
  filterActions,
  modalActions,
  userActions,
} from "Store/store";

export const MobileNavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    modalState: { showNavMenu },
  } = useSelector((modalState) => modalState);
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const { auth } = useSelector((authState) => authState);
  const {
    userInput: { showProfileMenu, searchInput },
  } = useSelector((userState) => userState);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(filterActions.searchVideo(searchInput));
    navigate(`/videos/search?query=${searchInput}`);
    dispatch(userActions.searchInput(""));
  };

  const searchInputHandler = (e) => {
    dispatch(userActions.searchInput(e.target.value));
  };

  const logoutClickHandler = () => {
    dispatch(authActions.logout());
    AlertToast("success", "Logged out Successfully", theme);
    if (location.pathname.includes("playlist" || "account" || "settings")) {
      navigate("/videos");
    }
  };

  const toggleProfileMenu = () => {
    dispatch(userActions.profileMenu(!showProfileMenu));
  };

  const toggleAccountNavMenu = () => {
    dispatch(modalActions.showNavMenu(!showNavMenu));
  };

  return (
    <nav className="mobile-navigation-bar">
      <div className="nav-header">
        <div onClick={toggleAccountNavMenu} className="hamburger">
          <i className="fas fa-bars"></i>
        </div>
        <Link to="/">
          <img className="logo" src={logoIcon} alt="logo" />
        </Link>
      </div>
      <SearchBar
        searchWrapper="search-container"
        micIcon="hide"
        searchIcon="fas fa-search"
        placeholder="Search"
        onChange={searchInputHandler}
        onSubmit={searchSubmitHandler}
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
                <Link to="/user">
                  <h2>Profile</h2>
                </Link>
                <h2 onClick={logoutClickHandler}>Logout</h2>
              </div>
            )}
          </div>
        )}
        <ThemeToggler />
      </div>
    </nav>
  );
};
