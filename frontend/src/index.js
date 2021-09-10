import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./sass/main.css";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
