import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import index from "./reducer";
import { PersistGate } from "redux-persist/integration/react";

import './index.css';

ReactDOM.render(
  <Provider store={index.store}>
    <PersistGate loading={null} persistor={index.persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);


reportWebVitals();
