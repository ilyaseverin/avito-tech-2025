/**
 * Модуль `authSlice` отвечает за хранение и управление состоянием авторизации пользователя.
 *
 * Основной функционал:
 * - Автоматическая загрузка токена из `localStorage` при запуске приложения.
 * - Экшены для установки (`setToken`) и удаления (`clearToken`) токена.
 * - Сохранение токена в `localStorage` для кэширования между сессиями.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Интерфейс состояния авторизации пользователя.
 */
interface AuthState {
  /**
   * Токен аутентификации пользователя.
   * Если `null`, значит, пользователь не авторизован.
   */
  token: string | null;
}

// Загружаем токен из localStorage при инициализации
const tokenFromStorage = localStorage.getItem("authToken");

/**
 * Начальное состояние модуля авторизации.
 */
const initialState: AuthState = {
  token: tokenFromStorage || null,
};

/**
 * Redux slice для управления авторизацией пользователя.
 * Включает экшены для входа и выхода, а также синхронизацию с `localStorage`.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Устанавливает токен при успешной аутентификации.
     *
     * @param state Текущее состояние авторизации.
     * @param action Экшен с `PayloadAction`, содержащий строку токена.
     * @returns Обновленное состояние с сохраненным токеном.
     */
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },

    /**
     * Удаляет токен при выходе пользователя (логаут).
     *
     * @param state Текущее состояние авторизации.
     * @returns Обновленное состояние с `token = null`.
     */
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

// Экспорт экшенов и редюсера
export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
