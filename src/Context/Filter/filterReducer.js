const filterReducer = (filterState, action) => {
  switch (action.type) {
    case "FILTER_CATEGORY":
      return { ...filterState, byCategory: action.payload };

    case "SEARCH_VIDEO":
      return { ...filterState, bySearch: action.payload };

    case "LATEST_VIDEOS":
      return { ...filterState, byLatest: action.payload };

    case "REMOVE_LATEST_VIDEOS":
      return { ...filterState, byLatest: "" };

    case "ALL_CATEGORY":
      return { byCategory: "all", bySearch: "", byLatest: "" };

    default:
      return filterState;
  }
};

export { filterReducer };
