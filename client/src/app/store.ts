/**
 * @module store.ts
 * @remarks Конфигурация Redux-хранилища с использованием RTK Query.
 */

import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "./api/api";
import { authApi } from "./api/authApi";
import authReducer from "../features/auth/authSlice";

/**
 * @readonly store
 * @remarks Создание Redux-хранилища с RTK Query API и редуктором аутентификации.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer, // Редюсер для управления авторизацией
    [itemsApi.reducerPath]: itemsApi.reducer, // Редюсер для работы с объявлениями
    [authApi.reducerPath]: authApi.reducer, // Редюсер для аутентификации
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(itemsApi.middleware) // Добавляем middleware RTK Query для работы с объявлениями
      .concat(authApi.middleware), // Добавляем middleware RTK Query для аутентификации
});

/**
 * @typedef RootState
 * @remarks Тип, представляющий состояние Redux-хранилища.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * @typedef AppDispatch
 * @remarks Тип, представляющий dispatch Redux-хранилища.
 */
export type AppDispatch = typeof store.dispatch;
