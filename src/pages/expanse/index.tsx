import {
  Avatar,
  Box,
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
import { useSelector } from "react-redux";
import { TablePaginationActions } from "../../components/TablePaginationActions";
import { expenseDataType } from "../../redux/expanseSlice";
import { Rootstate } from "../../redux/store";
import { GeneralPropType } from "../../routes/AuthRoutes";
import { StyledTableCell } from "../GroupPages/GroupDetails";
import AddExpenseForm from "./AddExpanseForm";
import ExpenseCard from "./ExpenseCard";
interface PropType extends GeneralPropType {}

interface DataTableProps {
  data: expenseDataType[];
  rowsPerPage: number;
}

function ExpenseList({ userData }: PropType) {
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
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
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
                    <TableCell component='th' scope='row'>
                      {row.expense_description}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align='right'>
                      {row.expense_amount}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align='right'>
                      {row.paid_by}
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
                    colSpan={3}
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
