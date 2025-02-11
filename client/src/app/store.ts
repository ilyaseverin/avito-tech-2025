import { configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "./api/api";
// Пример: если есть authSlice
// import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  // Для RTK Query нужно добавить middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
});

// Типы для дальнейшего использования
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
