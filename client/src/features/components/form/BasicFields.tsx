/**
 * Компонент BasicFields предназначен для ввода базовых данных объявления.
 * Используется в формах создания/редактирования объявления.
 *
 * Включает следующие поля:
 * - Название (name) - обязательное поле
 * - Описание (description) - обязательное поле
 * - Локация (location) - обязательное поле
 * - Ссылка на фото (image) - необязательное поле
 * - Категория (type) - обязательное поле (выбор из списка)
 *
 * Компонент интегрирован с `react-hook-form` для управления формой и валидацией.
 */

import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { CreateItemPayload } from "../../../types/itemTypes";
import { RHFTextField } from "./RHFTextField";

/**
 * Интерфейс пропсов для BasicFields.
 */
interface BasicFieldsProps {
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
 * Компонент для ввода основных данных объявления.
 * @param control Контроллер формы для управления полями
 * @param errors Ошибки валидации полей формы
 * @returns JSX-элементы полей ввода
 */
export const BasicFields: React.FC<BasicFieldsProps> = ({
  control,
  errors,
}) => {
  return (
    <>
      <RHFTextField
        name="name"
        control={control}
        label="Название"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 16 }}
        rules={{ required: "Название обязательно" }}
      />

      <RHFTextField
        name="description"
        control={control}
        label="Описание"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 16 }}
        rules={{ required: "Описание обязательно" }}
      />

      <RHFTextField
        name="location"
        control={control}
        label="Локация"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 16 }}
        rules={{ required: "Локация обязательна" }}
      />

      <RHFTextField
        name="image"
        control={control}
        label="Ссылка на фото"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 16 }}
      />

      {/* Поле выбора категории */}
      <FormControl variant="outlined" fullWidth style={{ marginBottom: 16 }}>
        <InputLabel id="type-label">Категория</InputLabel>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Выберите категорию" }}
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              labelId="type-label"
              label="Категория"
              error={!!error}
            >
              <MenuItem value="">
                <em>Не выбрано</em>
              </MenuItem>
              <MenuItem value="Недвижимость">Недвижимость</MenuItem>
              <MenuItem value="Авто">Авто</MenuItem>
              <MenuItem value="Услуги">Услуги</MenuItem>
            </Select>
          )}
        />
        {errors.type && (
          <p style={{ color: "red", margin: 0 }}>{errors.type.message}</p>
        )}
      </FormControl>
    </>
  );
};
