import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAxiosCalls, useModal, useVideo } from "Context";
import { formatTimeDuration } from "Utils/formatTimeDuration";
import { Button, IconButton } from "Components";
import axios from "axios";
import "./VideoCard.css";
import { useSelector } from "react-redux";

export const VideoCard = ({ videoDetail }) => {
  const {
    snippet: { title, publishedAt, thumbnails, channelTitle },
    contentDetails: { duration },
    statistics: { viewCount },
  } = videoDetail;

  const { auth } = useSelector((authState) => authState);

  const {
    likeVideoOnServer,
    unLikeVideoOnServer,
    addToWatchlaterOnServer,
    removeFromWatchlaterOnServer,
    removeFromHistoryListOnServer,
    deleteVideoFromPlaylistOnServer,
  } = useAxiosCalls();

  const { setShowLogin, setShowPlaylistModal } = useModal();

  const {
    videoState: { watchlater, likes, singlePlaylist },
    setTempVideo,
    videoDispatch,
  } = useVideo();

  const [trash, showTrash] = useState(true);
  const { playlistId } = useParams();

  const { pathname } = useLocation();

  const onHistoryPage = pathname.includes("history");
  const onHomePage = pathname.includes("videos");
  const onPlaylistPage = pathname.includes("/playlist/");

  const [watchlaterButton, setWatchlaterButton] = useState(
    "far fa-clock icon-inactive"
  );
  const [likeButton, setLikeButton] = useState(
    "far fa-thumbs-up icon-inactive"
  );

  const watchlaterConfig = {
    url: "/api/user/watchlater",
    body: { video: { ...videoDetail } },
    headers: { headers: { authorization: auth.token } },
  };

  const likeConfig = {
    url: "/api/user/likes",
    body: { video: { ...videoDetail } },
    headers: { headers: { authorization: auth.token } },
  };

  const historyConfig = {
    url: "/api/user/history",
    headers: { headers: { authorization: auth.token } },
    history: videoDetail,
  };

  const deleteVideoConfig = {
    url: "/api/user/playlists",
    headers: { headers: { authorization: auth.token } },
    videoId: videoDetail._id,
    playlistId: playlistId,
  };

  // like
  const addToLikeVideoHandler = () => {
    if (auth.token) {
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
    if (auth.token) {
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
    if (auth.token) {
      setTempVideo(videoDetail);
      setShowPlaylistModal(true);
    } else {
      setShowLogin(true);
    }
  };

  const deleteFromHistoryHandler = () => {
    removeFromHistoryListOnServer(historyConfig);
  };

  const onPlaylistVideoDeleteClickHandler = () => {
    deleteVideoFromPlaylistOnServer(deleteVideoConfig);
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
  }, [likes, watchlater, videoDetail._id, setWatchlaterButton, setLikeButton]);

  useEffect(() => {
    const fetchPlatlists = async () => {
      const respPlaylist = await axios.get("/api/user/playlists", {
        headers: { authorization: auth.token },
      });

      videoDispatch({
        type: "GET_PLAYLIST_FROM_SERVER",
        payload: respPlaylist.data.playlists,
      });
    };

    fetchPlatlists();
  }, [singlePlaylist, auth.token, videoDispatch]);

  return (
    <div
      className={cardOrientation}
      onMouseEnter={() => {
        showTrash(true);
      }}
      onMouseLeave={() => {
        showTrash(false);
      }}
    >
      <div className="card-img-container">
        <Link to={`/videos/${videoDetail._id}`}>
          <img src={thumbnails.medium.url} alt="thumbnail" loading="lazy" />
        </Link>
        {onPlaylistPage && trash && (
          <div className="tool-tip">
            <i
              onClick={onPlaylistVideoDeleteClickHandler}
              className="fas fa-trash-alt trash-icon"
            ></i>
            <p className="tool-tip-playlist">Delete from Playlist</p>
          </div>
        )}
        {onHistoryPage && (
          <div className="tool-tip">
            <IconButton
              onClick={deleteFromHistoryHandler}
              btnClassName="btn icon-btn-xsm history-delete-btn"
              icon="fas fa-times "
            />
            <p className="tool-tip-history">Remove from History</p>
          </div>
        )}
      </div>
      <div className="card-body">
        {!onHistoryPage && (
          <div className="card-nav-icon">
            <h2 className="p-md video-duration">
              {formatTimeDuration(duration)}
            </h2>
            <div>
              <div className="tool-tip">
                <IconButton
                  onClick={likeButtonStatus}
                  btnClassName="btn icon-btn-sm icon-md"
                  icon={likeButton}
                />
                <p className="tool-tip-like">Like</p>
              </div>
              <div className="tool-tip">
                <IconButton
                  onClick={watchlaterButtonStatus}
                  btnClassName="btn icon-btn-sm icon-md"
                  icon={watchlaterButton}
                />
                <p className="tool-tip-watchlater">Watchlater</p>
              </div>
              <div className="tool-tip">
                <IconButton
                  onClick={addToPlaylistClickHandler}
                  btnClassName="btn icon-btn-sm icon-md"
                  icon="fas fa-list icon-inactive"
                />
                <p className="tool-tip-playlist">Playlist</p>
              </div>
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
