import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  DesktopNavigationBar,
  MobileNavigationBar,
  VerticalNavBar,
  MobileVerticalNavBar,
} from "./Components/UI/Navigation";
import { VideoListing, Watchlater } from "./Pages";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { useAnimation, useModal } from "./Context";
import Login from "./Components/UI/Modal/Login";
import Signup from "./Components/UI/Modal/Signup";
import AlertModal from "./Components/UI/Modal/AlertModal";
import Mockman from "mockman-js";
import { AllAlerts } from "./Components/AllAlerts/AllAlerts";
import AnimateLoader from "./Components/Animations/AnimateLoader";

function App() {
  const { showLogin, showSignup, showAlert, showNavMenu } = useModal();
  const { loader } = useAnimation();

  return (
    <div className="App">
      <AllAlerts />
      {loader && <AnimateLoader />}
      {showLogin && <Login />}
      {showSignup && <Signup />}
      {showAlert && <AlertModal />}
      {}
      <DesktopNavigationBar />
      <MobileNavigationBar />
      <BodyWrapper>
        <VerticalNavBar />
        {showNavMenu && <MobileVerticalNavBar />}
        <Routes>
          <Route path="/videos" element={<VideoListing />} />
          <Route path="/watchlater" element={<Watchlater />} />
          <Route path="mockman" element={<Mockman />} />
        </Routes>
      </BodyWrapper>
    </div>
  );
}

export default App;
