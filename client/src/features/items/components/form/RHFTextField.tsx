import {
  Controller,
  FieldValues,
  Control,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface RHFTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "name" | "control"> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
}

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
        helperText={error ? error.message : ""}
      />
    )}
  />
);
