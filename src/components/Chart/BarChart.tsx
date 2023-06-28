import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import { expenseDataType } from "../../redux/expanseSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );

  const [expenseName, setExpenseName] = useState<any[]>([]);
  const [expenseAmount, setExpenseAmount] = useState<any[]>([]);
  useEffect(() => {
    let tempexpenseName: any = [];
    let amount: any = [];
    expenseList.forEach((expense) => {
      if (
        !expense.isSettle &&
        expense.member_list != undefined &&
        expense.member_list.length > 1
      ) {
        tempexpenseName.push(expense.title);
        if (expense.paid_by == profile?.email) {
          amount.push(
            expense.expense_amount -
              expense.expense_amount / expense.member_list.length
          );
        } else {
          amount.push(-(expense.expense_amount / expense.member_list.length));
        }
      }
    });
    setExpenseName(tempexpenseName);
    setExpenseAmount(amount);
  }, []);

  const labels = expenseName;

  const options = {
    scales: {
      xAxes: [
        {
          barThickness: 200,
        },
      ],
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Amount",
        data: [200, -200, 4],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Bar
      // height={400}
      // width={400}
      // options={{ maintainAspectRatio: false }}
      data={data}
    />
  );
}

export default BarChart;
