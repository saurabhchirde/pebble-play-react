import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth, useAxiosCalls } from "../../Context";

export const PlaylistCard = ({ list }) => {
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
  }, [playlistId, list]);

  return (
    <Link to={`/playlist/${list._id}`}>
      <div className="playlist-card-container">
        <img
          // src={thumbnails?.medium?.url}
          alt="thumbnail"
          className="playlist-card-image"
        />
        <div className="playlist-card-detail">
          <h2>12</h2>
          <i className="fas fa-list"></i>
        </div>
      </div>
    </Link>
  );
};
