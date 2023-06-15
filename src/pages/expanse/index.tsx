import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { expenseDataType } from "../../redux/expanseSlice";
import { Rootstate } from "../../redux/store";
import AddExpenseForm from "./AddExpanseForm";

function ExpenseList() {
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  return (
    <>
        {console.log("expense")}
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className='groups-page-heading'
      >
        <Typography className='groups-page-title' variant='h4' textAlign='left'>
          Your Expenses
        </Typography>
        <AddExpenseForm FriendsList={[]} />
      </Box>
      <Divider className='group-title-divider' />
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          {expenseList.length >= 0 ? (
            expenseList.map((expense: expenseDataType) => {
              console.log(expense);

              return (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={4}
                    key={expense.created_at}
                  ></Grid>
                  {/* <p key={group.created_at}>{group.name}</p>{" "} */}
                </>
              );
            })
          ) : (
            <p>No data avaliable</p>
          )}

          <Grid item xs={12} sm={6} lg={4}>
            {/* <GroupCard /> */}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {/* <GroupForm /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ExpenseList;
