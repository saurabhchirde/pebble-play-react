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
      state.showProfileMenu = state.showProfileMenu;
      state.searchInput = state.searchInput;
    },
    profileMenu(state, action) {
      state.loginInput.email = state.loginInput.email;
      state.loginInput.password = state.loginInput.password;
      state.showProfileMenu = action.payload;
      state.searchInput = state.searchInput;
    },
    searchInput(state, action) {
      state.loginInput.email = state.loginInput.email;
      state.loginInput.password = state.loginInput.password;
      state.showProfileMenu = state.showProfileMenu;
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
      state.bySearch = state.bySearch;
      state.byLatest = state.byLatest;
    },
    searchVideo(state, action) {
      state.byCategory = state.byCategory;
      state.bySearch = action.payload;
      state.byLatest = state.byLatest;
    },
    latestVideo(state, action) {
      state.byCategory = state.byCategory;
      state.bySearch = state.bySearch;
      state.byLatest = action.payload;
    },
    removeLatestVideo(state) {
      state.byCategory = state.byCategory;
      state.bySearch = state.bySearch;
      state.byLatest = "";
    },
    allCategory(state) {
      state.byCategory = "all";
      state.bySearch = "";
      state.byLatest = "";
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    userInput: userSlice.reducer,
    filterState: filterSlice.reducer,
  },
});

export default store;

export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const filterActions = filterSlice.actions;
