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
  AllPlaylists,
  Playlist,
} from "./Pages";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { useAlert, useAnimation, useModal } from "./Context";
import Login from "./Components/UI/Modal/Login";
import Signup from "./Components/UI/Modal/Signup";
import AlertModal from "./Components/UI/Modal/AlertModal";
import Mockman from "mockman-js";
import AnimateLoader from "./Components/Animations/AnimateLoader";
import Alert from "./Components/Alert/Alert";
import { PlaylistModal } from "./Components/UI/Modal/PlaylistModal";

function App() {
  const { showLogin, showSignup, showAlert, showNavMenu, showPlaylistModal } =
    useModal();
  const { loader } = useAnimation();
  const {
    alertState: { showAlertBar },
  } = useAlert();

  return (
    <div className="App">
      {showAlertBar && <Alert />}
      {loader && <AnimateLoader />}
      {showLogin && <Login />}
      {showSignup && <Signup />}
      {showAlert && <AlertModal />}
      {showPlaylistModal && <PlaylistModal />}
      <DesktopNavigationBar />
      <MobileNavigationBar />
      <BodyWrapper>
        <VerticalNavBar />
        {showNavMenu && <MobileVerticalNavBar />}
        <Routes>
          <Route path="/videos" element={<VideoListing />} />
          <Route path="/videos/:videoId" element={<SingleVideo />} />
          <Route path="/videos/search" element={<VideoListing />} />
          <Route path="/watchlater" element={<Watchlater />} />
          <Route path="/liked" element={<LikedVideos />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlists" element={<AllPlaylists />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
          <Route path="mockman" element={<Mockman />} />
        </Routes>
      </BodyWrapper>
    </div>
  );
}

export default App;
