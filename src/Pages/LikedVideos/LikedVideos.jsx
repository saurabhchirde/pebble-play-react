import { useAuth, useVideo } from "Context";
import { VideoCard, NotLogged } from "Components";
import "./LikedVideos.css";

export const LikedVideos = () => {
  const {
    videoState: { likes },
  } = useVideo();
  const {
    auth: { token },
  } = useAuth();

  return (
    <div className="liked-videos-body">
      {token ? (
        <>
          <h1 className="liked-videos-title">
            Liked Videos <i className="fas fa-thumbs-up mg-point6-lt"></i>
          </h1>
          {likes.length > 0 ? (
            <div className="liked-videos-video-section flex-row">
              {likes.map((video) => (
                <VideoCard key={video._id} videoDetail={video} />
              ))}
            </div>
          ) : (
            <h2 className="liked-videos-sub-title">No Videos Liked </h2>
          )}
        </>
      ) : (
        <NotLogged message="Login to see liked videos" />
      )}
    </div>
  );
};
