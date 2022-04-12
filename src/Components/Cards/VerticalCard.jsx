import { useState, useEffect } from "react";
import { useAuth, useAxiosCalls, useModal, useVideo } from "../../Context";
import { formatTimeDuration } from "../../Utils/formatTimeDuration";
import "./Cards.css";

export const VerticalCard = ({ videoDetail }) => {
  const {
    snippet: { title, publishedAt, thumbnails, channelTitle },
    contentDetails: { duration },
    statistics: { viewCount },
  } = videoDetail;

  const {
    auth: { token },
  } = useAuth();

  const { addToWatchlaterOnServer, removeFromWatchlaterOnServer } =
    useAxiosCalls();

  const { setShowLogin } = useModal();

  const {
    videoState: { watchlater },
  } = useVideo();
  const [watchlaterButton, setWatchlaterButton] = useState("far fa-clock");

  const watchlaterConfig = {
    url: "/api/user/watchlater",
    body: { video: { ...videoDetail } },
    headers: { headers: { authorization: token } },
  };

  const addToWatchlaterClickHandler = () => {
    if (token) {
      addToWatchlaterOnServer(watchlaterConfig);
      setWatchlaterButton("fas fa-clock");
    } else {
      setShowLogin(true);
    }
  };

  const removeFromWatchlaterClickHandler = () => {
    removeFromWatchlaterOnServer(watchlaterConfig);
    setWatchlaterButton("far fa-clock");
  };

  const watchlaterButtonStatus = () => {
    if (watchlaterButton === "far fa-clock") {
      addToWatchlaterClickHandler();
    } else {
      removeFromWatchlaterClickHandler();
    }
  };

  useEffect(() => {
    if (watchlater.findIndex((el) => el._id === videoDetail._id) !== -1) {
      setWatchlaterButton("fas fa-clock");
    } else {
      setWatchlaterButton("far fa-clock");
    }
  }, [watchlater, videoDetail._id, setWatchlaterButton]);

  return (
    <div className="card-vertical video-card-vertical">
      <div className="card-img-container">
        <img src={thumbnails.medium.url} alt="thumbnail" loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-nav-icon">
          <h2 className="p-md video-duration">
            {formatTimeDuration(duration)}
          </h2>
          <div>
            <button className="btn primary-text-btn-sm icon-md">
              <i className="far fa-thumbs-up"></i>
            </button>
            <button
              onClick={watchlaterButtonStatus}
              className="btn primary-text-btn-sm icon-md "
            >
              <i className={watchlaterButton}></i>
            </button>
            <button className="btn primary-text-btn-sm icon-md ">
              <i className="far fa-folder"></i>
            </button>
          </div>
        </div>
        <div className="card-text">
          <h1 className="card-title">{title}</h1>
          <h2 className="video-author">{channelTitle}</h2>
          <div className="video-views-date">
            <p className="mg-point6-rt">{viewCount} Views</p>
            <p className="mg-point6-lr">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="card-nav">
          <div className="card-cta-btn">
            <button className="btn primary-btn-md add-cart">Watch Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
