/**
 * @module App.tsx
 * @remarks Главный компонент приложения, обеспечивающий поддержку темы Material UI.
 */

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Создание кастомной темы (можно настроить под проект)
const theme = createTheme({});

/**
 * @function App
 * @remarks Оборачивает всё приложение в `ThemeProvider`, чтобы обеспечить поддержку темы Material UI.
 *
 * @param {React.ReactNode} children - Дочерние компоненты, передаваемые в `App`.
 * @returns {JSX.Element} Главный компонент приложения.
 */
interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default App;
