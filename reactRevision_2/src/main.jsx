import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import LoginlogoutContextProvider from "./context/LoginLogoutContrxt.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginlogoutContextProvider>
    <BrowserRouter>
      <App />
      <ToastContainer  position="bottom-center"  />
    </BrowserRouter>
  </LoginlogoutContextProvider>
);
