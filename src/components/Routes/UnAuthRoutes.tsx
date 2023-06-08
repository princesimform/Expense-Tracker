import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";

const UnAuthGuard = lazy(() => import("../Guards/UnAuthGuard"));
const HomePage = lazy(() => import("../Pages/HomePage"));
const Form = lazy(() => import("../Pages/Form"));

const UnAuthRoutes: ReactNode[] = [
  <Route
    key='Auth'
    path='/login'
    element={<UnAuthGuard component={<Form isLogin={true} />} />}
  />,
  <Route
    key='Auth'
    path='/register'
    element={<UnAuthGuard component={<Form isLogin={false} />} />}
  />,
  <Route
    key='Home'
    path='/'
    element={<UnAuthGuard component={<HomePage />} />}
  />,
];

export default UnAuthRoutes;
