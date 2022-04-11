import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  DesktopNavigationBar,
  MobileNavigationBar,
  VerticalNavBar,
  MobileVerticalNavBar,
} from "./Components/UI/Navigation";
import { VideoListing } from "./Pages";
import BodyWrapper from "./Components/UI/Wrapper/BodyWrapper";
import { useModal } from "./Context";

function App() {
  const { showNavMenu } = useModal();

  return (
    <div className="App">
      <DesktopNavigationBar />
      <MobileNavigationBar />
      <BodyWrapper>
        <VerticalNavBar />
        {showNavMenu && <MobileVerticalNavBar />}
        <Routes>
          <Route path="/videos" element={<VideoListing />} />
        </Routes>
      </BodyWrapper>
    </div>
  );
}

export default App;
