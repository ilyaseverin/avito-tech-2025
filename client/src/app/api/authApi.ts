/**
 * @module authApi.ts
 * @remarks API-сервис для аутентификации пользователей с использованием RTK Query.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Получение базового URL API из переменных окружения
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * @readonly authApi
 * @remarks API-слайс для аутентификации пользователей.
 * Включает в себя запросы на вход (login) и выход (logout).
 */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl, // Устанавливаем базовый URL API
  }),

  endpoints: (builder) => ({
    /**
     * @function login
     * @remarks Отправляет данные пользователя для аутентификации.
     * @param {object} credentials - Объект с данными для входа.
     * @param {string} credentials.username - Имя пользователя.
     * @param {string} credentials.password - Пароль пользователя.
     * @returns {object} Объект с токеном `{ token: string }`.
     */
    login: builder.mutation<
      { token: string },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * Выполняет выход пользователя, удаляя его сессии.
     */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

// Экспорт автоматически сгенерированных хуков для работы с API
export const { useLoginMutation, useLogoutMutation } = authApi;
