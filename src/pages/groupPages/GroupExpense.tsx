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
import ExpenseWiseSettlement from "../../components/settlement/ExpenseWiseSettlement";

function GroupExpense(props: PropType) {
  const { children, value, index, userData, ...other } = props;
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [activeExpense, setActiveExpense] = useState<expenseDataType>();
  const openModel = (expense: expenseDataType) => {
    setActiveExpense(expense);
    setIsExpenseOpen(true);
  };
  if (props.groupExpenseList != undefined) {
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
                          >
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
                                <span
                                  style={{
                                    color: "rgb(100 116 139)",
                                  }}
                                >
                                  Paid by{" "}
                                </span>
                                {expanse.paid_by}
                              </Typography>
                              <Typography>
                                <span
                                  style={{
                                    fontWeight: 700,
                                    color: "rgb(100 116 139)",
                                  }}
                                >
                                  on{" "}
                                </span>
                                {expanse.expense_date.substring(0, 10)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={3}>
                            <ExpenseWiseSettlement
                              expense={expanse}
                              userData={userData}
                            />
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
