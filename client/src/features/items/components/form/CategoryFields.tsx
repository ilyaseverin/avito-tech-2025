import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { CreateItemPayload } from "../../../../types/itemTypes";
import { RealEstateFields } from "./RealEstateFields";
import { AutoFields } from "./AutoFields";
import { ServiceFields } from "./ServiceFields";

interface CategoryFieldsProps {
  control: Control<CreateItemPayload>;
  errors: FieldErrors<CreateItemPayload>;
  selectedType: string;
}

export const CategoryFields: React.FC<CategoryFieldsProps> = ({
  control,
  errors,
  selectedType,
}) => {
  if (!selectedType) {
    return <p>Сначала выберите категорию на предыдущем шаге.</p>;
  }
  if (selectedType === "Недвижимость") {
    return <RealEstateFields control={control} errors={errors} />;
  }
  if (selectedType === "Авто") {
    return <AutoFields control={control} errors={errors} />;
  }
  if (selectedType === "Услуги") {
    return <ServiceFields control={control} errors={errors} />;
  }
  return null;
};
