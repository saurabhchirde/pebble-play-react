import { createContext, useContext, useState, useReducer } from "react";
import { modalReducer } from "./modalReducer";

const ModalContext = createContext(null);

const modalInitialState = {
  showLogin: false,
  showSignup: false,
  showSignupAlert: false,
  alertText: "",
  showAlert: false,
  showNavMenu: false,
  showPlaylistModal: false,
};

const ModalProvider = ({ children }) => {
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState
  );

  return (
    <ModalContext.Provider
      value={{
        modalState,
        modalDispatch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
