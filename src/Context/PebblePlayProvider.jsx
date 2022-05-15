import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  AxiosCallProvider,
  FilterProvider,
  AuthProvider,
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
            <AuthProvider>
              <ModalProvider>
                <FilterProvider>
                  <VideoProvider>
                    <AxiosCallProvider>{children}</AxiosCallProvider>
                  </VideoProvider>
                </FilterProvider>
              </ModalProvider>
            </AuthProvider>
          </AnimationProvider>
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { PebblePlayProvider };
