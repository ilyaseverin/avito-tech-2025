/**
 * Компонент AutoFields представляет собой группу полей формы для ввода данных о транспортном средстве.
 * Используется в формах создания/редактирования объявления, связанных с категорией "Авто".
 *
 * Содержит следующие поля:
 *  - Марка (brand) - обязательное поле
 *  - Модель (model) - обязательное поле
 *  - Год выпуска (year) - обязательное поле, ввод только чисел
 *  - Пробег (mileage) - необязательное числовое поле
 *
 * Все поля используют `RHFTextField`, который интегрируется с `react-hook-form` для управления состоянием формы.
 */

import React from "react";
import { FieldErrors, Control } from "react-hook-form";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RHFTextField } from "./RHFTextField";

/**
 * Пропсы, ожидаемые компонентом AutoFields.
 */
interface AutoFieldsProps {
  /**
   * Контроль управления формой от `react-hook-form`.
   */
  control: Control<CreateItemPayload>;

  /**
   * Ошибки валидации полей формы.
   */
  errors: FieldErrors<CreateItemPayload>;
}

/**
 * Компонент для ввода данных о транспортном средстве в форме объявления.
 * @param control Контроллер формы для управления полями
 * @param errors Ошибки валидации полей формы
 * @returns JSX-элементы полей ввода
 */
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
