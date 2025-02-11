import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item, CreateItemPayload } from "../../types/itemTypes"; // необходимо будет описать типы

const apiUrl = import.meta.env.VITE_API_URL;

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl, // или другой адрес, где запущен сервер
  }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "/items",
      providesTags: ["Items"],
    }),
    getItemById: builder.query<Item, number>({
      query: (id) => `/items/${id}`,
      providesTags: (result, error, id) => [{ type: "Items", id }],
    }),
    createItem: builder.mutation<Item, CreateItemPayload>({
      query: (body) => ({
        url: "/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Items"],
    }),
    updateItem: builder.mutation<
      Item,
      { id: number; data: Partial<CreateItemPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Items", id }],
    }),
    deleteItem: builder.mutation<null, number>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;
