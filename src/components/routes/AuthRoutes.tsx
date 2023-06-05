import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import AuthGuards from "../guards/AuthGuard";
import DashBoard from "../pages/DashBoard";

const AuthRoutes: ReactNode[] = [
  <Route
    key='Dashboard'
    path='/dashboard'
    element={<AuthGuards component={<DashBoard />} />}
  />,
];
export default AuthRoutes;
