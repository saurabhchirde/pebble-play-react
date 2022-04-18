import { useVideo } from "Context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BannerCard.css";
import { IconButton } from "Components";

export const BannerCard = () => {
  const {
    videoState: { videos },
  } = useVideo();
  const [imgIndex, setImgIndex] = useState(6);

  const video = videos[imgIndex];

  const image = video?.snippet?.thumbnails?.maxres?.url;
  const videoId = video?._id;
  const title = video?.snippet?.title;

  const onPreviousBannerClickHandler = () => {
    setImgIndex((preIndex) => preIndex - 1);
  };

  const onNextBannerClickHandler = () => {
    setImgIndex((preIndex) => preIndex + 1);
  };

  useEffect(() => {
    const bannerTime = setInterval(() => {
      setImgIndex((preIndex) => preIndex + 1);
    }, 5000);
    return () => {
      clearInterval(bannerTime);
    };
  }, [setImgIndex]);

  return (
    <>
      <Link to={`/videos/${videoId}`}>
        <div className="card-horizontal-info banner-card">
          <img
            loading="lazy"
            src={image}
            alt="banner"
            className="banner-change-time"
          />
          <h1>{title}</h1>
        </div>{" "}
      </Link>
      <div className="banner-change-btn">
        <IconButton
          onClick={onPreviousBannerClickHandler}
          icon="fas fa-arrow-left"
          btnClassName="btn icon-btn-md"
        />
        <IconButton
          onClick={onNextBannerClickHandler}
          icon="fas fa-arrow-right"
          btnClassName="btn icon-btn-md"
        />
      </div>
    </>
  );
};
