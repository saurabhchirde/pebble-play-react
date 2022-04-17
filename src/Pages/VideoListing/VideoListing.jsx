import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { VerticalCard } from "../../Components/Cards/VerticalCard";
import FloatingButton from "../../Components/UI/Button/FloatingButton";
import { useFilter, useVideo } from "../../Context";
import { finalFilteredData } from "../../Utils/finalFilteredData";
import "./VideoListing.css";

export const VideoListing = () => {
  const {
    videoState: { videos, categories },
  } = useVideo();
  const { filterState, filterDispatch } = useFilter();
  const { byCategory, bySearch, byLatest } = filterState;
  const { search } = useLocation();
  const urlParam = new URLSearchParams(search);
  const searchQuery = urlParam.get("query");

  const onCategoryClickHandler = (category) => {
    filterDispatch({ type: "FILTER_CATEGORY", payload: category });
  };

  const onAllClickHandler = () => {
    filterDispatch({ type: "ALL_CATEGORY" });
  };

  const onLatestClickHandler = () => {
    if (byLatest) {
      filterDispatch({ type: "REMOVE_LATEST_VIDEOS" });
    } else {
      filterDispatch({ type: "LATEST_VIDEOS", payload: "latest" });
    }
  };

  const videosAvailable =
    finalFilteredData(videos, filterState).length > 0 ? true : false;

  useEffect(() => {
    if (searchQuery) {
      filterDispatch({ type: "SEARCH_VIDEO", payload: searchQuery });
      urlParam.delete("query");
    } else {
      filterDispatch({ type: "ALL_CATEGORY" });
    }
  }, [searchQuery]);

  return (
    <div className="video-listing-body">
      <div className="discover-section"></div>
      <form className="category-section">
        <div
          onClick={onAllClickHandler}
          className={
            filterState.byCategory === "all"
              ? "category-label active-label"
              : "category-label"
          }
        >
          All
        </div>
        {categories.map((category) => {
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
        })}
        <div
          onClick={onLatestClickHandler}
          className={
            filterState.byLatest === "latest"
              ? "category-label active-label"
              : "category-label"
          }
        >
          Latest first
        </div>
        {videosAvailable && (
          <p className="result-message">
            Showing {byLatest ? byLatest : ""}{" "}
            {bySearch ? bySearch : byCategory} videos
          </p>
        )}
      </form>
      {videosAvailable ? (
        <div className="all-videos-section">
          {finalFilteredData(videos, filterState).map((video) => (
            <VerticalCard key={video._id} videoDetail={video} />
          ))}
        </div>
      ) : (
        <p className="no-video-message">
          No Videos available
          {byCategory === "all" ? "" : ` in ${byCategory} for`} {bySearch ?? ""}
        </p>
      )}
      <FloatingButton href="#" icon="fas fa-arrow-up" />
    </div>
  );
};
