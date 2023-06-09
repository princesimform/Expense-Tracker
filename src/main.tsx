import React from "react";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, Slide, Container } from "@mui/material";
import "./index.css";
import { createTheme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Slide}
        maxSnack={3}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
