import { Link } from "react-router-dom";

export const PlaylistCard = ({ list }) => {
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
