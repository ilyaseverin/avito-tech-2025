import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormPage } from "../pages/FormPage";
import { ListPage } from "../pages/ListPage";
import { ItemPage } from "../pages/ItemPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        {/* Для редактирования можно передавать ?id=... или отдельный маршрут */}
        <Route path="/form/:id" element={<FormPage />} />

        <Route path="/list" element={<ListPage />} />
        <Route path="/item/:id" element={<ItemPage />} />

        {/* можно поставить редирект или что-то ещё */}
        <Route path="*" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
};
