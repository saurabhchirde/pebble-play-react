import "./Animation.css";
import { useEffect } from "react";
import camera_dark from "Data/Img/Animation/camera_dark.json";
import camera_light from "Data/Img/Animation/camera_light.json";
import { useAnimation, useTheme } from "Context";
import lottie from "lottie-web";

export const AnimateCamera = () => {
  const { setLoaderCamera } = useAnimation();
  const { theme } = useTheme();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#camera-dark"),
      animationData: theme === "dark" ? camera_dark : camera_light,
    });
    const animateTime = setTimeout(() => {
      setLoaderCamera(false);
    }, 2500);
    return () => {
      clearTimeout(animateTime);
    };
  }, [theme, setLoaderCamera]);

  return (
    <div className="camera-animation">
      <div id="camera-dark" />
    </div>
  );
};
