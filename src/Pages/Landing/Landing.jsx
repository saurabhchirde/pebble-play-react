import { VideoCard, BannerCard, CategoryCard, Footer } from "Components";
import { useFilter, useVideo } from "Context";
import { useEffect } from "react";
import "./Landing.css";

export const Landing = () => {
  const {
    videoState: { videos, categories },
  } = useVideo();
  const { filterDispatch } = useFilter();

  const mapVideos = videos.map((video) => {
    return video.top && <VideoCard key={video._id} videoDetail={video} />;
  });

  const mapCategories = categories.map((category) => (
    <CategoryCard key={category._id} category={category} />
  ));

  useEffect(() => {
    filterDispatch({ type: "ALL_CATEGORY" });
  }, []);

  return (
    <div className="landing-body">
      {videos.length > 0 && (
        <>
          <div className="landing-header-section">
            <div className="landing-banner-section">
              <BannerCard />
            </div>
            <div className="landing-banner-text">
              <h1>Curated content - by Photographers, for Photographers</h1>
              <p>
                A video library for all photography enthusiast, to share,
                shocase their work and learn new skill from other creators
              </p>
            </div>
            <div className="landing-category-section">{mapCategories}</div>
          </div>
          <div className="landing-must-watch-container">
            <h1 className="video-title">Popular Videos</h1>
            <div className="landing-must-watch-videos">{mapVideos}</div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};
