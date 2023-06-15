import { User } from "firebase/auth";
import React, { lazy, ReactNode } from "react";
import { Route } from "react-router-dom";

const AuthGuards = lazy(() => import("./../guard/AuthGuard"));
const DashBoard = lazy(() => import("./../pages/DashBoard"));
const Groups = lazy(() => import("./../pages/GroupPages"));
const Profile = lazy(() => import("./../pages/Profile"));
const GroupDetails = lazy(() => import("../pages/GroupPages/GroupDetails"));
const ExpenseList = lazy(() => import("../pages/expanse"));

export interface GeneralPropType {
  userData?: User;
}
const AuthRoutes: ReactNode[] = [
  <Route
    key='Dashboard'
    path='/dashboard'
    element={<AuthGuards component={DashBoard} />}
  />,
  <Route
    key='Dashboard'
    path='/profile'
    element={<AuthGuards component={Profile} />}
  />,
  <Route
    key='Group'
    path='/group'
    element={<AuthGuards component={Groups} />}
  />,
  <Route
    key='Group'
    path='/group/:id'
    element={<AuthGuards component={GroupDetails} />}
  />,
  <Route
    key='Expense'
    path='/expense'
    element={<AuthGuards component={ExpenseList} />}
  />,
];
export default AuthRoutes;
  