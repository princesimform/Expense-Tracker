import { Box, Typography } from "@mui/material";
import React from "react";
import { expenseDataType } from "../../redux/expanseSlice";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType extends GeneralPropType {
  expense: expenseDataType;
}
function SettlementDetails({ expense, userData }: PropType) {
  return (
    <>
      {expense.paid_by == userData?.email ? (
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

export default SettlementDetails;
