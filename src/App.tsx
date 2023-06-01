import React from "react";
import "./App.css";
import { Box, Button, Container } from "@mui/material";
import Login from "./components/Login";
import ThemeProvider from "@mui/material";
import theme from "./style/theme";
function App() {
  return (
      <Container className='mt-0' sx={{ height: "100vh", display: "flex" }}>
        <Login />
      </Container>
  );
}

export default App;
