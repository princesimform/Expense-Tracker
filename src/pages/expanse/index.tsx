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
import { GeneralPropType } from "../../routes/AuthRoutes";
import AddExpenseForm from "./AddExpanseForm";
interface PropType extends GeneralPropType {}
function ExpenseList({ userData }: PropType) {
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
        <AddExpenseForm FriendsList={[]} userData={userData} />
      </Box>
      <Divider className='group-title-divider' />
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          {expenseList.length > 0 ? (
            expenseList.map((expense: expenseDataType) => {
              return (
                <>
                  <Grid item xs={12} sm={12} lg={12} key={expense.created_at}>
                    <p>{expense.expense_description}</p>
                  </Grid>
                  {/* <p key={group.created_at}>{group.name}</p>{" "} */}
                </>
              );
            })
          ) : (
            <p>No data avaliable</p>
          )}
          {/* <p>No data avaliable</p> */}

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
