/**
 * `Header` — компонент верхней панели навигации.
 *
 * Содержит название приложения, кнопку входа и выхода, а также модальное окно для авторизации.
 */

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { clearToken } from "../features/auth/authSlice";
import { AuthDialog } from "../features/components/AuthDialog";
import { useNavigate } from "react-router-dom";

/**
 * `Header` — верхняя навигационная панель с возможностью авторизации и выхода.
 *
 * @returns Компонент `Header` для отображения логотипа и кнопки входа/выхода.
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token); // Получение токена из Redux store
  const dispatch = useAppDispatch();

  const [authDialogOpen, setAuthDialogOpen] = useState(false); // Состояние для модального окна входа

  /** Открывает модальное окно авторизации */
  const handleOpenAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  /** Закрывает модальное окно авторизации */
  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  /** Обрабатывает выход пользователя */
  const handleLogout = () => {
    dispatch(clearToken()); // Очистка токена из Redux и localStorage
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Логотип, ведущий на страницу списка объявлений */}
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate("/list")}
          >
            Avito-tech
          </Typography>

          {/* Кнопка входа или выхода в зависимости от наличия токена */}
          {!token ? (
            <Button color="inherit" onClick={handleOpenAuthDialog}>
              Войти
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Диалоговое окно авторизации */}
      <AuthDialog open={authDialogOpen} onClose={handleCloseAuthDialog} />
    </>
  );
};
