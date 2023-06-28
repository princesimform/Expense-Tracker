import React from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  expenseDataType,
  getExpenses,
  updateExpense,
} from "../../redux/expenseSlice";
import { Rootstate } from "../../redux/store";
import AddExpenseForm from "./AddExpanseForm";
import { useSnackbar } from "notistack";
import ExpenseDataTable from "../../components/expense/ExpenseDataTable";
import { GetTimestemp } from "../../libs/services/utills";

function ExpenseList() {
  return (
    <>
      <Box
        margin='0px 16px'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className='groups-page-heading'
      >
        <Typography className='groups-page-title' variant='h4' textAlign='left'>
          Your Expenses
        </Typography>
        <AddExpenseForm
          ModelButtonStyle={{
            borderRadius: "16px",
            width: "32px",
            margin: "5px 10px",
            height: "32px",
          }}
          FriendsList={[]}
        />
      </Box>
      <Divider className='divider-bottom' />
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <ExpenseDataTable />
        </Grid>
      </Container>
    </>
  );
}

export default ExpenseList;
