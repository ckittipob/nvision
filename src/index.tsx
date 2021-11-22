import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import App from "./component/layout/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
