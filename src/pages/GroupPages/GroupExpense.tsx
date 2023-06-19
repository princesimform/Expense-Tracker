import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React from "react";
import { expenseDataType } from "../../redux/expanseSlice";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  groupExpenseList: expenseDataType[];
}
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function GroupExpense(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
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
                    <TableRow hover role='checkbox' tabIndex={-1} key={2}>
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
                            {expanse.expense_description}
                            <Typography className='group-expanse-amount'>
                              $999.00
                            </Typography>
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell key={2}>
                        <Box>
                          <Typography fontWeight='bold'>
                            <span className='text-slate-500'>Paid by </span>
                            Demo3
                          </Typography>
                          <Typography>
                            <span className='text-slate-500 font-bold'>
                              on{" "}
                            </span>
                            Sun, 19 Jun 2022
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell key={3}>
                        <Box color='red'>
                          <Typography>You Owe</Typography>
                          <Typography fontWeight='bold'>$333.00</Typography>
                        </Box>
                      </TableCell>
                      <TableCell key={4}>
                        <Box>
                          <ChevronRightIcon />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow role='checkbox' tabIndex={-1} key={2}>
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
                          No Expense Ramain
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
    </div>
  );
}

export default GroupExpense;
