import React from "react";
import { FieldErrors, Control } from "react-hook-form";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RHFTextField } from "./RHFTextField";

interface AutoFieldsProps {
  control: Control<CreateItemPayload>;
  errors: FieldErrors<CreateItemPayload>;
}

export const AutoFields: React.FC<AutoFieldsProps> = ({ control }) => (
  <>
    <RHFTextField
      name="brand"
      control={control}
      label="Марка"
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите марку" }}
    />
    <RHFTextField
      name="model"
      control={control}
      label="Модель"
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите модель" }}
    />
    <RHFTextField
      name="year"
      control={control}
      label="Год выпуска"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите год выпуска" }}
    />
    <RHFTextField
      name="mileage"
      control={control}
      label="Пробег (км)"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
    />
  </>
);
