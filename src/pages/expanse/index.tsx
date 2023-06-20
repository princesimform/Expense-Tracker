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
import ExpenseDataTable from "../../components/expense/ExpenseDataTable";
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
        <AddExpenseForm
          ModelButtonStyle={{
            borderRadius: "16px",
            width: "32px",
            margin: "5px 10px",
            height: "32px",
          }}
          FriendsList={[]}
          userData={userData}
        />
      </Box>
      <Divider className='divider' />
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
          <ExpenseDataTable userData={userData} />
          
        </Grid>
      </Container>
    </>
  );
}

export default ExpenseList;
