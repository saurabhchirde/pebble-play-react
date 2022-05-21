import { BrowserRouter } from "react-router-dom";
import {
  AnimationProvider,
  AxiosCallProvider,
  ScrollToTop,
  ThemeProvider,
} from "./index";

const PebblePlayProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop>
          <AnimationProvider>
            <AxiosCallProvider>{children}</AxiosCallProvider>
          </AnimationProvider>
        </ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { PebblePlayProvider };
