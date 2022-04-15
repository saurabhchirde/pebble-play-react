import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VideoPlayer } from "../../Components/VIdeoPlayer/VideoPlayer";
import { useAuth, useAxiosCalls, useModal, useVideo } from "../../Context";
import "./SingleVideo.css";
import { VerticalCard } from "../../Components/Cards/VerticalCard";

export const SingleVideo = () => {
  const { videoId } = useParams();
  const {
    fetchVideoFromServer,
    likeVideoOnServer,
    unLikeVideoOnServer,
    addToWatchlaterOnServer,
    removeFromWatchlaterOnServer,
  } = useAxiosCalls();
  const {
    auth: { token },
  } = useAuth();
  const { setShowLogin } = useModal();
  const {
    videoState: { videos, singleVideo, watchlater, likes },
  } = useVideo();
  const [played, setPlayed] = useState(false);
  const { snippet, statistics } = singleVideo;
  const [watchlaterButton, setWatchlaterButton] = useState(
    "far fa-clock icon-inactive"
  );
  const [likeButton, setLikeButton] = useState(
    "far fa-thumbs-up icon-inactive"
  );
  const [playlistButton, setPlaylistButton] = useState(
    "far fa-folder icon-inactive"
  );

  const videoConfig = {
    url: `/api/video`,
    videoId: videoId,
  };

  const watchlaterConfig = {
    url: "/api/user/watchlater",
    body: { video: { ...singleVideo } },
    headers: { headers: { authorization: token } },
  };

  const likeConfig = {
    url: "/api/user/likes",
    body: { video: { ...singleVideo } },
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
    if (watchlater.findIndex((el) => el._id === singleVideo._id) !== -1) {
      setWatchlaterButton("fas fa-clock");
    } else {
      setWatchlaterButton("far fa-clock icon-inactive");
    }

    if (likes.findIndex((el) => el._id === singleVideo._id) !== -1) {
      setLikeButton("fas fa-thumbs-up");
    } else {
      setLikeButton("far fa-thumbs-up icon-inactive");
    }
  }, [watchlater, singleVideo._id, setWatchlaterButton, setLikeButton]);

  const likedStatus =
    likes.findIndex((el) => el._id === singleVideo._id) !== -1;

  const likeCount = likedStatus
    ? Number(singleVideo.statistics?.likeCount) + 1
    : Number(singleVideo.statistics?.likeCount);

  useEffect(() => {
    fetchVideoFromServer(videoConfig);
  }, [videoId]);

  return (
    <div className="video-page-body">
      {singleVideo && (
        <div className="video-player-container">
          <VideoPlayer
            videoId={videoId}
            videoDetails={singleVideo}
            played={played}
            setPlayed={setPlayed}
          />
          <div className="video-description">
            <h1 className="video-title mg-1-tb">{snippet?.title}</h1>
            <div className="video-description-heading">
              <div>
                <p>Views {statistics?.viewCount} ,</p>
                <p>
                  Uploaded on{" "}
                  {new Date(snippet?.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="video-cta-buttons">
                <button
                  onClick={likeButtonStatus}
                  className="btn primary-text-btn-sm icon-xl"
                >
                  <i className={likeButton}></i>
                  <p>{String(likeCount)}</p>
                </button>
                <button
                  onClick={watchlaterButtonStatus}
                  className="btn primary-text-btn-sm icon-xl "
                >
                  <i className={watchlaterButton}></i> <p>Watch Later</p>
                </button>
                <button className="btn primary-text-btn-sm icon-xl ">
                  <i className={playlistButton}></i> <p>Save</p>
                </button>
              </div>
            </div>
            <div className="video-description-body">
              <h2 className="title-lg-wt-5 mg-1-bot">
                Author - {snippet?.channelTitle}
              </h2>
              <p className="p-lg">{snippet?.localized.description}</p>
            </div>
          </div>
        </div>
      )}
      <div className="must-watch-container">
        <h1 className="video-title text-center">Must Watch</h1>

        <div className="must-watch-videos">
          {videos.map((video) => {
            return (
              video.mustWatch && (
                <VerticalCard key={video._id} videoDetail={video} />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
