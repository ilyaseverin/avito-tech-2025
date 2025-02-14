/**
 * Компонент `CategoryFields` отображает дополнительные поля в зависимости от выбранной категории.
 * Используется на втором шаге формы создания/редактирования объявления.
 *
 * Категории:
 * - "Недвижимость" → `RealEstateFields`
 * - "Авто" → `AutoFields`
 * - "Услуги" → `ServiceFields`
 *
 * Если категория не выбрана, отображается подсказка.
 */

import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RealEstateFields } from "./RealEstateFields";
import { AutoFields } from "./AutoFields";
import { ServiceFields } from "./ServiceFields";

/**
 * Интерфейс пропсов для `CategoryFields`.
 */
interface CategoryFieldsProps {
  /**
   * Контроллер `react-hook-form` для управления полями.
   */
  control: Control<CreateItemPayload>;

  /**
   * Ошибки валидации формы.
   */
  errors: FieldErrors<CreateItemPayload>;

  /**
   * Выбранная категория (type).
   */
  selectedType: string;
}

/**
 * Компонент для отображения полей в зависимости от категории объявления.
 * @param control Контроллер формы
 * @param errors Ошибки валидации формы
 * @param selectedType Выбранная категория
 * @returns JSX-элемент с полями для выбранной категории
 */
export const CategoryFields: React.FC<CategoryFieldsProps> = ({
  control,
  errors,
  selectedType,
}) => {
  if (!selectedType) {
    return <p>Сначала выберите категорию на предыдущем шаге.</p>;
  }

  switch (selectedType) {
    case "Недвижимость":
      return <RealEstateFields control={control} errors={errors} />;
    case "Авто":
      return <AutoFields control={control} errors={errors} />;
    case "Услуги":
      return <ServiceFields control={control} errors={errors} />;
    default:
      return null;
  }
};
