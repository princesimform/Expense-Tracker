import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledTableCell } from "../../pages/groupPages/GroupDetails";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { AppDispatch, Rootstate } from "../../redux/store";
import AddExpenseForm from "../../pages/expensePages/AddExpanseForm";
import {
  expenseDataType,
  getExpenses,
  updateExpense,
} from "../../redux/expenseSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TablePaginationActions } from "../TablePaginationActions";
import ExpanseDelete from "../../pages/expensePages/ExpenseDelete";
import ExpenseDetails from "./ExpenseDetails";
import NoDataFound from "../../pages/errorPages/NoDataFound";

function ExpenseDataTable() {
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  const [activeExpense, setActiveExpense] = useState<expenseDataType>();
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenseList.length) : 0;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openModel = (expense: expenseDataType) => {
    setActiveExpense(expense);
    setIsExpenseOpen(true);
  };

  return (
    <>
      {expenseList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Paid by</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Owes</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
                <StyledTableCell align='right'>Settle Up</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? expenseList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : expenseList
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell scope='row'>{row.title}</TableCell>
                  <TableCell>{row.paid_by}</TableCell>
                  <TableCell>{row.expense_amount}</TableCell>
                  <TableCell style={{ minWidth: 170 }}>
                    {!row.isSettle && (
                      <AddExpenseForm
                        ModelButtonStyle={{
                          borderRadius: "16px",
                          width: "32px",
                          margin: "5px 4px",
                          height: "32px",
                        }}
                        FriendsList={[]}
                        updateExpanseData={row}
                      />
                    )}
                    <ExpanseDelete expnaseData={row} />
                    <Button
                      sx={{
                        borderRadius: "16px",
                        width: "32px",
                        margin: "4px",
                        minWidth: "16px",
                        color: "rgba(189,85,189,0.9)",
                        height: "32px",
                      }}
                      variant='outlined'
                      color='secondary'
                      size='small'
                      onClick={() => openModel(row)}
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                  <TableCell>{row.expense_amount}</TableCell>
                  <TableCell style={{ minWidth: 150 }} align='right'>
                    {row.isSettle ? (
                      <Button
                        onClick={() => openModel(row)}
                        variant='contained'
                        color='error'
                      >
                        Revert
                      </Button>
                    ) : (
                      <Button
                        onClick={() => openModel(row)}
                        variant='contained'
                        color='primary'
                      >
                        Settle Up
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={expenseList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <>
          <NoDataFound />
        </>
      )}
      {activeExpense != undefined && (
        <ExpenseDetails
          isOpen={isExpenseOpen}
          closeExpense={() => setIsExpenseOpen(false)}
          expenseData={activeExpense}
        />
      )}
    </>
  );
}

export default ExpenseDataTable;
