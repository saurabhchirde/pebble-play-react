import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { PebblePlayProvider } from "./Context/PebblePlayProvider";
import { Provider } from "react-redux";
import store from "Store/store";

// Call make Server
makeServer();

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
