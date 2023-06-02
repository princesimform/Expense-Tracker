import React from "react";
import "./App.css";
import { Box, Button, Container, createTheme } from "@mui/material";
import Login from "./components/Login";
// import theme from "./style/theme";
import { createMuiTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(263deg 54% 59%)",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container className='mt-0' sx={{ height: "100vh", display: "flex" }}>
        <Login />
      </Container>
    </ThemeProvider>
  );
}

export default App;
