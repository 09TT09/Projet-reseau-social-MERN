import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.sass";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
//import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

//import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

//reportWebVitals();