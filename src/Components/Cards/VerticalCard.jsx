import { formatTimeDuration } from "../../Utils/formatTimeDuration";
import "./Cards.css";

export const VerticalCard = ({ videoDetail }) => {
  const {
    snippet: { title, publishedAt, thumbnails, channelTitle },
    contentDetails: { duration },
    statistics: { viewCount },
  } = videoDetail;

  return (
    <div className="card-vertical video-card-vertical">
      <div className="card-img-container">
        <img src={thumbnails.medium.url} alt="product-image" loading="lazy" />
      </div>
      <div className="card-body">
        <div className="card-nav-icon">
          <h2 className="p-md video-duration">
            {formatTimeDuration(duration)}
          </h2>
          <div>
            <button className="btn primary-text-btn-sm icon-md">
              <i className="far fa-thumbs-up"></i>
            </button>
            <button className="btn primary-text-btn-sm icon-md ">
              <i className="far fa-clock"></i>
            </button>
            <button className="btn primary-text-btn-sm icon-md ">
              <i className="far fa-folder"></i>
            </button>
          </div>
        </div>
        <div className="card-text">
          <h1 className="card-title">{title}</h1>
          <h2 className="video-author">{channelTitle}</h2>
          <div className="video-views-date">
            <p className="mg-point6-rt">{viewCount} Views</p>
            <p className="mg-point6-lr">
              {new Date(publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="card-nav">
          <div className="card-cta-btn">
            <button className="btn primary-btn-md add-cart">Watch Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
