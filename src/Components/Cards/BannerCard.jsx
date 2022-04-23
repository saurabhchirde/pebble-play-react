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
    if (imgIndex <= 0) {
      setImgIndex(40);
    } else {
      setImgIndex((preIndex) => preIndex - 1);
    }
  };

  const onNextBannerClickHandler = () => {
    setImgIndex((preIndex) => preIndex + 1);
  };

  useEffect(() => {
    if (imgIndex > 40) {
      setImgIndex(0);
    }
    const bannerTime = setInterval(() => {
      setImgIndex((preIndex) => preIndex + 1);
    }, 5000);
    return () => {
      clearInterval(bannerTime);
    };
  }, [imgIndex, setImgIndex]);

  return (
    <>
      <div className="card-horizontal-info banner-card">
        <Link to={`/videos/${videoId}`}>
          <img
            loading="lazy"
            src={image}
            alt="banner"
            className="banner-change-time"
          />{" "}
        </Link>
        <h1>{title}</h1>
      </div>{" "}
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
