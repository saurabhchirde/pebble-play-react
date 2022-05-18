export const modalReducer = (modalState, action) => {
  switch (action.type) {
    case "showLogin":
      return { ...modalState, showLogin: action.payload };
    case "showSignup":
      return { ...modalState, showSignup: action.payload };
    case "showSignupAlert":
      return { ...modalState, showSignupAlert: action.payload };
    case "alertText":
      return { ...modalState, alertText: action.payload };
    case "showAlert":
      return { ...modalState, showAlert: action.payload };
    case "showNavMenu":
      return { ...modalState, showNavMenu: action.payload };
    case "showPlaylistModal":
      return { ...modalState, showPlaylistModal: action.payload };
    default:
      return modalState;
  }
};
