import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  loginInput: {
    email: "",
    password: "",
  },
  showProfileMenu: false,
  searchInput: "",
};

export const userSlice = createSlice({
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
