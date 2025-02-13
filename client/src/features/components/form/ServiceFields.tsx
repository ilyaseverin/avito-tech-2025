import React from "react";
import { FieldErrors, Control } from "react-hook-form";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RHFTextField } from "./RHFTextField";

interface ServiceFieldsProps {
  control: Control<CreateItemPayload>;
  errors: FieldErrors<CreateItemPayload>;
}

export const ServiceFields: React.FC<ServiceFieldsProps> = ({ control }) => (
  <>
    <RHFTextField
      name="serviceType"
      control={control}
      label="Тип услуги"
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите тип услуги" }}
    />
    <RHFTextField
      name="experience"
      control={control}
      label="Опыт работы (лет)"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите опыт (лет)" }}
    />
    <RHFTextField
      name="cost"
      control={control}
      label="Стоимость (руб.)"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите стоимость" }}
    />
    <RHFTextField
      name="workSchedule"
      control={control}
      label="График работы"
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
    />
  </>
);
