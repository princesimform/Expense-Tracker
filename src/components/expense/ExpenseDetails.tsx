import React, { useEffect } from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  Backdrop,
  Stack,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useToggle from "../../customHooks/useToggle";
import { GeneralPropType } from "../../routes/AuthRoutes";
import {
  expenseDataType,
  getExpenses,
  updateExpense,
} from "../../redux/expanseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import AddExpenseForm from "../../pages/expanse/AddExpanseForm";
import { useSnackbar } from "notistack";
import SettlementDetails from "./SettlementDetails";

interface PropType extends GeneralPropType {
  expenseData: expenseDataType;
  isOpen: boolean;
  closeExpense: Function;
}
function ExpenseDetails({
  userData,
  expenseData,
  isOpen,
  closeExpense,
}: PropType) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const settleExpense = async () => {
    const requestData = JSON.parse(JSON.stringify(expenseData));
    requestData.isSettle = !requestData.isSettle;
    requestData.settleBy = userData?.email;
    try {
      const response = await dispatch(updateExpense(requestData));

      if (response.payload.docData.status) {
        enqueueSnackbar(`Expense Update successfully `, {
          variant: "success",
          autoHideDuration: 3000,
        });
        await dispatch(getExpenses(userData?.email));
        closeExpense();
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
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isOpen}
        onClose={() => closeExpense()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { lg: 600, sm: 400, xs: 400 },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  id='transition-modal-title'
                  variant='h4'
                  sx={{
                    textAlign: "left",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  {expenseData.title}
                  <Typography variant='subtitle1'>
                    Paid By :{" "}
                    <Box component='span' sx={{ fontWeight: 600 }}>
                      {expenseData.paid_by}
                    </Box>
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  id='transition-modal-title'
                  variant='h5'
                  sx={{ mb: 2, textAlign: "right" }}
                >
                  {expenseData.expense_amount} {expenseData.currency_type}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={6}>
                <SettlementDetails expense={expenseData} userData={userData} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                {expenseData.isSettle && (
                  <Typography
                    className='group-expanse-name'
                    sx={{ textAlign: "right" }}
                  >
                    SETTLED BY
                    <Typography>{expenseData.settleBy}</Typography>
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ marginBottom: "10px", marginTop: "10px" }} />
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} lg={6}>
                {expenseData.expense_file_url != "" && (
                  <Button
                    target='_blank'
                    href={expenseData.expense_file_url}
                    variant='contained'
                    color='success'
                  >
                    Download Bill
                  </Button>
                )}
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                lg={6}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                {expenseData.isSettle ? (
                  <Button
                  onClick={() => settleExpense()}
                  variant='contained'
                  color='error'
                >
                  Revert
                </Button>
                ) : (
                  <Button
                    onClick={() => settleExpense()}
                    variant='contained'
                    color='primary'
                  >
                    Settle Up
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ExpenseDetails;
