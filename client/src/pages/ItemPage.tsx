/**
 * `ItemPage.tsx` — страница просмотра деталей объявления.
 *
 * Этот компонент загружает данные об объявлении по его ID, аутентифицирует пользователя
 * и предоставляет возможность редактирования или удаления объявления.
 *
 * @module ItemPage
 */

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetItemByIdQuery, useDeleteItemMutation } from "../app/api/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from "@mui/material";
import { ItemDetails } from "../features/components/items/ItemDetails";
import { useAppSelector } from "../hooks/reduxHooks";
import { Loader } from "../features/components/Loader";
import { ErrorMessage } from "../features/components/ErrorMessage";
import { ErrorDialog } from "../features/components/ErrorDialog";

/**
 * Компонент страницы с деталями объявления.
 */
export const ItemPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const itemId = Number(id);

  // Запрашиваем данные объявления
  const { data: item, isLoading, error } = useGetItemByIdQuery(itemId);

  // Получаем токен пользователя (для проверки авторизации)
  const token = useAppSelector((state) => state.auth.token);

  // Мутация удаления объявления
  const [deleteItem] = useDeleteItemMutation();

  // Состояния для модальных окон
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Отображение загрузчика, если данные еще загружаются
  if (isLoading) return <Loader />;

  // Отображение ошибки, если данные не загружены
  if (error || !item) {
    const errorMessage = "Не удалось загрузить объявление.";
    let errorCode: number | undefined;

    if (typeof error === "object" && error !== null && "status" in error) {
      errorCode = (error as { status: number }).status;
    }

    return <ErrorMessage message={errorMessage} code={errorCode} />;
  }

  /**
   * Открытие диалогового окна подтверждения удаления.
   */
  const handleOpenDeleteConfirm = () => {
    setConfirmDeleteOpen(true);
  };

  /**
   * Закрытие диалогового окна подтверждения удаления.
   */
  const handleCloseDeleteConfirm = () => {
    setConfirmDeleteOpen(false);
  };

  /**
   * Удаление объявления с подтверждением.
   */
  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemId).unwrap();
      setConfirmDeleteOpen(false);
      navigate("/list"); // Перенаправление на список объявлений после удаления
    } catch (err: unknown) {
      setConfirmDeleteOpen(false);

      let message = "Произошла ошибка при удалении";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data?: { error?: string } };
        if (errorData.data?.error) {
          message = errorData.data.error;
        }
      }

      setErrorMessage(message);
      setErrorDialogOpen(true);
    }
  };

  /**
   * Закрытие диалогового окна ошибки.
   */
  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorMessage("");
  };

  /**
   * Кнопка "Назад" для возврата на предыдущую страницу.
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Детальная информация об объявлении */}
      <ItemDetails item={item} />

      {/* Кнопки управления (доступны только авторизованным пользователям) */}
      {token && (
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/form/${item.id}`)}
          >
            Редактировать
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpenDeleteConfirm}
          >
            Удалить
          </Button>
          <Button variant="outlined" onClick={handleGoBack}>
            Назад
          </Button>
        </Box>
      )}

      {/* Диалоговое окно подтверждения удаления */}
      <Dialog open={confirmDeleteOpen} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Удалить объявление?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить это объявление? Действие необратимо.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Отмена</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалоговое окно ошибки при удалении */}
      <ErrorDialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        message={errorMessage}
        title="Ошибка при удалении"
      />
    </>
  );
};
