import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { VideoCard, FloatingButton, Footer } from "Components";
import { useFilter, useVideo } from "Context";
import { finalFilteredData } from "Utils/finalFilteredData";
import "./VideoListing.css";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "Store";

export const VideoListing = () => {
  const {
    videoState: { videos, categories },
  } = useVideo();

  // redux
  const { filterState } = useSelector((filterState) => filterState);
  const dispatch = useDispatch();

  const { byCategory, bySearch, byLatest } = filterState;
  const navigate = useNavigate();
  const { search } = useLocation();
  const urlParam = new URLSearchParams(search);
  const searchQuery = urlParam.get("query");

  const onCategoryClickHandler = (category) => {
    dispatch(filterActions.filterByCategory(category));
  };

  const onAllClickHandler = () => {
    dispatch(filterActions.allCategory());
    navigate("/videos", { replace: true });
  };

  const onLatestClickHandler = () => {
    if (byLatest) {
      dispatch(filterActions.removeLatestVideo());
    } else {
      dispatch(filterActions.latestVideo("latest"));
    }
  };

  const videosAvailable =
    finalFilteredData(videos, filterState).length > 0 ? true : false;

  const mapAllVideos = videosAvailable ? (
    <div className="all-videos-section">
      {finalFilteredData(videos, filterState).map((video) => (
        <VideoCard key={video._id} videoDetail={video} />
      ))}
    </div>
  ) : (
    <p className="no-video-message">
      No Videos available
      {byCategory === "all" ? "" : ` in ${byCategory} for`} {bySearch ?? ""}
    </p>
  );

  const mapAllCategories = categories.map((category) => {
    return (
      <li
        key={category._id}
        className={
          filterState.byCategory === category.category
            ? "category-label active-label"
            : "category-label"
        }
        onClick={() => {
          onCategoryClickHandler(category.category);
        }}
        value={category.category}
      >
        {category.categoryName}
      </li>
    );
  });

  const allCategoryClassName =
    filterState.byCategory === "all"
      ? "category-label active-label"
      : "category-label";

  const latestCategoryClassName =
    filterState.byLatest === "latest"
      ? "category-label active-label"
      : "category-label";

  useEffect(() => {
    if (searchQuery) {
      dispatch(filterActions.searchVideo(searchQuery));
    } else if (byCategory) {
      dispatch(filterActions.filterByCategory(byCategory));
    } else {
      dispatch(filterActions.allCategory());
    }
  }, [searchQuery, byCategory]);

  return (
    <div className="video-listing-body">
      <div className="discover-section"></div>
      <form className="category-section">
        <div onClick={onAllClickHandler} className={allCategoryClassName}>
          All
        </div>
        {mapAllCategories}
        <div onClick={onLatestClickHandler} className={latestCategoryClassName}>
          Latest first
        </div>
        {videosAvailable && (
          <p className="result-message">
            Showing {byLatest ? byLatest : ""}{" "}
            {bySearch ? bySearch : byCategory} videos
          </p>
        )}
      </form>
      {mapAllVideos}
      <FloatingButton href="#" icon="fas fa-arrow-up" />
      <Footer />
    </div>
  );
};
