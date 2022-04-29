import { createContext, useContext, useReducer, useState } from "react";

import { useLocalStorageGet, useLocalStorageSet } from "Hooks/useLocalStorage";

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
          email: action.payload.foundUser.email,
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
          email: "",
          dp: "",
        },
      };

    default:
      return auth;
  }
};

const AuthContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(
    authReducer,
    useLocalStorageGet("authState") ?? initialAuthState
  );
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  useLocalStorageSet("authState", auth);
  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
