/**
 * `AuthDialog` — модальное окно для авторизации пользователей.
 *
 * Компонент отображает форму входа, используя `react-hook-form` для управления
 * вводом данных и валидацией, а также Redux Toolkit для управления состоянием авторизации.
 */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setToken } from "../auth/authSlice";
import { RHFTextField } from "../components/form/RHFTextField";

// Свойства компонента `AuthDialog`
interface AuthDialogProps {
  open: boolean; // Флаг открытия модального окна
  onClose: () => void; // Функция закрытия окна
}

// Интерфейс формы авторизации
interface AuthFormValues {
  username: string; // Поле для ввода логина
  password: string; // Поле для ввода пароля
}

/**
 * `AuthDialog` — модальное окно входа в систему.
 *
 * @param open Флаг отображения модального окна.
 * @param onClose Функция для закрытия модального окна.
 */
export const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  // Инициализация формы с react-hook-form
  const { control, handleSubmit, setError, reset } = useForm<AuthFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /**
   * Обработчик отправки формы.
   * Если введены корректные данные, устанавливается токен, иначе показывается ошибка.
   */
  const onSubmit: SubmitHandler<AuthFormValues> = (data) => {
    if (data.username === "test" && data.password === "1234") {
      dispatch(setToken("fake-token")); // Устанавливаем тестовый токен
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

  /**
   * Функция закрытия модального окна, очищающая данные формы.
   */
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
