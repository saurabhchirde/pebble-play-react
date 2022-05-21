import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoCard } from "Components";
import { useAxiosCalls } from "Context";
import "./Playlist.css";
import { useSelector } from "react-redux";

export const Playlist = () => {
  const {
    videoState: { playlists, singlePlaylist },
  } = useSelector((videoState) => videoState);
  const {
    auth: { token },
  } = useSelector((authState) => authState);

  const { getPlayListFromServer } = useAxiosCalls();
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const getPlaylistConfig = {
    url: "/api/user/playlists",
    headers: { headers: { authorization: token } },
    playlistId: playlistId,
  };

  const showPlaylist = (
    <div className="playlist-video-section flex-row">
      {singlePlaylist?.videos?.map((video) => (
        <VideoCard key={video?._id} videoDetail={video} />
      ))}
    </div>
  );

  const noVideosMessage = (
    <h2 className="playlist-sub-title">No videos in {singlePlaylist?.title}</h2>
  );

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
      {singlePlaylist?.videos?.length > 0 ? showPlaylist : noVideosMessage}
    </div>
  );
};
