import "./Animation.css";
import { useEffect } from "react";
import camera_dark from "../../Data/Img/Animation/camera_dark.json";
import camera_light from "../../Data/Img/Animation/camera_light.json";
import { useAnimation, useTheme } from "../../Context";
import lottie from "lottie-web";

const AnimateCamera = () => {
  const { setLoaderCamera } = useAnimation();
  const { darkTheme } = useTheme();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#camera-dark"),
      animationData: darkTheme ? camera_dark : camera_light,
    });
    const animateTime = setTimeout(() => {
      setLoaderCamera(false);
    }, 2500);
    return () => {
      clearTimeout(animateTime);
    };
  }, [setLoaderCamera, darkTheme]);

  return (
    <div className="camera-animation">
      <div id="camera-dark" />
    </div>
  );
};

export default AnimateCamera;
