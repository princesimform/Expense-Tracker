import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";
const UnAuthGuard = lazy(() => import("./../guard/UnAuthGuard"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Form = lazy(() => import("./../pages/Form"));
const ResetPassword = lazy(() => import("../components/resetPassword"));

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
  <Route
    key='Reset Password'
    path='/reset-password'
    element={<UnAuthGuard component={<ResetPassword />} />}
  />,
];

export default UnAuthRoutes;
