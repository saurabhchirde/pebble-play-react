import { VerticalCard } from "../../Components/Cards/VerticalCard";
import { useAuth, useModal, useVideo } from "../../Context";
import { NotLogged } from "../../Components/NotLogged/NotLogged";
import "./Watchlater.css";

export const Watchlater = () => {
  const {
    videoState: { watchlater },
  } = useVideo();
  const {
    auth: { token },
  } = useAuth();

  return (
    <div className="watchlater-body">
      {token ? (
        <>
          <h1 className="watchlater-title">
            Watch Later <i className="fas fa-clock mg-point6-lt"></i>
          </h1>
          {watchlater.length > 0 ? (
            <div className="watchlater-video-section flex-row">
              {watchlater.map((video) => (
                <VerticalCard key={video._id} videoDetail={video} />
              ))}
            </div>
          ) : (
            <h2 className="watchlater-sub-title">No videos in watchlater</h2>
          )}
        </>
      ) : (
        <NotLogged />
      )}
    </div>
  );
};
