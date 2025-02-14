/**
 * `RHFTextField` — обертка для MUI `TextField`, интегрированная с `react-hook-form`.
 * Позволяет использовать валидацию и управляемый ввод данных.
 */

import {
  Controller,
  FieldValues,
  Control,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

/**
 * Интерфейс пропсов для `RHFTextField`.
 * @template TFieldValues - тип значений формы (например, `CreateItemPayload`).
 */
interface RHFTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "name" | "control"> {
  /**
   * Имя поля в форме (ключ объекта `TFieldValues`).
   */
  name: Path<TFieldValues>;

  /**
   * Контроллер `react-hook-form` для управления полем.
   */
  control: Control<TFieldValues>;

  /**
   * Правила валидации для `react-hook-form`.
   */
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}

/**
 * Универсальный компонент текстового поля, интегрированный с `react-hook-form`.
 * Автоматически отображает ошибки валидации.
 *
 * @param name Имя поля в форме
 * @param control Контроллер формы
 * @param rules Правила валидации
 * @param textFieldProps Прочие пропсы `TextField`
 * @returns JSX-элемент MUI `TextField`, управляемый через `react-hook-form`
 */
export const RHFTextField = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  ...textFieldProps
}: RHFTextFieldProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        {...textFieldProps}
        error={!!error}
        helperText={error?.message || ""}
      />
    )}
  />
);
