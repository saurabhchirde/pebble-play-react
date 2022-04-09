import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { PebblePlayProvider } from "./Context/PebblePlayProvider";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <PebblePlayProvider>
      <App />
    </PebblePlayProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
