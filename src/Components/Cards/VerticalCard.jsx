import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const {
    likeVideoOnServer,
    unLikeVideoOnServer,
    addToWatchlaterOnServer,
    removeFromWatchlaterOnServer,
  } = useAxiosCalls();

  const { setShowLogin } = useModal();

  const {
    videoState: { watchlater, likes },
  } = useVideo();
  const [watchlaterButton, setWatchlaterButton] = useState(
    "far fa-clock icon-inactive"
  );
  const [likeButton, setLikeButton] = useState(
    "far fa-thumbs-up icon-inactive"
  );
  const [playlistButton, setPlaylistButton] = useState(
    "far fa-folder icon-inactive"
  );

  const watchlaterConfig = {
    url: "/api/user/watchlater",
    body: { video: { ...videoDetail } },
    headers: { headers: { authorization: token } },
  };

  const likeConfig = {
    url: "/api/user/likes",
    body: { video: { ...videoDetail } },
    headers: { headers: { authorization: token } },
  };

  const addToLikeVideoHandler = () => {
    if (token) {
      likeVideoOnServer(likeConfig);
      setLikeButton("fas fa-thumbs-up");
    } else {
      setShowLogin(true);
    }
  };

  const removeLikeVideoHandler = () => {
    unLikeVideoOnServer(likeConfig);
    setLikeButton("far fa-thumbs-up icon-inactive");
  };

  const likeButtonStatus = () => {
    if (likeButton === "far fa-thumbs-up icon-inactive") {
      addToLikeVideoHandler();
    } else {
      removeLikeVideoHandler();
    }
  };

  const addToWatchlaterClickHandler = () => {
    if (token) {
      addToWatchlaterOnServer(watchlaterConfig);
      setWatchlaterButton("fas fa-clock icon-inactive");
    } else {
      setShowLogin(true);
    }
  };

  const removeFromWatchlaterClickHandler = () => {
    removeFromWatchlaterOnServer(watchlaterConfig);
    setWatchlaterButton("far fa-clock icon-inactive");
  };

  const watchlaterButtonStatus = () => {
    if (watchlaterButton === "far fa-clock icon-inactive") {
      addToWatchlaterClickHandler();
    } else {
      removeFromWatchlaterClickHandler();
    }
  };

  useEffect(() => {
    if (watchlater.findIndex((el) => el._id === videoDetail._id) !== -1) {
      setWatchlaterButton("fas fa-clock");
    } else {
      setWatchlaterButton("far fa-clock icon-inactive");
    }

    if (likes.findIndex((el) => el._id === videoDetail._id) !== -1) {
      setLikeButton("fas fa-thumbs-up");
    } else {
      setLikeButton("far fa-thumbs-up icon-inactive");
    }
  }, [watchlater, videoDetail._id, setWatchlaterButton, setLikeButton]);

  return (
    <div className="card-vertical video-card-vertical">
      <div className="card-img-container">
        <Link to={`/videos/${videoDetail._id}`}>
          <img src={thumbnails.medium.url} alt="thumbnail" loading="lazy" />
        </Link>
      </div>

      <div className="card-body">
        <div className="card-nav-icon">
          <h2 className="p-md video-duration">
            {formatTimeDuration(duration)}
          </h2>
          <div>
            <button
              onClick={likeButtonStatus}
              className="btn primary-text-btn-sm icon-md"
            >
              <i className={likeButton}></i>
            </button>
            <button
              onClick={watchlaterButtonStatus}
              className="btn primary-text-btn-sm icon-md "
            >
              <i className={watchlaterButton}></i>
            </button>
            <button className="btn primary-text-btn-sm icon-md ">
              <i className={playlistButton}></i>
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
            <Link to={`/videos/${videoDetail._id}`}>
              <button className="btn primary-outline-btn-md add-cart">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
