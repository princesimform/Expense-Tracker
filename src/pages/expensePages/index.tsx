import React from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  expenseDataType,
  getExpenses,
  updateExpense,
} from "../../redux/expanseSlice";
import { Rootstate } from "../../redux/store";
import { GeneralPropType } from "../../routes/AuthRoutes";
import AddExpenseForm from "./AddExpanseForm";
import { useSnackbar } from "notistack";
import ExpenseDataTable from "../../components/expense/ExpenseDataTable";
import { GetTimestemp } from "../../libs/services/utills";
interface PropType extends GeneralPropType {}

function ExpenseList({ userData }: PropType) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );

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
          userData={userData}
        />
      </Box>
      <Divider className='divider-bottom' />
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <ExpenseDataTable userData={userData} />
        </Grid>
      </Container>
    </>
  );
}

export default ExpenseList;
