import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>{<App />}</BrowserRouter>
  </>
  //<React.StrictMode> // disabling strict mode to help with "echoing" functions/effects

  //</React.StrictMode>
);
