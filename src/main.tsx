import React from "react";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, Slide,  createTheme } from "@mui/material";
import "./style/index.css";
import createPalette from "./theme/createPalette";
import createComponents from "./theme/createComponents";

const palette = createPalette();
const components = createComponents();

const theme = createTheme({
  palette,
  components,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
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
