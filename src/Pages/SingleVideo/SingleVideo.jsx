import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PebblePlayer, VideoCard } from "Components";
import { useAxiosCalls, useModal } from "Context";
import "./SingleVideo.css";
import { useDispatch, useSelector } from "react-redux";
import { modalActions, videoActions } from "Store/store";
import { VideoDescription } from "./VideoDescription/VideoDescription";

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
  } = useSelector((authState) => authState);
  const dispatch = useDispatch();
  const {
    videoState: { videos, singleVideo, watchlater, likes },
  } = useSelector((videoState) => videoState);

  const [played, setPlayed] = useState(false);
  const { snippet, statistics } = singleVideo;
  const [watchlaterButton, setWatchlaterButton] = useState(
    "far fa-clock icon-inactive"
  );
  const [likeButton, setLikeButton] = useState(
    "far fa-thumbs-up icon-inactive"
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
      dispatch(modalActions.showLogin(true));
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
      dispatch(modalActions.showLogin(true));
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
      dispatch(videoActions.tempCacheVideo(singleVideo));
      dispatch(modalActions.showPlaylistModal(true));
    } else {
      dispatch(modalActions.showLogin(true));
    }
  };

  useEffect(() => {
    if (watchlater?.findIndex((el) => el?._id === singleVideo?._id) !== -1) {
      setWatchlaterButton("fas fa-clock");
    } else {
      setWatchlaterButton("far fa-clock icon-inactive");
    }

    if (likes?.findIndex((el) => el?._id === singleVideo?._id) !== -1) {
      setLikeButton("fas fa-thumbs-up");
    } else {
      setLikeButton("far fa-thumbs-up icon-inactive");
    }
  }, [likes, watchlater, singleVideo._id, setWatchlaterButton, setLikeButton]);

  const likedStatus =
    likes?.findIndex((el) => el?._id === singleVideo?._id) !== -1;

  const likeCount = likedStatus
    ? Number(singleVideo.statistics?.likeCount) + 1
    : Number(singleVideo.statistics?.likeCount);

  const mapMustWatched = videos?.map((video) => {
    return (
      video?.mustWatch && <VideoCard key={video?._id} videoDetail={video} />
    );
  });

  useEffect(() => {
    fetchVideoFromServer(videoConfig);
  }, [videoId]);

  return (
    <div className="video-page-body">
      {singleVideo && (
        <div className="video-player-container">
          <PebblePlayer
            videoId={videoId}
            videoDetails={singleVideo}
            played={played}
            setPlayed={setPlayed}
          />
          <VideoDescription
            snippet={snippet}
            statistics={statistics}
            likeButtonStatus={likeButtonStatus}
            likeButton={likeButton}
            likeCount={likeCount}
            watchlaterButtonStatus={watchlaterButtonStatus}
            watchlaterButton={watchlaterButton}
            addToPlaylistClickHandler={addToPlaylistClickHandler}
          />
        </div>
      )}
      <div className="must-watch-container">
        <h1 className="video-title text-center">Must Watch</h1>
        <div className="must-watch-videos">{mapMustWatched}</div>
      </div>
    </div>
  );
};
