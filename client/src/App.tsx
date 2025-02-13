import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({});

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default App;
