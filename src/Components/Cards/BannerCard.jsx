import { useState } from "react";
import poster from "Data/poster.webp";
import "./BannerCard.css";

export const BannerCard = () => {
  const [mute, setMute] = useState(true);

  return (
    <div className="card-horizontal-info banner-card">
      <div className="video-container">
        <video autoPlay="1" loop="1" muted={mute} poster={poster}>
          <source
            src="https://play-video.netlify.app/video/play.pebbleui/canon.mp4"
            type="video/mp4"
            alt="landing-intro"
          />
        </video>
        <i
          className={`fas fa-volume-${mute ? "mute" : "up"} volume-icon`}
          onClick={() => setMute((mute) => !mute)}
        ></i>
      </div>
    </div>
  );
};
