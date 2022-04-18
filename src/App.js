import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  DesktopNavigationBar,
  MobileNavigationBar,
  VerticalNavBar,
  MobileVerticalNavBar,
} from "./Components/UI/Navigation";
import {
  VideoListing,
  Watchlater,
  LikedVideos,
  SingleVideo,
  History,
  Playlists,
  Playlist,
  Landing,
  User,
  NotFound,
} from "./Pages";
import {
  BodyWrapper,
  Login,
  Signup,
  AlertModal,
  AnimateLoader,
  Alert,
  PlaylistModal,
  AnimateCamera,
} from "./Components";
import { useAlert, useAnimation, useModal } from "./Context";

function App() {
  const { showLogin, showSignup, showAlert, showNavMenu, showPlaylistModal } =
    useModal();
  const { loader, loaderCamera } = useAnimation();
  const {
    alertState: { showAlertBar },
  } = useAlert();

  return (
    <div className="App">
      {showAlertBar && <Alert />}
      {loader && <AnimateLoader />}
      {loaderCamera && <AnimateCamera />}
      {showLogin && <Login />}
      {showSignup && <Signup />}
      {showAlert && <AlertModal />}
      {showPlaylistModal && <PlaylistModal />}
      {!loaderCamera && (
        <div className="app">
          <DesktopNavigationBar />
          <MobileNavigationBar />
          <BodyWrapper>
            <VerticalNavBar />
            {showNavMenu && <MobileVerticalNavBar />}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/videos" element={<VideoListing />} />
              <Route path="/videos/:videoId" element={<SingleVideo />} />
              <Route path="/videos/search" element={<VideoListing />} />
              <Route path="/watchlater" element={<Watchlater />} />
              <Route path="/liked" element={<LikedVideos />} />
              <Route path="/history" element={<History />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
              <Route path="/user" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BodyWrapper>
        </div>
      )}
    </div>
  );
}

export default App;
