import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { expenseDataType } from "../../redux/expanseSlice";
interface PropType extends GeneralPropType {
  children?: React.ReactNode;
  index: number;
  value: number;
  groupExpenseList: expenseDataType[];
}
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { GeneralPropType } from "../../routes/AuthRoutes";
import Loader from "../../components/Loader";
import ExpenseDetails from "../../components/expense/ExpenseDetails";
import useToggle from "../../customHooks/useToggle";
import SettlementDetails from "../../components/expense/SettlementDetails";

function GroupExpense(props: PropType) {
  const { children, value, index, userData, ...other } = props;
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [activeExpense, setActiveExpense] = useState<expenseDataType>();
  console.log(isExpenseOpen);
  const openModel = (expense: expenseDataType) => {
    setActiveExpense(expense);
    setIsExpenseOpen(true);
  };
  if (props.groupExpenseList != undefined) {
    console.log(props.groupExpenseList);
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box sx={{ p: 3 }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableBody>
                  {props.groupExpenseList.length > 0 ? (
                    props.groupExpenseList.map((expanse) => (
                      <>
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={2}
                          onClick={() => openModel(expanse)}
                        >
                          <TableCell
                            key={1}
                            // align={column.align}
                          >
                            {/* {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value} */}
                            <Box>
                              <Typography
                                variant='h6'
                                fontWeight='bold'
                                className='group-expanse-name'
                              >
                                {expanse.title}
                                <Typography className='group-expanse-amount'>
                                  {expanse.expense_amount}
                                </Typography>
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={2}>
                            <Box>
                              <Typography fontWeight='bold'>
                                <span className='text-slate-500'>Paid by </span>
                                {expanse.paid_by}
                              </Typography>
                              <Typography>
                                <span className='text-slate-500 font-bold'>
                                  on{" "}
                                </span>
                                {expanse.expense_date.substring(0, 10)}
                                {/* Sun, 19 Jun 2022 */}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={3}>
                            <SettlementDetails expense={expanse} userData={userData} />
                            
                          </TableCell>
                          <TableCell key={4}>
                            <Box>
                              <ChevronRightIcon />
                            </Box>
                          </TableCell>
                        </TableRow>
                      </>
                    ))
                  ) : (
                    <TableRow role='checkbox' tabIndex={-1} key={2}>
                      <TableCell key={1}>
                        <Box>
                          <Typography
                            variant='h6'
                            fontWeight='bold'
                            className='group-expanse-name'
                          >
                            No Expense Remain
                            {/* <Typography className='group-expanse-amount'>
                                    $999.00
                                  </Typography> */}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        {activeExpense != undefined && (
          <ExpenseDetails
            userData={props.userData}
            expenseData={activeExpense}
            isOpen={isExpenseOpen}
            closeExpense={() => setIsExpenseOpen(false)}
          />
        )}
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default GroupExpense;
