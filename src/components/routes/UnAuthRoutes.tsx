import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnAuthGuard";
import HomePage from "../pages/HomePage";
import Form from "../pages/Form";

const UnAuthRoutes: ReactNode[] = [
  <Route
    key="Auth"
    path="/login"
    element={<UnAuthGuard component={<Form isLogin={true} />} />}
  />,
  <Route
    key="Auth"
    path="/register"
    element={<UnAuthGuard component={<Form isLogin={false} />} />}
  />,
  <Route
    key="Home"
    path="/"
    element={<UnAuthGuard component={<HomePage />} />}
  />,
];

export default UnAuthRoutes;
