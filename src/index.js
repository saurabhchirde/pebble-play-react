import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PebblePlayProvider } from "./Context/PebblePlayProvider";
import { Provider } from "react-redux";
import store from "Store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PebblePlayProvider>
        <App />
      </PebblePlayProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
