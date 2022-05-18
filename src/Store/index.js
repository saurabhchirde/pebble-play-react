import { configureStore, createSlice } from "@reduxjs/toolkit";

// auth slice
const initialAuthState = {
  login: false,
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    dp: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState:
    JSON.parse(localStorage.getItem("authState")) ?? initialAuthState,
  reducers: {
    login(state, action) {
      state.login = true;
      state.token = action.payload.encodedToken;
      state.user.firstName = action.payload.foundUser.firstName;
      state.user.lastName = action.payload.foundUser.lastName;
      state.user.email = action.payload.foundUser.email;
      state.user.dp =
        action.payload.foundUser.firstName.slice(0, 1) +
        action.payload.foundUser.lastName.slice(0, 1);
    },
    logout(state) {
      state.login = false;
      state.token = "";
      state.user.firstName = "";
      state.user.lastName = "";
      state.user.email = "";
      state.user.dp = "";
    },
  },
});

// user input slice
const initialUserState = {
  loginInput: {
    email: "",
    password: "",
  },
  showProfileMenu: false,
  searchInput: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    loginInput(state, action) {
      state.loginInput.email = action.payload.email;
      state.loginInput.password = action.payload.password;
    },
    profileMenu(state, action) {
      state.showProfileMenu = action.payload;
    },
    searchInput(state, action) {
      state.searchInput = action.payload;
    },
  },
});

// filter slice
const initialFilterState = { byCategory: "all", bySearch: "", byLatest: "" };

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    filterByCategory(state, action) {
      state.byCategory = action.payload;
    },
    searchVideo(state, action) {
      state.bySearch = action.payload;
    },
    latestVideo(state, action) {
      state.byLatest = action.payload;
    },
    removeLatestVideo(state) {
      state.byLatest = "";
    },
    allCategory(state) {
      state.byCategory = "all";
      state.bySearch = "";
      state.byLatest = "";
    },
  },
});

// video slice
const initialVideoState = {
  videos: [],
  singleVideo: {},
  watchlater: [],
  playlists: [],
  singlePlaylist: {},
  history: [],
  likes: [],
  categories: [],
  singleCategory: [],
  tempVideo: {},
};

const videoSlice = createSlice({
  name: "video",
  initialState: initialVideoState,
  reducers: {
    loadAllVideos(state, action) {
      state.videos = action.payload;
    },
    loadAllCategories(state, action) {
      state.categories = action.payload;
    },
    authDataInitialize(state, action) {
      state.watchlater = action.payload.watchlater;
      state.playlists = action.payload.playlists;
      state.history = action.payload.history;
      state.likes = action.payload.likes;
    },
    getWatchlaterFromServer(state, action) {
      state.watchlater = action.payload;
    },
    getPlaylistFromServer(state, action) {
      state.playlists = action.payload;
    },
    getHistoryFromServer(state, action) {
      state.history = action.payload;
    },
    getHistoryFromServer(state, action) {
      state.history = action.payload;
    },
    getLikesFromServer(state, action) {
      state.likes = action.payload;
    },
    likeVideo(state, action) {
      state.likes = action.payload;
    },
    unLikeVideo(state, action) {
      state.likes = action.payload;
    },
    addToWatchlater(state, action) {
      state.watchlater = action.payload;
    },
    removeFromWatchlater(state, action) {
      state.watchlater = action.payload;
    },
    addNewPlaylist(state, action) {
      state.playlists = action.payload;
    },
    removePlaylist(state, action) {
      state.playlists = action.payload;
    },
    getParticularPlaylist(state, action) {
      state.singlePlaylist = action.payload;
    },
    updatePlaylist(state, action) {
      state.singlePlaylist = action.payload;
    },
    deleteFromPlaylist(state, action) {
      state.singlePlaylist = action.payload;
    },
    addInHistory(state, action) {
      state.history = action.payload;
    },
    removeFromHistory(state, action) {
      state.history = action.payload;
    },
    removeAllFromHistory(state, action) {
      state.history = action.payload;
    },
    selectCategory(state, action) {
      state.singleCategory = action.payload;
    },
    getSingleVideo(state, action) {
      state.singleVideo = action.payload;
    },
    emptyAllLists(state) {
      state.videos = [];
      state.singleVideo = {};
      state.watchlater = [];
      state.playlists = [];
      state.singlePlaylist = {};
      state.history = [];
      state.likes = [];
      state.categories = [];
      state.singleCategory = [];
    },
    tempCacheVideo(state, action) {
      state.tempVideo = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userInput: userSlice.reducer,
    filterState: filterSlice.reducer,
    videoState: videoSlice.reducer,
  },
});

export default store;

export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const filterActions = filterSlice.actions;
export const videoActions = videoSlice.actions;
