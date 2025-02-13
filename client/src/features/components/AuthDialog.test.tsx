import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthDialog } from "./AuthDialog";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { describe, expect, test, vi } from "vitest";
import { setToken } from "../auth/authSlice";

describe("AuthDialog", () => {
  test("Отображает поля ввода и кнопки", () => {
    render(
      <Provider store={store}>
        <AuthDialog open={true} onClose={vi.fn()} />
      </Provider>
    );

    expect(screen.getByLabelText("Логин")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(screen.getByText("Войти")).toBeInTheDocument();
    expect(screen.getByText("Отмена")).toBeInTheDocument();
  });

  test("Показывает ошибку при пустом вводе", async () => {
    render(
      <Provider store={store}>
        <AuthDialog open={true} onClose={vi.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Войти"));

    expect(await screen.findByText("Введите логин")).toBeInTheDocument();
    expect(await screen.findByText("Введите пароль")).toBeInTheDocument();
  });

  test("Показывает ошибку при неверном вводе", async () => {
    render(
      <Provider store={store}>
        <AuthDialog open={true} onClose={vi.fn()} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText("Логин"), "wronguser");
    await userEvent.type(screen.getByLabelText("Пароль"), "wrongpass");
    fireEvent.click(screen.getByText("Войти"));

    const errorMessages = await screen.findAllByText(
      "Неверные логин или пароль"
    );
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test("Успешный вход закрывает модалку", async () => {
    const onCloseMock = vi.fn();
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <AuthDialog open={true} onClose={onCloseMock} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText("Логин"), "test");
    await userEvent.type(screen.getByLabelText("Пароль"), "1234");
    fireEvent.click(screen.getByText("Войти"));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(setToken("fake-token"));
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  test("Закрытие кнопкой 'Отмена' сбрасывает форму", async () => {
    const onCloseMock = vi.fn();

    render(
      <Provider store={store}>
        <AuthDialog open={true} onClose={onCloseMock} />
      </Provider>
    );

    await userEvent.type(screen.getByLabelText("Логин"), "testuser");
    await userEvent.type(screen.getByLabelText("Пароль"), "password");

    fireEvent.click(screen.getByText("Отмена"));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Логин")).toHaveValue("");
    expect(screen.getByLabelText("Пароль")).toHaveValue("");
  });
});
