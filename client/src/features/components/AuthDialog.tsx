import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { setToken } from "../auth/authSlice";
import { RHFTextField } from "../components/form/RHFTextField";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

interface AuthFormValues {
  username: string;
  password: string;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setError, reset } = useForm<AuthFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthFormValues> = (data) => {
    if (data.username === "test" && data.password === "1234") {
      dispatch(setToken("fake-token"));
      handleClose();
    } else {
      setError("username", {
        type: "manual",
        message: "Неверные логин или пароль",
      });
      setError("password", {
        type: "manual",
        message: "Неверные логин или пароль",
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Вход</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="username"
            control={control}
            label="Логин"
            fullWidth
            rules={{ required: "Введите логин" }}
            style={{ marginBottom: 16 }}
          />
          <RHFTextField
            name="password"
            control={control}
            label="Пароль"
            type="password"
            fullWidth
            rules={{ required: "Введите пароль" }}
            style={{ marginBottom: 16 }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Войти
        </Button>
      </DialogActions>
    </Dialog>
  );
};
