import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/hooks";
import { setToken } from "../../auth/authSlice";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    // Простая фейковая проверка
    if (username === "test" && password === "1234") {
      dispatch(setToken("fake-token")); // устанавливаем "токен"
      onClose();
    } else {
      setErrorMsg("Неверные логин или пароль");
    }
  };

  const handleClose = () => {
    setUsername("");
    setPassword("");
    setErrorMsg("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Вход</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Логин"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Пароль"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleLogin} variant="contained">
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
};
