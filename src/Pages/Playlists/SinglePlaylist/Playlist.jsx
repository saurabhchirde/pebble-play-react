import { VerticalCard } from "../../../Components/Cards/VerticalCard";
import { useVideo } from "../../../Context";
import "./Playlist.css";

export const Playlist = () => {
  const {
    videoState: { singlePlaylist },
  } = useVideo();

  return (
    <div className="playlist-body">
      <h1 className="playlist-title">Playlist - {singlePlaylist?.title}</h1>
      {singlePlaylist?.videos?.length > 0 ? (
        <div className="playlist-video-section flex-row">
          {singlePlaylist?.videos?.map((video) => (
            <VerticalCard key={video._id} videoDetail={video} />
          ))}
        </div>
      ) : (
        <h2 className="playlist-sub-title">
          No videos in {singlePlaylist?.title}
        </h2>
      )}
    </div>
  );
};
