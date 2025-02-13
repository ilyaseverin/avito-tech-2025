import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorMessageProps {
  message: string;
  code?: number;
}

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
