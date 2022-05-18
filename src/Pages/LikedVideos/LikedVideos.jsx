import { VideoCard, NotLogged } from "Components";
import "./LikedVideos.css";
import { useSelector } from "react-redux";

export const LikedVideos = () => {
  // redux
  const {
    videoState: { likes },
  } = useSelector((videoState) => videoState);
  const {
    auth: { token },
  } = useSelector((authState) => authState);

  const mapLikedVideos =
    likes.length > 0 ? (
      <div className="liked-videos-video-section flex-row">
        {likes.map((video) => (
          <VideoCard key={video._id} videoDetail={video} />
        ))}
      </div>
    ) : (
      <h2 className="liked-videos-sub-title">No Videos Liked </h2>
    );

  return (
    <div className="liked-videos-body">
      {token ? (
        <>
          <h1 className="liked-videos-title">
            Liked Videos <i className="fas fa-thumbs-up mg-point6-lt"></i>
          </h1>
          {mapLikedVideos}
        </>
      ) : (
        <NotLogged message="Login to see liked videos" />
      )}
    </div>
  );
};
