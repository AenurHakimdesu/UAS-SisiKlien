import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import RouteList from "./Router/RouterList.jsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store.jsx";
import { login } from "./Redux/AuthSlice"; // Import login action
import axios from "axios";

// Muat token dari localStorage
const token = localStorage.getItem("auth_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const user = JSON.parse(localStorage.getItem("auth_user")); // Pastikan user juga disimpan saat login
  if (user) {
    Store.dispatch(login({ user, token })); // Set token dan user ke Redux
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={RouteList} />
    </Provider>
  </StrictMode>
);
