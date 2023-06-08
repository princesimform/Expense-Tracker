import React, { Suspense } from "react";
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
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
const renderLoader = () => <p>Loading</p>;

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              {AuthRoutes}
              {UnAuthRoutes}
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
