import { Link } from "react-router-dom";
import { useState } from "react";
import { useAxiosCalls } from "Context";
import "./PlaylistCard.css";
import { useSelector } from "react-redux";

export const PlaylistCard = ({ list }) => {
  const { removePlayListFromServer } = useAxiosCalls();

  const {
    auth: { token },
  } = useSelector((authState) => authState);

  const [trash, showTrash] = useState(true);

  const playlistConfig = {
    url: "/api/user/playlists",
    headers: { headers: { authorization: token } },
    playlistId: list._id,
  };

  const playlistDeleteClickHandler = () => {
    removePlayListFromServer(playlistConfig);
  };

  return (
    <div
      className="playlist-card-container"
      onMouseEnter={() => {
        showTrash(true);
      }}
      onMouseLeave={() => {
        showTrash(false);
      }}
    >
      {trash && (
        <i
          onClick={playlistDeleteClickHandler}
          className="fas fa-trash-alt"
        ></i>
      )}
      <Link to={`/playlist/${list._id}`}>
        <h1 className="playlist-card-detail">{list.title}</h1>
      </Link>
    </div>
  );
};
