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

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon sx={{ color: "warning.main" }} /> {title}
      </DialogTitle>
      <DialogContent>
        <Alert severity="error" sx={{ fontSize: "1rem", padding: 2 }}>
          <AlertTitle>Внимание!</AlertTitle>
          {message}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose} autoFocus>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
