import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  AxiosCallProvider,
  ModalProvider,
  ScrollToTop,
  ThemeProvider,
  VideoProvider,
} from "./index";

const PebblePlayProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop>
          <AnimationProvider>
            <ModalProvider>
              <VideoProvider>
                <AxiosCallProvider>{children}</AxiosCallProvider>
              </VideoProvider>
            </ModalProvider>
          </AnimationProvider>
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { PebblePlayProvider };
