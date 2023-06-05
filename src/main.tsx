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
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Container className='mt-0' sx={{ height: "100vh", display: "flex" }}>
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
      </Container>
    </ThemeProvider>
  </React.StrictMode>
);
