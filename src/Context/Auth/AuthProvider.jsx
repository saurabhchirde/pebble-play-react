import { createContext, useContext, useReducer, useState } from "react";

import {
  useSessionStorageGet,
  useSessionStorageSet,
} from "../../Hooks/useSessionStorage";

const initialAuthState = {
  login: false,
  token: "",
  user: {
    firstName: "",
    lastName: "",
    dp: "",
  },
};

const authReducer = (auth, action) => {
  switch (action.type) {
    case "login":
      return {
        ...auth,
        login: true,
        token: action.payload.encodedToken,
        user: {
          firstName: action.payload.foundUser.firstName,
          lastName: action.payload.foundUser.lastName,
          dp:
            action.payload.foundUser.firstName.slice(0, 1) +
            action.payload.foundUser.lastName.slice(0, 1),
        },
      };

    case "logout":
      return {
        login: false,
        token: "",
        user: {
          firstName: "",
          lastName: "",
          dp: "",
        },
      };

    default:
      return auth;
  }
};

const authContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(
    authReducer,
    useSessionStorageGet("authState") ?? initialAuthState
  );
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  useSessionStorageSet("authState", auth);
  return (
    <authContext.Provider
      value={{
        auth,
        authDispatch,
        loginInput,
        setLoginInput,
        showProfileMenu,
        setShowProfileMenu,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
