/**
 * `FormPage.tsx` — страница создания и редактирования объявления.
 *
 * Этот компонент содержит многошаговую форму, которая позволяет пользователям
 * добавлять или редактировать объявления, заполняя основные поля и информацию,
 * специфичную для выбранной категории (недвижимость, авто, услуги).
 *
 * @module FormPage
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import {
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
} from "../app/api/api";
import { CreateItemPayload, Item } from "../types/itemTypes";
import { BasicFields } from "../features/components/form/BasicFields";
import { CategoryFields } from "../features/components/form/CategoryFields";
import { StepNavigation } from "../features/components/form/StepNavigation";
import { ErrorDialog } from "../features/components/ErrorDialog";
import { useDraft } from "../hooks/useDraft";

/**
 * Основной компонент формы для создания или редактирования объявления.
 */
export const FormPage: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id); // Флаг режима редактирования
  const navigate = useNavigate();

  // Получаем данные объявления, если редактируем существующее
  const { data: existingItem } = useGetItemByIdQuery(Number(id), {
    skip: !isEditMode, // Запрос выполняется только в режиме редактирования
  });

  // RTK Query: API-мутации для создания и обновления объявления
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  // Управление шагами формы
  const [activeStep, setActiveStep] = useState(0);

  // Управление состоянием модального окна ошибки
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  // Инициализация формы с `react-hook-form`
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateItemPayload>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      image: "",
      type: "",
      propertyType: "",
      area: undefined,
      rooms: undefined,
      price: undefined,
      brand: "",
      model: "",
      year: undefined,
      mileage: undefined,
      serviceType: "",
      experience: undefined,
      cost: undefined,
      workSchedule: "",
    },
  });

  // Следим за изменением категории объявления
  const selectedType = watch("type");

  // Используем хук для работы с черновиком (autosave в localStorage)
  const { clearDraft } = useDraft(isEditMode, watch, setValue);

  /**
   * Подставляет данные в форму при редактировании существующего объявления.
   */
  useEffect(() => {
    if (existingItem) {
      Object.keys(existingItem).forEach((key) => {
        if (key !== "id") {
          setValue(
            key as keyof CreateItemPayload,
            existingItem[key as keyof Item]
          );
        }
      });
    }
  }, [existingItem, setValue]);

  /**
   * Финальная отправка формы (создание или обновление объявления).
   */
  const onSubmit: SubmitHandler<CreateItemPayload> = async (formData) => {
    try {
      if (isEditMode) {
        await updateItem({ id: Number(id), data: formData }).unwrap();
      } else {
        await createItem(formData).unwrap();
        clearDraft(); // Удаляем черновик после успешного создания
      }
      navigate("/list"); // Перенаправление на список объявлений
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      setErrorMessage("Ошибка при сохранении объявления. Попробуйте позже.");
      setErrorDialogOpen(true);
    }
  };

  /**
   * Обработчик перехода на следующий шаг (валидация перед переходом).
   */
  const handleNextStep = async () => {
    const isStep1Valid = await trigger([
      "name",
      "description",
      "location",
      "image",
      "type",
    ]);
    if (isStep1Valid) {
      setActiveStep(1);
    }
  };

  /**
   * Обработчик перехода на предыдущий шаг.
   */
  const handlePrevStep = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {isEditMode ? "Редактирование объявления" : "Разместить объявление"}
          </Typography>

          {/* Многошаговый процесс (Stepper) */}
          <Box sx={{ mb: 2 }}>
            <Stepper activeStep={activeStep}>
              <Step>
                <StepLabel>Шаг 1</StepLabel>
              </Step>
              <Step>
                <StepLabel>Шаг 2</StepLabel>
              </Step>
            </Stepper>
          </Box>

          {/* Форма с динамическим рендерингом шагов */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && (
              <BasicFields control={control} errors={errors} />
            )}
            {activeStep === 1 && (
              <CategoryFields
                control={control}
                errors={errors}
                selectedType={selectedType}
              />
            )}

            {/* Кнопки навигации между шагами */}
            <StepNavigation
              activeStep={activeStep}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
              handleSubmit={handleSubmit(onSubmit)}
            />
          </form>
        </Paper>
      </Container>

      {/* Диалог ошибки */}
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
        title="Ошибка при сохранении"
      />
    </>
  );
};
