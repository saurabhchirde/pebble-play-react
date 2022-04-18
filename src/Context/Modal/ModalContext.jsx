import { createContext, useContext, useState } from "react";

const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignupAlert, setShowSignupAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        showSignupAlert,
        setShowSignupAlert,
        alertText,
        setAlertText,
        showAlert,
        setShowAlert,
        showNavMenu,
        setShowNavMenu,
        showPlaylistModal,
        setShowPlaylistModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
