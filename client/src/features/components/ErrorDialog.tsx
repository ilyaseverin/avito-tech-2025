/**
 * `ErrorDialog` — модальное окно для отображения ошибок.
 *
 * Компонент используется для уведомления пользователя о произошедшей ошибке
 * с возможностью закрытия диалога.
 */

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Интерфейс свойств компонента
interface ErrorDialogProps {
  open: boolean; // Флаг, определяющий открыто ли модальное окно
  onClose: () => void; // Функция для закрытия окна
  message?: string; // Сообщение об ошибке (по умолчанию "Произошла неизвестная ошибка")
  title?: string; // Заголовок окна (по умолчанию "Ошибка")
}

// Анимация появления диалога (слайд вверх)
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * `ErrorDialog` — отображает ошибку в виде диалогового окна с предупреждением.
 *
 * @param open Флаг отображения окна ошибки.
 * @param onClose Функция закрытия окна.
 * @param message Сообщение ошибки.
 * @param title Заголовок ошибки.
 */
export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  onClose,
  message = "Произошла неизвестная ошибка",
  title = "Ошибка",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ transition: Transition }}
      maxWidth="xs"
      fullWidth
    >
      {/* Заголовок окна с иконкой предупреждения */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon sx={{ color: "warning.main" }} /> {title}
      </DialogTitle>

      {/* Контент ошибки с уведомлением */}
      <DialogContent>
        <Alert severity="error" sx={{ fontSize: "1rem", padding: 2 }}>
          <AlertTitle>Внимание!</AlertTitle>
          {message}
        </Alert>
      </DialogContent>

      {/* Кнопка закрытия */}
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose} autoFocus>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
