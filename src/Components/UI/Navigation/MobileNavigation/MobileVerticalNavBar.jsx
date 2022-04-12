import { Link, useLocation } from "react-router-dom";
import { useModal, useTheme } from "../../../../Context";
import IconButton from "../../Button/IconButton";
import "../VerticalNavBar.css";

export const MobileVerticalNavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { setShowNavMenu } = useModal();
  const { pathname } = useLocation();

  const activeHome = pathname.includes("videos") ? "active-nav " : "";
  const activeTrending = pathname.includes("trending") ? "active-nav " : "";
  const activePlaylist = pathname.includes("playlist") ? "active-nav " : " ";
  const activeWatchlater = pathname.includes("watchlater") ? "active-nav " : "";
  const activeHistory = pathname.includes("history") ? "active-nav " : "";

  const themeIcon = theme === "dark" ? "fa fa-sun" : "fa fa-moon";

  return (
    <>
      <div
        onClick={() => {
          setShowNavMenu(false);
        }}
        className="modal-backdrop"
      ></div>
      <div className="vertical-nav-container nav-bar-mobile">
        <div className="vertical-nav-menu">
          <h1>Menu</h1>
          <Link to="/videos">
            <div className={activeHome}>
              <i className="fas fa-home"></i>
              <h2>Home</h2>
            </div>
          </Link>
          <Link to="trending">
            <div className={activeTrending}>
              <i className="fas fa-globe"></i>
              <h2>Trending</h2>
            </div>
          </Link>
          <Link to="playlist">
            <div className={activePlaylist}>
              <i className="fas fa-desktop"></i>
              <h2>Playlist</h2>
            </div>
          </Link>
          <Link to="watchlater">
            <div className={activeWatchlater}>
              <i className="fas fa-clock"></i>
              <h2>Watchlater</h2>
            </div>
          </Link>
          <Link to="history">
            <div className={activeHistory}>
              <i className="fas fa-history"></i>
              <h2>History</h2>
            </div>
          </Link>
        </div>
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