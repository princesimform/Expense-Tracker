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
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  const [activeGroupExpense, setActiveGroupExpenseList] =
    useState<expenseDataType[]>();
  const [payAmount, setPayAmount] = useState(0);
  const [getAmount, setGetAmount] = useState(0);
  useEffect(() => {
    const activeGroupExpenseList: expenseDataType[] = [];
    let paidAmount = 0;
    let tempgetAmount = 0;
    expenseList.forEach((expense) => {
      if (
        !expense.isSettle &&
        expense.member_list != undefined &&
        expense.member_list.length > 1
      ) {
        if (expense.paid_by == profile?.email) {
          tempgetAmount =
            tempgetAmount +
            (expense.expense_amount -
              expense.expense_amount / expense.member_list.length);
        } else {
          paidAmount =
            paidAmount + expense.expense_amount / expense.member_list.length;
        }
        activeGroupExpenseList.push(expense);
        setPayAmount(paidAmount);
        setGetAmount(tempgetAmount);
      }
    });
    setActiveGroupExpenseList(activeGroupExpenseList);
  }, []);

  const data = {
    labels: ["Lent", "Owe"],
    datasets: [
      {
        label: "Amount",
        data: [payAmount, getAmount],
        backgroundColor: ["rgb(59 130 246 / 0.8)", "rgb(189 85 189 / 0.8)"],
        borderColor: ["rgb(59 130 246 / 0.9)", "rgb(189 85 189 / 0.9)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  )
}

export default PieChart