import { createSlice } from "@reduxjs/toolkit";

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

export const videoSlice = createSlice({
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
