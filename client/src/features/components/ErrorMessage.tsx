/**
 * `ErrorMessage` — компонент для отображения ошибки.
 *
 * Используется для вывода сообщений об ошибках, например, при загрузке данных или выполнении запросов.
 */

import { Alert, AlertTitle, Box } from "@mui/material";

// Интерфейс свойств компонента
interface ErrorMessageProps {
  message: string; // Текст ошибки
  code?: number; // Код ошибки (необязательный параметр)
}

/**
 * `ErrorMessage` — отображает уведомление об ошибке с кодом ошибки (если указан).
 *
 * @param message Текст ошибки.
 * @param code Код ошибки (необязательный параметр).
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  code,
}) => {
  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Alert severity="error">
        <AlertTitle>Ошибка {code ? `(${code})` : ""}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};
