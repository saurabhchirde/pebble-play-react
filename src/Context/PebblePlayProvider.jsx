import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  AxiosCallProvider,
  FilterProvider,
  AlertProvider,
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
          <AlertProvider>
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
          </AlertProvider>
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { PebblePlayProvider };
