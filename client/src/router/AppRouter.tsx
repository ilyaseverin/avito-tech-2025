import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks"; // ваш кастомный типизированный useSelector
import { FormPage } from "../pages/FormPage";
import { ListPage } from "../pages/ListPage";
import { ItemPage } from "../pages/ItemPage";

export const AppRouter = () => {
  // Получаем токен
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      {/* Если token есть — рендерим FormPage, иначе делаем Navigate на /list */}
      <Route
        path="/form"
        element={token ? <FormPage /> : <Navigate to="/list" />}
      />
      <Route
        path="/form/:id"
        element={token ? <FormPage /> : <Navigate to="/list" />}
      />
      <Route path="/list" element={<ListPage />} />
      <Route path="/item/:id" element={<ItemPage />} />

      {/* Перенаправление на /list */}
      <Route path="*" element={<ListPage />} />
    </Routes>
  );
};
