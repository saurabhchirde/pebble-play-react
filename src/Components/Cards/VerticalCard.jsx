import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, useAxiosCalls, useModal, useVideo } from "../../Context";
import { formatTimeDuration } from "../../Utils/formatTimeDuration";
import Button from "../UI/Button/Button";
import IconButton from "../UI/Button/IconButton";
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
    removeFromHistoryListOnServer,
  } = useAxiosCalls();

  const { setShowLogin, setShowPlaylistModal } = useModal();

  const {
    videoState: { watchlater, likes, playlists },
    tempVideo,
    setTempVideo,
  } = useVideo();

  const { pathname } = useLocation();

  const onHistoryPage = pathname.includes("history") ? true : false;
  const onHomePage = pathname.includes("videos") ? true : false;

  const [watchlaterButton, setWatchlaterButton] = useState(
    "far fa-clock icon-inactive"
  );
  const [likeButton, setLikeButton] = useState(
    "far fa-thumbs-up icon-inactive"
  );
  const [playlistButton, setPlaylistButton] = useState(
    "fas fa-list icon-inactive"
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

  const historyConfig = {
    url: "/api/user/history",
    headers: { headers: { authorization: token } },
    history: videoDetail,
  };

  // like
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

  // watchlater
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

  // playlist
  const addToPlaylistClickHandler = () => {
    if (token) {
      setTempVideo(videoDetail);
      setShowPlaylistModal(true);
    } else {
      setShowLogin(true);
    }
  };

  const deleteFromHistoryHandler = () => {
    removeFromHistoryListOnServer(historyConfig);
  };

  const cardOrientation = onHistoryPage
    ? "card-horizontal video-card-horizontal"
    : onHomePage
    ? "card-vertical video-card-vertical animate-card"
    : "card-vertical video-card-vertical";

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
    <div className={cardOrientation}>
      <div className="card-img-container">
        <Link to={`/videos/${videoDetail._id}`}>
          <img src={thumbnails.medium.url} alt="thumbnail" loading="lazy" />
        </Link>
        {onHistoryPage && (
          <IconButton
            onClick={deleteFromHistoryHandler}
            btnClassName="btn icon-btn-sm history-delete-btn"
            icon="fas fa-times "
          />
        )}
      </div>
      <div className="card-body">
        {!onHistoryPage && (
          <div className="card-nav-icon">
            <h2 className="p-md video-duration">
              {formatTimeDuration(duration)}
            </h2>
            <div>
              <IconButton
                onClick={likeButtonStatus}
                btnClassName="btn icon-btn-sm icon-md"
                icon={likeButton}
              />
              <IconButton
                onClick={watchlaterButtonStatus}
                btnClassName="btn icon-btn-sm icon-md"
                icon={watchlaterButton}
              />
              <IconButton
                onClick={addToPlaylistClickHandler}
                btnClassName="btn icon-btn-sm icon-md"
                icon={playlistButton}
              />
            </div>
          </div>
        )}
        <div className="card-text">
          <h1 className="card-title">{title}</h1>
          <h2 className="video-author">{channelTitle}</h2>
          <div className="video-views-date">
            <p className="mg-point6-rt">{viewCount} Views</p>
            {!onHistoryPage && (
              <p className="mg-point6-lr">
                {new Date(publishedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <div className="card-nav">
          <div className="card-cta-btn">
            <Link to={`/videos/${videoDetail._id}`}>
              <Button
                label=" Watch Now"
                btnClassName="btn primary-outline-btn-md add-cart"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
