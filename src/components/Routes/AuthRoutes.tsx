import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import AuthGuards from "../Guards/AuthGuard";
import DashBoard from "../Pages/DashBoard";
import Groups from "../Pages/GroupPages";

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
