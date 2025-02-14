/**
 * Компонент `RealEstateFields` содержит специфичные поля для категории "Недвижимость".
 * Используется на втором шаге формы создания/редактирования объявления.
 */

import React from "react";
import { FieldErrors, Control } from "react-hook-form";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RHFTextField } from "./RHFTextField";

/**
 * Интерфейс пропсов для `RealEstateFields`.
 */
interface RealEstateFieldsProps {
  /**
   * Контроллер `react-hook-form` для управления полями формы.
   */
  control: Control<CreateItemPayload>;

  /**
   * Ошибки валидации формы.
   */
  errors: FieldErrors<CreateItemPayload>;
}

/**
 * Компонент для отображения полей, относящихся к недвижимости.
 * @param control Контроллер формы
 * @param errors Ошибки валидации формы
 * @returns JSX-элемент с полями для недвижимости
 */
export const RealEstateFields: React.FC<RealEstateFieldsProps> = ({
  control,
}) => (
  <>
    {/* Поле "Тип недвижимости" */}
    <RHFTextField
      name="propertyType"
      control={control}
      label="Тип недвижимости"
      variant="outlined"
      fullWidth
      style={{ marginBottom: 16 }}
      rules={{ required: "Укажите тип недвижимости" }}
    />

    {/* Поле "Площадь" */}
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

    {/* Поле "Количество комнат" */}
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

    {/* Поле "Цена" */}
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
