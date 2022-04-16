import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoCard } from "../../../Components/Cards/VideoCard";
import { useAuth, useAxiosCalls, useVideo } from "../../../Context";
import "./Playlist.css";

export const Playlist = () => {
  const {
    videoState: { singlePlaylist },
  } = useVideo();

  const { getPlayListFromServer } = useAxiosCalls();

  const {
    auth: { token },
  } = useAuth();

  const { playlistId } = useParams();

  const getPlaylistConfig = {
    url: "/api/user/playlists",
    headers: { headers: { authorization: token } },
    playlistId: playlistId,
  };

  useEffect(() => {
    getPlayListFromServer(getPlaylistConfig);
  }, []);

  const thumbnail = singlePlaylist?.videos[0]?.snippet?.thumbnails?.medium.url;

  return (
    <div className="playlist-body">
      <div className="flex-row-center flex-justify-space-between">
        <h1 className="playlist-title">Playlist</h1>
        <h1 className="playlist-title">
          Total videos : {singlePlaylist?.videos.length}
        </h1>
      </div>

      {singlePlaylist?.videos?.length > 0 ? (
        <div>
          <div className="playlist-detail-section">
            <img src={thumbnail} alt="thumbnail" />
            <div className="playlist-text-section">
              <h1>{singlePlaylist?.title}</h1>
              <p>{singlePlaylist?.description}</p>
            </div>
          </div>
          <div className="playlist-video-section flex-row">
            {singlePlaylist?.videos?.map((video) => (
              <VideoCard key={video._id} videoDetail={video} />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="playlist-sub-title">
          No videos in {singlePlaylist?.title}
        </h2>
      )}
    </div>
  );
};
