import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "./api/api";
import { authApi } from "./api/authApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Для RTK Query нужно добавить middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(itemsApi.middleware)
      .concat(authApi.middleware),
});

// Типы для дальнейшего использования
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
