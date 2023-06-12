import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";
import GroupDetails from "../pages/GroupPages/GroupDetails";
import Profile from "../pages/Profile";

const AuthGuards = lazy(() => import("./../guard/AuthGuard"));
const DashBoard = lazy(() => import("./../pages/DashBoard"));
const Groups = lazy(() => import("./../pages/GroupPages"));
const AuthRoutes: ReactNode[] = [
  <Route
    key='Dashboard'
    path='/dashboard'
    element={<AuthGuards component={<DashBoard />} />}
  />,
  <Route
    key='Dashboard'
    path='/profile'
    element={<AuthGuards component={<Profile />} />}
  />,
  <Route
    key='Group'
    path='/group'
    element={<AuthGuards component={<Groups />} />}
  />,
  <Route
    key='Group'
    path='/group/:id'
    element={<AuthGuards component={<GroupDetails />} />}
  />,
];
export default AuthRoutes;
