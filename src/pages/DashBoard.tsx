import React, { useState } from "react";
import { Container, Divider, Grid } from "@mui/material";
import OverviewOfGroups from "../components/group/OverviewOfGroups";
import OverviewOfExpenses from "../components/expense/OverviewOfExpenses";
import { useSelector } from "react-redux";
import { Rootstate } from "../redux/store";
import DashboardGroup from "../components/dashboard/DashboardGroup";
import DashboardExpense from "../components/dashboard/DashboardExpense";
import DashboardChart from "../components/dashboard/DashboardChart";
function DashBoard() {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  return (
    <>
      <DashboardChart />
      {/* <Container className='dashboard-container' maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={2}>
            <OverviewOfGroups
              sx={{
                height: "100%",
              }}
              numberOfGroups={groupList.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <OverviewOfExpenses
              sx={{ height: "100%" }}
              numberOfExpenses={expenseList.length}
            />
          </Grid>
        </Grid>
      </Container> */}

      <Divider className='divider-top' />
      <DashboardGroup groups={groupList} />
      <Divider className='divider-top' />
      <DashboardExpense expanses={expenseList} />
    </>
  );
}

export default DashBoard;
