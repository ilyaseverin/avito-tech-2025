/**
 * @module api.ts
 * @remarks Конфигурация API для взаимодействия с сервером через RTK Query.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item, CreateItemPayload } from "../../types/itemTypes"; // Импорт типов данных

// Получение базового URL API из переменных окружения
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * @readonly itemsApi
 * @remarks API-слайс для работы с объявлениями (items).
 */
export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl, // Устанавливаем базовый URL API
  }),
  tagTypes: ["Items"], // Определяем теги для кеширования данных

  endpoints: (builder) => ({
    /**
     * @function getItems
     * @remarks Получает список всех объявлений.
     * @returns {Item[]} - Массив объектов `Item`.
     */
    getItems: builder.query<Item[], void>({
      query: () => "/items",
      providesTags: ["Items"],
    }),

    /**
     * @function getItemById
     * @remarks Получает объявление по его ID.
     * @param {number} id - Идентификатор объявления.
     * @returns {Item} - Объект `Item`.
     */
    getItemById: builder.query<Item, number>({
      query: (id) => `/items/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Items", id }],
    }),

    /**
     * @function createItem
     * @remarks Создаёт новое объявление.
     * @param {CreateItemPayload} body - Данные нового объявления.
     * @returns {Item} - Созданный объект `Item`.
     */
    createItem: builder.mutation<Item, CreateItemPayload>({
      query: (body) => ({
        url: "/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Items"], // Инвалидирует кэш после создания нового объявления
    }),

    /**
     * @function updateItem
     * @remarks Обновляет объявление по ID.
     * @param {object} params - Объект с ID объявления и обновляемыми данными.
     * @param {number} params.id - Идентификатор объявления.
     * @param {Partial<CreateItemPayload>} params.data - Частичные данные для обновления.
     * @returns {Item} - Обновленный объект `Item`.
     */
    updateItem: builder.mutation<
      Item,
      { id: number; data: Partial<CreateItemPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Items", id }],
    }),

    /**
     * @function deleteItem
     * @remarks Удаляет объявление по ID.
     * @param {number} id - Идентификатор объявления.
     * @returns {null} - Успешное выполнение запроса.
     */
    deleteItem: builder.mutation<null, number>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"], // Инвалидирует кэш после удаления объявления
    }),
  }),
});

// Экспорт автоматически сгенерированных хуков для работы с API
export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;
