import React, { useState } from "react";
import {  Container, Divider, Grid } from "@mui/material";
import OverviewOfGroups from "../components/group/OverviewOfGroups";
import { GeneralPropType } from "../routes/AuthRoutes";
import OverviewOfExpenses from "../components/expense/OverviewOfExpenses";
import { useSelector } from "react-redux";
import { Rootstate } from "../redux/store";
import DashboardGroup from "../components/dashboard/DashboardGroup";
import DashboardExpense from "../components/dashboard/DashboardExpense";
interface PropType extends GeneralPropType {}
function DashBoard({ userData }: PropType) {
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  return (
    <>
      <Container className='dashboard-container' maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOfGroups
              sx={{
                height: "100%",
              }}
              numberOfGroups={groupList.length}
              userData={userData}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOfExpenses
              sx={{ height: "100%" }}
              numberOfExpenses={expenseList.length}
              userData={userData}
            />
          </Grid>
        </Grid>
      </Container>

      <Divider className='divider-top' />
      <DashboardGroup groups={groupList} userData={userData} />
      <Divider className='divider-top' />
      <DashboardExpense expanses={expenseList} userData={userData} />
    </>
  );
}

export default DashBoard;
