import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, RegisterOptions } from "react-hook-form";
import { RHFTextField } from "./RHFTextField";
import { describe, test, expect } from "vitest";

describe("RHFTextField", () => {
  interface FormValues {
    email: string;
  }

  const TestComponent = ({
    rules,
  }: {
    rules?: RegisterOptions<FormValues, "email">;
  }) => {
    const { control, trigger } = useForm<FormValues>({
      defaultValues: { email: "" },
    });

    return (
      <>
        <RHFTextField
          name="email"
          control={control}
          rules={rules}
          label="Email"
        />
        <button onClick={() => trigger("email")}>Проверить</button>
      </>
    );
  };

  test("Рендерит текстовое поле с заданным лейблом", () => {
    render(<TestComponent />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("Отображает валидационную ошибку", async () => {
    render(<TestComponent rules={{ required: "Заполните поле" }} />);

    await userEvent.click(screen.getByLabelText("Email"));
    await userEvent.tab();
    await userEvent.click(screen.getByText("Проверить"));

    await waitFor(() =>
      expect(screen.getByText("Заполните поле")).toBeInTheDocument()
    );
  });

  test("Валидация email работает", async () => {
    render(
      <TestComponent
        rules={{
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный email" },
        }}
      />
    );

    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "invalid-email");
    await userEvent.tab();
    await userEvent.click(screen.getByText("Проверить"));

    await waitFor(() =>
      expect(screen.getByText("Некорректный email")).toBeInTheDocument()
    );
  });

  test("При вводе текста обновляет значение", async () => {
    render(<TestComponent />);

    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "test@example.com");

    expect(input).toHaveValue("test@example.com");
  });
});
