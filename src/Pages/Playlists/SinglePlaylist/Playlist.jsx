import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VerticalCard } from "../../../Components/Cards/VerticalCard";
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
  }, [playlistId]);

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
