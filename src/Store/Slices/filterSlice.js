import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = { byCategory: "all", bySearch: "", byLatest: "" };

export const filterSlice = createSlice({
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
