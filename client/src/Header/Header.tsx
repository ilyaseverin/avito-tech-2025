import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearToken } from "../features/auth/authSlice";
import { AuthDialog } from "../features/items/components/AuthDialog";

export const Header: React.FC = () => {
  // Берём token из store
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  // Управляем видимостью диалога
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Открыть модалку логина
  const handleOpenAuthDialog = () => {
    setAuthDialogOpen(true);
  };
  // Закрыть модалку
  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  // Выход
  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Avito-tech
          </Typography>

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

      {/* Модальное окно логина */}
      <AuthDialog open={authDialogOpen} onClose={handleCloseAuthDialog} />
    </>
  );
};
