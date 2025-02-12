import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

// Читаем токен из localStorage
const tokenFromStorage = localStorage.getItem("authToken");

const initialState: AuthState = {
  token: tokenFromStorage ? tokenFromStorage : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // При логине / setToken
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      // Сохраняем в localStorage
      localStorage.setItem("authToken", action.payload);
    },
    // При логауте / clearToken
    clearToken(state) {
      state.token = null;
      // Удаляем из localStorage
      localStorage.removeItem("authToken");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
