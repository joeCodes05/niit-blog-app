import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DropdownProvider } from "./context/dropdownContext";
import axios from "axios";
import { AuthProvider } from "./context/authContext";

axios.defaults.baseURL = "http://localhost:8080/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DropdownProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DropdownProvider>
  </React.StrictMode>
);
