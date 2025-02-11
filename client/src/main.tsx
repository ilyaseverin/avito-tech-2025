import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./router/AppRouter";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <AppRouter />
      </App>
    </Provider>
  </React.StrictMode>
);
