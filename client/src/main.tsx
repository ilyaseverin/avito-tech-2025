/**
 * @module main.tsx
 * @remarks Главная точка входа в приложение.
 * Подключает Redux, React Router и рендерит основное приложение.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store"; // Импорт хранилища Redux
import { AppRouter } from "./router/AppRouter"; // Маршрутизация приложения
import App from "./App"; // Основной компонент приложения
import { Header } from "./Header/Header"; // Заголовок (навигация)
import { BrowserRouter } from "react-router-dom"; // Маршрутизация на стороне клиента

// Рендеринг корневого компонента в DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Подключаем Redux-хранилище */}
    <Provider store={store}>
      {/* Включаем клиентскую маршрутизацию */}
      <BrowserRouter>
        {/* Основной компонент приложения */}
        <App>
          {/* Компонент шапки (навигации) */}
          <Header />
          {/* Роутер, который управляет страницами */}
          <AppRouter />
        </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
