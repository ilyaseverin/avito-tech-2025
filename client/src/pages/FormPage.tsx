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
import { BasicFields } from "../features/items/components/form/BasicFields";
import { CategoryFields } from "../features/items/components/form/CategoryFields";
import { StepNavigation } from "../features/items/components/form/StepNavigation";

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

  // При редактировании — подставляем данные в форму
  useEffect(() => {
    if (existingItem) {
      (Object.keys(existingItem) as (keyof Item)[]).forEach((key) => {
        if (key === "id") return;
        if (key === "type") {
          setValue("type", existingItem.type ?? "");
        } else {
          setValue(key, existingItem[key]);
        }
      });
    }
  }, [existingItem, setValue]);

  // Загрузка черновика, если не редактируем
  useEffect(() => {
    if (!isEditMode) {
      const draft = localStorage.getItem("itemDraft");
      if (draft) {
        const parsed = JSON.parse(draft);
        (Object.keys(parsed) as (keyof CreateItemPayload)[]).forEach((key) => {
          setValue(key, parsed[key]);
        });
      }
    }
  }, [isEditMode, setValue]);

  // Сохранение черновика при изменениях
  useEffect(() => {
    const subscription = watch((values) => {
      if (!isEditMode) {
        localStorage.setItem("itemDraft", JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isEditMode]);

  // Финальный сабмит
  const onSubmit: SubmitHandler<CreateItemPayload> = async (formData) => {
    try {
      if (isEditMode) {
        await updateItem({
          id: Number(id),
          data: { ...formData, type: formData.type as Item["type"] },
        }).unwrap();
      } else {
        await createItem({
          ...formData,
          type: formData.type as Item["type"],
        }).unwrap();
        localStorage.removeItem("itemDraft");
      }
      navigate("/list");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
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
        {activeStep === 0 && <BasicFields control={control} errors={errors} />}
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
  );
};
