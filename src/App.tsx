import React from "react";
import "./App.css";
import { Box, Button, Container, createTheme } from "@mui/material";
import Login from "./components/pages/Form";
// import theme from "./style/theme";
import { BrowserRouter, Routes } from "react-router-dom";
import UnAuthRoutes from "./components/routes/UnAuthRoutes";
import AuthRoutes from "./components/routes/AuthRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {AuthRoutes}
          {UnAuthRoutes}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
