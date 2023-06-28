import React from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  Backdrop,
  Divider,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  expenseDataType,
  getExpenses,
  updateExpense,
} from "../../redux/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { useSnackbar } from "notistack";
import ExpenseWiseSettlement from "../settlement/ExpenseWiseSettlement";
import { ErrorMessage, Form, Formik } from "formik";
import { SettleExpenseFormSchema } from "../../services/ValidationSchema";
import { AppDispatch, Rootstate } from "../../redux/store";
import { PayloadAction } from "@reduxjs/toolkit";
import emailjs from "@emailjs/browser";

interface PropType {
  expenseData: expenseDataType;
  isOpen: boolean;
  closeExpense: Function;
}
function ExpenseDetails({ expenseData, isOpen, closeExpense }: PropType) {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  enum Options {
    Online = "Online",
    Cash = "Cash",
  }
  const initialValues: { settle_expense_type: string } = {
    settle_expense_type: "",
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    setFieldValue("settle_expense_type", event.currentTarget.value);
    // setSettleType((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (values: { settle_expense_type: string }) => {
    settleExpense(values.settle_expense_type);
  };

  const settleExpense = async (settle_expense_type: string) => {
    const requestData: expenseDataType = JSON.parse(
      JSON.stringify(expenseData)
    );
    requestData.isSettle = !requestData.isSettle;
    requestData.settleBy = String(profile?.email);
    requestData.type_of_settle = settle_expense_type;
    try {
      const response: PayloadAction<any> = await dispatch(
        updateExpense(requestData)
      );

      if (response.payload.docData.status) {
        enqueueSnackbar(`Expense Update successfully `, {
          variant: "success",
          autoHideDuration: 3000,
        });
        requestData.isSettle &&
          requestData.member_list?.map(async (member, index) => {
            const sendData = { ...requestData, user_email: member };
            await emailjs.send(
              "service_nd25uhj",
              "template_ikbk7xu",
              sendData,
              "W8br9GiQwkAK3XCOO"
            );
          });
        profile?.email != undefined &&
          (await dispatch(getExpenses(profile?.email)));
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
                <Box>
                  <Typography
                    id='transition-modal-title'
                    variant='h4'
                    sx={{
                      textAlign: "left",

                      fontWeight: 600,
                    }}
                  >
                    {expenseData.title}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Paid By :{" "}
                    <Box component='span' sx={{ fontWeight: 600 }}>
                      {expenseData.paid_by}
                    </Box>
                  </Typography>
                </Box>
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

            <Formik
              initialValues={initialValues}
              validateOnMount
              validationSchema={SettleExpenseFormSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleSubmit,
                errors,
                isValid,
                touched,
                setFieldValue,
              }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} lg={6}>
                        {!expenseData.isSettle ? (
                          <FormControl component='fieldset'>
                            <FormLabel component='legend'>
                              {" "}
                              How Settle
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby='demo-row-radio-buttons-group-label'
                              name='settle_expense'
                              value={values.settle_expense_type.toString()}
                              onChange={(e) => handleChange(e, setFieldValue)}
                            >
                              <FormControlLabel
                                value={Options.Online.toString()}
                                control={<Radio />}
                                label='Online'
                              />
                              <FormControlLabel
                                value={Options.Cash.toString()}
                                control={<Radio />}
                                label='Cash'
                              />
                            </RadioGroup>
                          </FormControl>
                        ) : (
                          <Box>
                            {" "}
                            <Typography
                              className='group-expense-name'
                              sx={{ textAlign: "left" }}
                            >
                              Amount Received
                            </Typography>
                            <Typography className='group-expense-name'>
                              {expenseData.type_of_settle}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ color: "red" }}>
                          <ErrorMessage
                            name='settle_expense_type'
                            component='p'
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        {expenseData.isSettle ? (
                          <Box>
                            <Typography
                              className='group-expense-name'
                              sx={{ textAlign: "right" }}
                            >
                              SETTLED BY
                            </Typography>
                            <Typography
                              className='group-expense-name'
                              sx={{ textAlign: "right" }}
                            >
                              {expenseData.settleBy}
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: "right" }}>
                            <ExpenseWiseSettlement expense={expenseData} />
                          </Box>
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
                          expenseData.settleBy == profile?.email && (
                            <Button
                              onClick={() => settleExpense("")}
                              variant='contained'
                              color='error'
                            >
                              Revert
                            </Button>
                          )
                        ) : (
                          <Button
                            // onClick={() => settleExpense()}
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!isValid}
                          >
                            Settle Up
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Form>
                </>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ExpenseDetails;
