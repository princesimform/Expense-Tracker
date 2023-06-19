import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TablePaginationActions } from "../../components/TablePaginationActions";
import {
  deleteExpense,
  expenseDataType,
  getExpenses,
} from "../../redux/expanseSlice";
import { Rootstate } from "../../redux/store";
import { GeneralPropType } from "../../routes/AuthRoutes";
import { StyledTableCell } from "../GroupPages/GroupDetails";
import AddExpenseForm from "./AddExpanseForm";
import ExpenseCard from "./ExpenseCard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
interface PropType extends GeneralPropType {}

interface DataTableProps {
  data: expenseDataType[];
  rowsPerPage: number;
}

function ExpenseList({ userData }: PropType) {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  const deleteExpanse = async (id: number) => {
    try {
      const response = await dispatch(deleteExpense(expenseList[id]));
      if (response.payload.docData.status) {
        enqueueSnackbar(`Expense Deleted successfully `, {
          variant: "success",
          autoHideDuration: 3000,
        });
        await dispatch(getExpenses(userData?.email));
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Something went wrong`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
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
          {
            // expenseList.length > 0 ? (
            //   expenseList.map((expense: expenseDataType) => {
            //     return (
            //       <>
            //         <Grid item xs={12} sm={12} lg={12} key={expense.created_at}>
            //           <ExpenseCard expanse={expense} />
            //         </Grid>
            //         {/* <p key={group.created_at}>{group.name}</p>{" "} */}
            //       </>
            //     );
            //   })
            // ) : (
            //   <p>No data avaliable</p>
            // )
          }
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
                      <AddExpenseForm
                        FriendsList={[]}
                        userData={userData}
                        updateExpanseData={row}
                      />

                      <Button
                        sx={{
                          borderRadius: "16px",
                          width: "32px",
                          margin: "4px",
                          minWidth: "16px",
                          height: "32px",
                          color: "rgba(189,85,189,0.9)",
                        }}
                        variant='outlined'
                        color='secondary'
                        size='small'
                        onClick={() => deleteExpanse(index)}
                      >
                        <DeleteIcon />
                      </Button>
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
                      >
                        <VisibilityIcon />
                      </Button>
                    </TableCell>
                    <TableCell>{row.expense_amount}</TableCell>
                    <TableCell style={{ minWidth: 150 }} align='right'>
                      <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                      >
                        Settle Up
                      </Button>
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
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
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
        </Grid>
      </Container>
    </>
  );
}

export default ExpenseList;
