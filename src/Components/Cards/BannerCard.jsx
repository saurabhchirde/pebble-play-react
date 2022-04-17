import { useVideo } from "Context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Cards.css";

export const BannerCard = () => {
  const {
    videoState: { videos },
  } = useVideo();
  const [imgIndex, setImgIndex] = useState(0);

  const video = videos[imgIndex];

  const image = video?.snippet?.thumbnails?.maxres?.url;
  const videoId = video?._id;
  const title = video?.snippet?.title;

  useEffect(() => {
    const bannerTime = setInterval(() => {
      setImgIndex(Math.trunc(Math.random() * 40));
    }, 6600);
    return () => {
      clearInterval(bannerTime);
    };
  }, [setImgIndex]);

  return (
    <Link to={`/videos/${videoId}`}>
      <div className="card-horizontal-info banner-card">
        <img
          loading="lazy"
          src={image}
          alt="banner"
          className="banner-change-time"
        />
        <h1>{title}</h1>
      </div>
    </Link>
  );
};
