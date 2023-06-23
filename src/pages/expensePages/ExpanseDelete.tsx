import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteExpense,
  expenseDataType,
  getExpenses,
} from "../../redux/expanseSlice";
import { useSnackbar } from "notistack";
import { GeneralPropType } from "../../routes/AuthRoutes";
import DeleteIcon from "@mui/icons-material/Delete";

interface PropType extends GeneralPropType {
  expnaseData: expenseDataType;
}
function ExpanseDelete({ expnaseData, userData }: PropType) {
  const [openDialog, setOpenDialog] = useState(false);
  const nevagite = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const deleteExpanse = async (data: expenseDataType) => {
    try {
      const response = await dispatch(deleteExpense(data));
      if (response.payload.docData.status) {
        enqueueSnackbar(`Expense Deleted successfully `, {
          variant: "success",
          autoHideDuration: 3000,
        });
        await dispatch(getExpenses(userData?.email));
        
        setOpenDialog(false);
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
        onClick={() => setOpenDialog(true)}
      >
        <DeleteIcon />
      </Button>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            We Are Delete Your all transaction which are done in this group
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setOpenDialog(false)}
          >
            Disagree
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => deleteExpanse(expnaseData)}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExpanseDelete;
