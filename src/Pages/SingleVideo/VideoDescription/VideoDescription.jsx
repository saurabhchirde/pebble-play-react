export const VideoDescription = ({
  snippet,
  statistics,
  likeButtonStatus,
  likeButton,
  likeCount,
  watchlaterButtonStatus,
  watchlaterButton,
  addToPlaylistClickHandler,
}) => {
  return (
    <div className="video-description">
      <h1 className="video-title mg-1-tb">{snippet?.title}</h1>
      <div className="video-description-heading">
        <div>
          <p>Views {statistics?.viewCount} ,</p>
          <p>
            Uploaded on {new Date(snippet?.publishedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="video-cta-buttons">
          <button
            onClick={likeButtonStatus}
            className="btn primary-text-btn-sm icon-xl"
          >
            <i className={likeButton}></i>
            <p>{String(likeCount)}</p>
          </button>
          <button
            onClick={watchlaterButtonStatus}
            className="btn primary-text-btn-sm icon-xl "
          >
            <i className={watchlaterButton}></i> <p>Watch Later</p>
          </button>
          <button
            onClick={addToPlaylistClickHandler}
            className="btn primary-text-btn-sm icon-xl "
          >
            <i className="fas fa-list icon-inactive"></i> <p>Save</p>
          </button>
        </div>
      </div>
      <div className="video-description-body">
        <h2 className="title-lg-wt-5 mg-1-bot">
          Author - {snippet?.channelTitle}
        </h2>
        <p className="p-lg">{snippet?.localized?.description}</p>
      </div>
    </div>
  );
};
