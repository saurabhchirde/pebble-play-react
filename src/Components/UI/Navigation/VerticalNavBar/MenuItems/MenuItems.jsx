import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./MenuItems.css";

export const MenuItems = () => {
  const { pathname } = useLocation();

  const {
    auth: { login },
  } = useSelector((authState) => authState);

  const activeHome = pathname === "/" ? "active-nav " : "";
  const activeExplore = pathname.includes("videos") ? "active-nav " : "";
  const activeLiked = pathname.includes("liked") ? "active-nav " : "";
  const activePlaylist = pathname.includes("playlist") ? "active-nav " : " ";
  const activeWatchlater = pathname.includes("watchlater") ? "active-nav " : "";
  const activeHistory = pathname.includes("history") ? "active-nav " : "";

  return (
    <div className="vertical-nav-menu">
      <h1>Menu</h1>
      <Link to="/">
        <div className={activeHome}>
          <i className="fas fa-home"></i>
          <h2 className="vertical-menu-title">Home</h2>
        </div>
      </Link>
      <Link to="videos">
        <div className={activeExplore}>
          <i className="fas fa-globe"></i>
          <h2 className="vertical-menu-title">Explore</h2>
        </div>
      </Link>
      {login && (
        <>
          <Link to="liked">
            <div className={activeLiked}>
              <i className="far fa-heart"></i>
              <h2 className="vertical-menu-title">Liked</h2>
            </div>
          </Link>
          <Link to="playlists">
            <div className={activePlaylist}>
              <i className="fas fa-list"></i>
              <h2 className="vertical-menu-title">Playlists</h2>
            </div>
          </Link>
          <Link to="watchlater">
            <div className={activeWatchlater}>
              <i className="far fa-clock"></i>
              <h2 className="vertical-menu-title">Watchlater</h2>
            </div>
          </Link>
          <Link to="history">
            <div className={activeHistory}>
              <i className="fas fa-history"></i>
              <h2 className="vertical-menu-title">History</h2>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
