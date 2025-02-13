import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stepper, Step, StepLabel } from "@mui/material";

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

export const FormPage: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  // Получаем данные для редактирования (если есть)
  const { data: existingItem } = useGetItemByIdQuery(Number(id), {
    skip: !isEditMode,
  });

  // RTK Query: мутации
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  // Шаги: 0 – основные поля, 1 – поля категории
  const [activeStep, setActiveStep] = useState(0);

  // Управления модалкой ошибки
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // Инициализация формы
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

  // Следим за выбранной категорией
  const selectedType = watch("type");

  // Используем хук для черновика
  const { clearDraft } = useDraft(isEditMode, watch, setValue);

  // Подставляем данные при редактировании
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

  // Финальный сабмит
  const onSubmit: SubmitHandler<CreateItemPayload> = async (formData) => {
    try {
      if (isEditMode) {
        await updateItem({ id: Number(id), data: formData }).unwrap();
      } else {
        await createItem(formData).unwrap();
        clearDraft(); // ✅ Очищаем черновик после успешного создания
      }
      navigate("/list");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      setErrorMessage("Ошибка при сохранении объявления. Попробуйте позже.");
      setErrorDialogOpen(true);
    }
  };

  // Переход на второй шаг (валидация шаг 1)
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

  const handlePrevStep = () => {
    setActiveStep(0);
  };

  return (
    <>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
        <h2>
          {isEditMode ? "Редактирование объявления" : "Разместить объявление"}
        </h2>

        <Stepper activeStep={activeStep} style={{ marginBottom: 16 }}>
          <Step>
            <StepLabel>Шаг 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Шаг 2</StepLabel>
          </Step>
        </Stepper>

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

          <StepNavigation
            activeStep={activeStep}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </form>
      </div>
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        message={errorMessage}
        title="Ошибка при сохранении"
      />
    </>
  );
};
