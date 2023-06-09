import React, { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import UnAuthRoutes from "./routes/UnAuthRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import "./App.css";
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
