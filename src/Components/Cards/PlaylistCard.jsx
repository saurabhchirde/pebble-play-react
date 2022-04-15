export const PlaylistCard = ({ list }) => {
  const { videos } = list;
  console.log(videos);
  //   const {
  //     snippet: { thumbnails },
  //   } = videos[0];

  return (
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
  );
};
