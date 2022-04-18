import { createContext, useContext, useReducer } from "react";
import { alertReducer } from "./alertReducer";

const AlertContext = createContext(null);

const alertInitialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
  alertIcon: "",
};

const AlertProvider = ({ children }) => {
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    alertInitialState
  );

  return (
    <AlertContext.Provider value={{ alertState, alertDispatch }}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => useContext(AlertContext);

export { AlertProvider, useAlert };
