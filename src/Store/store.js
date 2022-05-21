import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  userSlice,
  filterSlice,
  videoSlice,
  modalSlice,
} from "./Slices";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userInput: userSlice.reducer,
    filterState: filterSlice.reducer,
    videoState: videoSlice.reducer,
    modalState: modalSlice.reducer,
  },
});

export default store;

export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const filterActions = filterSlice.actions;
export const videoActions = videoSlice.actions;
export const modalActions = modalSlice.actions;
