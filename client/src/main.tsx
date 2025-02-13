import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./router/AppRouter";
import App from "./App";
import { Header } from "./Header/Header";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Header />
          <AppRouter />
        </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
