const videoReducer = (videoState, action) => {
  switch (action.type) {
    case "LOAD_ALL_VIDEOS":
      return { ...videoState, videos: action.payload };

    case "LOAD_ALL_CATEGORIES":
      return { ...videoState, categories: action.payload };

    // server
    case "AUTH_DATA_INITIALIZE":
      return {
        ...videoState,
        watchlater: action.payload.watchlater,
        playlists: action.payload.playlists,
        history: action.payload.history,
        likes: action.payload.likes,
      };

    case "GET_WATCHLATER_FROM_SERVER":
      return { ...videoState, watchlater: action.payload };

    case "GET_PLAYLIST_FROM_SERVER":
      return { ...videoState, playlists: action.payload };

    case "GET_HISTORY_FROM_SERVER":
      return { ...videoState, history: action.payload };

    case "GET_LIKES_FROM_SERVER":
      return { ...videoState, history: action.payload };

    case "LIKE_VIDEO":
      return { ...videoState, likes: action.payload };

    case "UN_LIKE_VIDEO":
      return { ...videoState, likes: action.payload };

    case "ADD_TO_WATCH_LATER":
      return { ...videoState, watchlater: action.payload };

    case "REMOVE_FROM_WATCH_LATER":
      return { ...videoState, watchlater: action.payload };

    case "ADD_NEW_PLAYLIST":
      return { ...videoState, playlists: action.payload };

    case "REMOVE_PLAYLIST":
      return { ...videoState, playlists: action.payload };

    case "GET_PARTICULAR_PLAYLIST":
      return { ...videoState, singlePlaylist: action.payload };

    case "UPDATE_PLAYLIST":
      return { ...videoState, singlePlaylist: action.payload };

    case "DELETE_VIDEO_FROM_PLAYLIST":
      return { ...videoState, singlePlaylist: action.payload };

    case "ADD_IN_HISTORY":
      return { ...videoState, history: action.payload };

    case "REMOVE_FROM_HISTORY":
      return { ...videoState, history: action.payload };

    case "SELECT_CATEGORY":
      return { ...videoState, singleCategory: action.payload };

    case "EMPTY_ALL_LISTS":
      return {
        videos: [],
        watchlater: [],
        playlists: [],
        singlePlaylist: {},
        history: [],
        likes: [],
        categories: [],
        singleCategory: [],
      };

    default:
      return videoState;
  }
};

export { videoReducer };
