import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { expenseDataType } from "../../redux/expenseSlice";
import { Rootstate } from "../../redux/store";
interface PropType{
  expense: expenseDataType;
}
function ExpenseWiseSettlement({ expense }: PropType) {
  const {profile} = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  return (
    <>
      {expense.paid_by == profile?.email ? (
        <Box color='green'>
          <Typography>
            {expense.isSettle ? "You Received" : "You owe"}
          </Typography>
          {expense.member_list != undefined && (
            <Typography fontWeight='bold'>
              {(
                expense.expense_amount -
                expense.expense_amount / expense.member_list?.length
              ).toFixed(2)}{" "}
              {expense.currency_type}
            </Typography>
          )}
        </Box>
      ) : (
        <Box color='red'>
          <Typography>
            {expense.isSettle ? "You Paid" : "You should pay"}
          </Typography>
          {expense.member_list != undefined && (
            <Typography fontWeight='bold'>
              {(expense.expense_amount / expense.member_list?.length).toFixed(
                2
              )}{" "}
              {expense.currency_type}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default ExpenseWiseSettlement;
