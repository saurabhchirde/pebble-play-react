import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  showLogin: false,
  showSignup: false,
  showSignupAlert: false,
  alertText: "",
  showAlert: false,
  showNavMenu: false,
  showPlaylistModal: false,
};

export const modalSlice = createSlice({
  name: "modalState",
  initialState: initialModalState,
  reducers: {
    showLogin(state, action) {
      state.showLogin = action.payload;
    },
    showSignup(state, action) {
      state.showSignup = action.payload;
    },
    showSignupAlert(state, action) {
      state.showSignupAlert = action.payload;
    },
    alertText(state, action) {
      state.alertText = action.payload;
    },
    showAlert(state, action) {
      state.showAlert = action.payload;
    },
    showNavMenu(state, action) {
      state.showNavMenu = action.payload;
    },
    showPlaylistModal(state, action) {
      state.showPlaylistModal = action.payload;
    },
  },
});
