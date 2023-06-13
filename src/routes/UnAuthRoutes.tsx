import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

const UnAuthGuard = lazy(() => import("./../guard/UnAuthGuard"));
const HomePage = lazy(() => import("./../pages/HomePage"));
const Form = lazy(() => import("./../pages/Form"));

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
