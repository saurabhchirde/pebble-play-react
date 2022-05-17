import { configureStore, createSlice } from "@reduxjs/toolkit";

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

const store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export const authActions = authSlice.actions;
export default store;
