/**
 * `AppRouter.tsx` — маршрутизация приложения.
 *
 * Этот компонент отвечает за навигацию по страницам приложения с учетом аутентификации пользователя.
 *
 * @module AppRouter
 */

import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { FormPage } from "../pages/FormPage";
import { ListPage } from "../pages/ListPage";
import { ItemPage } from "../pages/ItemPage";

/**
 * Компонент маршрутизации приложения.
 * Определяет доступ к страницам в зависимости от наличия токена авторизации.
 */
export const AppRouter = () => {
  // Получаем токен пользователя из Redux-хранилища
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      {/* Страница создания/редактирования объявления доступна только авторизованным пользователям */}
      <Route
        path="/form"
        element={token ? <FormPage /> : <Navigate to="/list" />}
      />
      <Route
        path="/form/:id"
        element={token ? <FormPage /> : <Navigate to="/list" />}
      />

      {/* Страница списка объявлений доступна всем */}
      <Route path="/list" element={<ListPage />} />

      {/* Страница просмотра объявления доступна всем */}
      <Route path="/item/:id" element={<ItemPage />} />

      {/* Обработчик всех неизвестных маршрутов: редирект на /list */}
      <Route path="*" element={<ListPage />} />
    </Routes>
  );
};
