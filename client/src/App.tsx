import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Header } from "./Header/Header";

const theme = createTheme({});

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
    </ThemeProvider>
  );
}

export default App;
