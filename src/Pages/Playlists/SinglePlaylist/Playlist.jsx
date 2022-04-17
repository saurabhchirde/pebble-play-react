import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoCard } from "Components/Cards/VideoCard";
import { useAuth, useAxiosCalls, useVideo } from "Context";
import "./Playlist.css";

export const Playlist = () => {
  const {
    videoState: { playlists, singlePlaylist },
  } = useVideo();

  const { getPlayListFromServer } = useAxiosCalls();

  const {
    auth: { token },
  } = useAuth();

  const { playlistId } = useParams();
  const navigate = useNavigate();

  const getPlaylistConfig = {
    url: "/api/user/playlists",
    headers: { headers: { authorization: token } },
    playlistId: playlistId,
  };

  useEffect(() => {
    getPlayListFromServer(getPlaylistConfig);

    if (playlists.length < 1) {
      navigate("/playlists");
    }
  }, []);

  return (
    <div className="playlist-body">
      <div className="flex-row-center flex-justify-space-between">
        <h1 className="playlist-title">{singlePlaylist?.title}</h1>
        <h1 className="playlist-title">
          Total videos : {singlePlaylist?.videos?.length}
        </h1>
      </div>

      {singlePlaylist?.videos?.length > 0 ? (
        <div className="playlist-video-section flex-row">
          {singlePlaylist?.videos?.map((video) => (
            <VideoCard key={video._id} videoDetail={video} />
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
