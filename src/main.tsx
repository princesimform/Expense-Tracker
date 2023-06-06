import React from "react";
import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme, Slide, Container } from "@mui/material";
import "./index.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(263deg 54% 59%)",
    },
    secondary: {
      main: "hsl(263deg 54% 59% / 30%)",
    },
    background: {
      default: "hsl(263deg 54% 59% / 90%)",
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(263deg 54% 59% / 90%)",
          color: "white",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(263deg 54% 59% / 90%)",
          color: "white",
        },
      },
    },
  },
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
