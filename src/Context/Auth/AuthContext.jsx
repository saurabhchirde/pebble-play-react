import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  return (
    <AuthContext.Provider
      value={{
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
