import { VerticalCard } from "../../Components/Cards/VerticalCard";
import FloatingButton from "../../Components/UI/Button/FloatingButton";
import { useVideo } from "../../Context";
import "./VideoListing.css";

export const VideoListing = () => {
  const {
    videoState: { videos, categories },
  } = useVideo();

  return (
    <div className="video-listing-body">
      <div className="discover-section"></div>
      <form className="category-section">
        <div className="category-label">All</div>
        {categories.map((category) => {
          return (
            <li key={category._id} className="category-label">
              {category.categoryName}
            </li>
          );
        })}
      </form>
      <div className="all-videos-section">
        {videos.map((video) => (
          <VerticalCard key={video._id} videoDetail={video} />
        ))}
      </div>
      <FloatingButton href="#" icon="fas fa-arrow-up" />
    </div>
  );
};
