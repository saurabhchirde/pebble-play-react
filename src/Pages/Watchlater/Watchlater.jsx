import { VideoCard, NotLogged } from "Components";
import { useAuth, useVideo } from "Context";
import "./Watchlater.css";

export const Watchlater = () => {
  const {
    videoState: { watchlater },
  } = useVideo();
  const {
    auth: { token },
  } = useAuth();

  const mapWatchlater =
    watchlater.length > 0 ? (
      <div className="watchlater-video-section flex-row">
        {watchlater.map((video) => (
          <VideoCard key={video._id} videoDetail={video} />
        ))}
      </div>
    ) : (
      <h2 className="watchlater-sub-title">No videos in watchlater</h2>
    );

  return (
    <div className="watchlater-body">
      {token ? (
        <>
          <h1 className="watchlater-title">
            Watch Later <i className="fas fa-clock mg-point6-lt"></i>
          </h1>
          {mapWatchlater}
        </>
      ) : (
        <NotLogged message="Login to add videos in your Watch later" />
      )}
    </div>
  );
};
