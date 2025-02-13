import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearToken } from "../features/auth/authSlice";
import { AuthDialog } from "../features/components/AuthDialog";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  // Берём token из store
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleOpenAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate("/list")}
          >
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

      <AuthDialog open={authDialogOpen} onClose={handleCloseAuthDialog} />
    </>
  );
};
