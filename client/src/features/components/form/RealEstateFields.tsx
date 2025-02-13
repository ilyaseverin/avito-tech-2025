import React from "react";
import { FieldErrors, Control } from "react-hook-form";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RHFTextField } from "./RHFTextField";

interface RealEstateFieldsProps {
  control: Control<CreateItemPayload>;
  errors: FieldErrors<CreateItemPayload>;
}

export const RealEstateFields: React.FC<RealEstateFieldsProps> = ({
  control,
}) => (
  <>
    <RHFTextField
      name="propertyType"
      control={control}
      label="Тип недвижимости"
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите тип недвижимости" }}
    />
    <RHFTextField
      name="area"
      control={control}
      label="Площадь (кв. м)"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите площадь" }}
    />
    <RHFTextField
      name="rooms"
      control={control}
      label="Количество комнат"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите кол-во комнат" }}
    />
    <RHFTextField
      name="price"
      control={control}
      label="Цена (руб.)"
      variant="outlined"
      type="number"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите цену" }}
    />
  </>
);
