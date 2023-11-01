import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);
