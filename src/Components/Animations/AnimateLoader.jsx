import "./Animation.css";
import { useEffect } from "react";
import loader from "Data/Img/Animation/loader.json";
import lottie from "lottie-web";

export const AnimateLoader = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loader"),
      animationData: loader,
    });
    return () => {
      // to unmount useEffect
    };
  }, []);

  return (
    <div className="loader-animation">
      <div id="loader" />
    </div>
  );
};
