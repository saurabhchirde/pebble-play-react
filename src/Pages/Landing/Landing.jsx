import { VideoCard, BannerCard, CategoryCard } from "Components";
import { useVideo } from "Context";
import "./Landing.css";

export const Landing = () => {
  const {
    videoState: { videos, categories },
  } = useVideo();

  return (
    <div className="landing-body">
      {videos.length > 0 && (
        <>
          <div>
            <div className="landing-banner-section">
              <BannerCard />
            </div>
            <div className="landing-category-section">
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          </div>
          <div className="landing-must-watch-container">
            <h1 className="video-title">Must Watch</h1>
            <div className="landing-must-watch-videos">
              {videos.map((video) => {
                return (
                  video.mustWatch && (
                    <VideoCard key={video._id} videoDetail={video} />
                  )
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
