import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";

const AuthGuards = lazy(() => import("../Guards/AuthGuard"));
const DashBoard = lazy(() => import("../Pages/DashBoard"));
const Groups = lazy(() => import("../Pages/GroupPages"));
const AuthRoutes: ReactNode[] = [
  <Route
    key='Dashboard'
    path='/dashboard'
    element={<AuthGuards component={<DashBoard />} />}
  />,
  <Route
    key='Group'
    path='/group'
    element={<AuthGuards component={<Groups />} />}
  />,
];
export default AuthRoutes;
