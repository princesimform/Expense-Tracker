import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnAuthRoutes from "./routes/UnAuthRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import "./style/App.css";
import PageNotFound from "./pages/errorPages/PageNotFound";
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
              <Route path='/something-went-wrong' element={<PageNotFound />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
