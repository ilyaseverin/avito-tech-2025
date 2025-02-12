import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks"; // ваш кастомный типизированный useSelector
import { FormPage } from "../pages/FormPage";
import { ListPage } from "../pages/ListPage";
import { ItemPage } from "../pages/ItemPage";

export const AppRouter = () => {
  // Получаем токен (если есть)
  const token = useAppSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        {/* Если token есть — рендерим FormPage, иначе делаем Navigate на /list */}
        <Route
          path="/form"
          element={token ? <FormPage /> : <Navigate to="/list" />}
        />
        {/* Для редактирования можно передавать ?id=... или отдельный маршрут */}
        <Route
          path="/form/:id"
          element={token ? <FormPage /> : <Navigate to="/list" />}
        />

        <Route path="/list" element={<ListPage />} />
        <Route path="/item/:id" element={<ItemPage />} />

        {/* Если пользователь заходит на неизвестный путь, переходим на /list */}
        <Route path="*" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
};
