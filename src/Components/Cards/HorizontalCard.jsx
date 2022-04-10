import "./Cards.css";

export const HorizontalCard = () => {
  return (
    <div className="card-horizontal-info video-card-horizaontal">
      <div className="video-time-duration ">
        <h2>2:21 min</h2>
      </div>
      <div className="card-img-container">
        <img loading="lazy" src="" alt="product-image" />
      </div>
      <div className="card-text">
        <h1>Canon EOS 1500D</h1>
      </div>
    </div>
  );
};
