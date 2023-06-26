import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";
const UnAuthGuard = lazy(() => import("./../guard/UnAuthGuard"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
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
    element={<UnAuthGuard component={<LandingPage />} />}
  />,
];

export default UnAuthRoutes;
