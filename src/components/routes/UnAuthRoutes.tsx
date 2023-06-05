import React from "react";
import { Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnAuthGuard";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";

const UnAuthRoutes = [
  <Route
    key='Auth'
    path='/login'
    element={<UnAuthGuard component={<Login isLogin={true} />} />}
  />,
  <Route
    key='Auth'
    path='/register'
    element={<UnAuthGuard component={<Login isLogin={false} />} />}
  />,
  <Route
    key='Home'
    path='/'
    element={<UnAuthGuard component={<HomePage />} />}
  />,
];

export default UnAuthRoutes;
