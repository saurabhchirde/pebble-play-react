import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  AxiosCallProvider,
  ModalProvider,
  ScrollToTop,
  ThemeProvider,
} from "./index";

const PebblePlayProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop>
          <AnimationProvider>
            <ModalProvider>
              <AxiosCallProvider>{children}</AxiosCallProvider>
            </ModalProvider>
          </AnimationProvider>
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { PebblePlayProvider };
