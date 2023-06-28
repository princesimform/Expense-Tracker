import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import { expenseDataType } from "../../redux/expenseSlice";
import PieChart from "../chart/PieChart";
import BarChart from "../chart/BarChart";
import OverviewOfGroups from "../group/OverviewOfGroups";
import OverviewOfExpenses from "../expense/OverviewOfExpenses";
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardChart() {
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  return (
    <>
      <Box
        key='dashboardList'
        margin='0px 16px'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className='groups-page-heading'
      >
        <Typography className='groups-page-title' variant='h4' textAlign='left'>
          Expense Overview
        </Typography>
      </Box>
      <Divider className='divider-bottom' />
      <Container className='' maxWidth='xl' >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <OverviewOfGroups
                  sx={{
                    height: "100%",
                  }}
                  numberOfGroups={groupList.length}
                />
              </Grid>
              <Grid item xs={12}>
                <OverviewOfExpenses
                  sx={{ height: "100%" }}
                  numberOfExpenses={expenseList.length}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ width: "500px", margin: "auto" }}>
              <Typography>Expense Vs Amount</Typography> <BarChart />
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div style={{ width: "250px", margin: "auto" }}>
              <Typography>Lent Vs Owe</Typography> <PieChart />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardChart;
