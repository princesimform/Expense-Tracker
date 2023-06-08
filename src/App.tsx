import React from "react";
import "./App.css";
import { Box, Button, Container, createTheme } from "@mui/material";
import Login from "./components/Pages/Form";
// import theme from "./style/theme";
import { BrowserRouter, Routes } from "react-router-dom";
import UnAuthRoutes from "./components/Routes/UnAuthRoutes";
import AuthRoutes from "./components/Routes/AuthRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Pages/Navbar";
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
