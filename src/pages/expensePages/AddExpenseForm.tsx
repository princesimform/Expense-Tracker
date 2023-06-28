import React, {
  ChangeEvent,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderGroupParams,
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddExpenseFormSchema } from "../../services/ValidationSchema";
import useToggle from "../../customHooks/useToggle";
import { AppDispatch, Rootstate } from "../../redux/store";
import { Assignment } from "@mui/icons-material";
import { GroupHeader, GroupItems } from "../../components/CustomStyled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "../../components/FormUI/TextField";
import TextfieldWrapper from "../../components/FormUI/TextField";
import SelectWrapper from "../../components/FormUI/Select";
import {
  expenseDataType,
  getExpenses,
  setExpense,
  updateExpense,
} from "../../redux/expenseSlice";
import ExpenseFirestoreService from "../../services/firebase/expenseFirestore";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";
import FirebaseFileHandling from "../../services/firebase/fileHandling";
import AddIcon from "@mui/icons-material/Add";
import Styles from "./../../style/default.module.css";
import { PayloadAction } from "@reduxjs/toolkit";

type ListOptionType = {
  label: string;
  value: string;
  group: string;
};

interface PropType {
  FriendsList: string[];
  updateExpanseData?: expenseDataType;
  ModelButtonStyle: {
    [key: string]: string;
  };
}
function AddExpenseForm({
  FriendsList,

  updateExpanseData,
  ModelButtonStyle,
}: PropType) {
  const expenseform = useRef<HTMLFormElement>(null);
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  var today = new Date();
  const [paidByList, setPaidByList] = useState<string[]>();
  const [formValues, setFormValues] = useState<expenseDataType>({
    id: 0,
    title: "",
    expense_description: "",
    member_list: null,
    expense_file_url: "",
    expense_amount: 0,
    paid_by: "",
    currency_type: "INR",
    expense_date: today.toISOString(),
    created_at: today.toISOString(),
    isSettle: false,
    settleBy: "",
    expense_file: null,
    group_list: [],
    deleted_at: "",
    type_of_settle: "",
  });
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
  });
  const [listOptions, setListOptions] = useState<ListOptionType[]>([]);
  const [defaultListOptions, setDefaultListOptions] = useState<
    ListOptionType[]
  >([]);
  let tempFriendsSelectList: ListOptionType[] = [];
  let tempDefaultFriendsSelectList: ListOptionType[] = [];
  let tempGroupsList: string[] = [];
  let tempFriendsList: string[] = [];
  const buttonValue = updateExpanseData == undefined ? "Create" : "Update";
  const currencyOptions = { ASD: "USD", INR: "INR" };
  const reader = new FileReader();

  const renderGroup = (params: AutocompleteRenderGroupParams) => [
    <li key={params.key} style={{ marginLeft: "10px" }}>
      <GroupHeader>{params.group}</GroupHeader>
      <GroupItems>{params.children}</GroupItems>
    </li>,
    ,
  ];

  async function updateListOptions() {
    groupList.map((group) => {
      tempGroupsList.push(group.name);
      group.member_list!.map((member) => {
        tempFriendsList.push(member);
      });
    });
    FriendsList.map((firend) => {
      tempFriendsList.push(firend);
    });
    tempGroupsList = tempGroupsList.filter(
      (val, id, tempGroupsList) => tempGroupsList.indexOf(val) == id
    );
    tempFriendsList = tempFriendsList.filter(
      (val, id, tempFriendsList) => tempFriendsList.indexOf(val) == id
    );
    profile?.email &&
      tempFriendsList.splice(tempFriendsList.indexOf(profile.email), 1);

    tempGroupsList.map((groupName) => {
      tempFriendsSelectList.push({
        label: groupName,
        value: groupName,
        group: "group",
      });
    });
    setListOptions(tempFriendsSelectList);

    if (updateExpanseData != undefined) {
      tempDefaultFriendsSelectList = [];
      updateExpanseData.group_list?.map((item) => {
        tempFriendsSelectList.map((group) => {
          if (group.group == "group" && group.value == item) {
            tempDefaultFriendsSelectList.push(group);
          }
        });
      });
      updateExpanseData.member_list?.map((item) => {
        tempFriendsSelectList.map((friend) => {
          if (friend.value == item) {
            tempDefaultFriendsSelectList.push(friend);
          }
        });
      });
    }
    setDefaultListOptions(tempDefaultFriendsSelectList);
    tempDefaultFriendsSelectList = [];
    tempFriendsSelectList = [];
  }
  useEffect(() => {
    if (profile?.email) {
      setPaidByList([profile.email]);
    }
    if (updateExpanseData != undefined) {
      setFormValues(updateExpanseData);
    }
  }, []);
  useEffect(() => {
    updateListOptions();
    if (updateExpanseData?.member_list != undefined) {
      setPaidByList(updateExpanseData.member_list);
    }
  }, [toggles]);

  const onSelectListOptions = async (
    e: SyntheticEvent<Element, Event>,
    value: ListOptionType[],
    reason: AutocompleteChangeReason,
    setFieldValue: Function,
    details?: AutocompleteChangeDetails<ListOptionType>
  ) => {
    setFieldValue("member_list", value);
    tempGroupsList = [];
    value.map((item) => {
      if (item.group == "group") {
        tempGroupsList.push(item.value);
      }
    });
    setFieldValue("group_list", tempGroupsList);
    tempGroupsList = [];
    updatePaidByList(value);
  };

  const handleFileInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      const res = await setFieldValue("expense_file", e.target.files[0]);
      reader.addEventListener("load", function (event) {
        if (res.expense_file == undefined)
          setFormValues((prev) => ({
            ...prev,
            expense_file: e.target.files![0],
          }));
      });
      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("expense_file", e.target.files[0]);
    }
  };

  const updatePaidByList = async (ListData: ListOptionType[]) => {
    tempGroupsList = [];
    tempFriendsList = [];
    ListData.map((item) => {
      if (item.group == "group") {
        groupList.map((group) => {
          if (group.name == item.value) {
            group.member_list.map((member) => {
              tempFriendsList.push(member);
            });
            return;
          }
        });
      } else {
        tempFriendsList.push(item.value);
      }
    });
    tempFriendsList = tempFriendsList.filter(
      (val, id, tempFriendsList) => tempFriendsList.indexOf(val) == id
    );

    if (tempFriendsList.length > 0) {
      if (profile?.email) {
        tempFriendsList.push(profile.email);
      }
      setPaidByList(tempFriendsList);
    } else {
      if (profile?.email) {
        setPaidByList([profile.email]);
      }
    }

    return tempFriendsList;
  };
  const handlesubmit = async (values: expenseDataType, resetForm: Function) => {
    if (paidByList != undefined) {
      values.member_list = paidByList.filter(
        (val, id, paidByList) => paidByList.indexOf(val) == id
      );
    }

    if (values.expense_file != null) {
      var min = 10000;
      var max = 99999;
      var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const FileResponse = await FirebaseFileHandling.addFile(
        values.expense_file,
        "expense_images",
        `${randomNum}expense`
      );
      if (FileResponse.status) {
        values.expense_file_url = FileResponse.downloadUrl;
        values.expense_file = null;
      }
    }

    if (updateExpanseData != undefined) {
      try {
        const response: any = await dispatch(updateExpense(values));

        if (response.payload.docData.status) {
          enqueueSnackbar(`Expense Update successfully `, {
            variant: "success",
            autoHideDuration: 3000,
          });
          resetForm({ values: "" });
          profile?.email != undefined &&
            (await dispatch(getExpenses(profile?.email)));

          toggle("isModleOpen");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(`Something went wrong`, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      try {
        values.id = new Date().getUTCMilliseconds();
        const response: PayloadAction<any> = await dispatch(setExpense(values));

        if (response.payload.docData.status) {
          enqueueSnackbar(`Expense Created successfully `, {
            variant: "success",
            autoHideDuration: 3000,
          });
          resetForm({ values: "" });
          profile?.email != undefined &&
            (await dispatch(getExpenses(profile?.email)));
          toggle("isModleOpen");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(`Something went wrong`, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  return (
    <>
      <Button
        sx={{
          minWidth: "16px",
          color: "rgba(189,85,189,0.9)",
          ...ModelButtonStyle,
        }}
        variant='outlined'
        color='secondary'
        size='small'
        onClick={() => toggle("isModleOpen")}
      >
        {updateExpanseData ? <EditIcon /> : <AddIcon />}
      </Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={toggles.isModleOpen}
        // onClose={handleModleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={toggles.isModleOpen}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id='transition-modal-title'
              variant='h5'
              sx={{ textAlign: "center", mb: 2 }}
              component='h2'
            >
              {buttonValue} Expanse
            </Typography>
            <Box>
              <Formik
                initialValues={formValues}
                validationSchema={AddExpenseFormSchema}
                validateOnMount
                onSubmit={(values, { resetForm }) =>
                  handlesubmit(values, resetForm)
                }
              >
                {({
                  handleSubmit,
                  errors,
                  isValid,
                  touched,
                  setFieldValue,
                }) => (
                  <Form ref={expenseform} onSubmit={handleSubmit}>
                    <Box sx={{ margin: "auto", textAlign: "center" }}>
                      <ErrorMessage name='expense_file' component='p' />
                    </Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} lg={12}>
                        <TextfieldWrapper
                          name='title'
                          label='Title'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={12}>
                        <Autocomplete
                          sx={{ mt: 2 }}
                          isOptionEqualToValue={(
                            option: ListOptionType,
                            value: ListOptionType
                          ) => option.value === value.value}
                          options={listOptions}
                          groupBy={(option: ListOptionType) => option.group}
                          renderGroup={renderGroup}
                          defaultValue={defaultListOptions}
                          multiple
                          id='select-friends'
                          renderInput={(params) => (
                            <Field
                              name='member_list'
                              as={TextField}
                              {...params}
                              variant='standard'
                              sx={{ mb: 2 }}
                              label='With You And'
                              color='primary'
                              placeholder='Friend of Group'
                              error={
                                Boolean(errors.member_list) &&
                                Boolean(touched.member_list)
                              }
                            />
                          )}
                          aria-required
                          onChange={(
                            e: SyntheticEvent<Element, Event>,
                            value: ListOptionType[],
                            reason: AutocompleteChangeReason,
                            details?: AutocompleteChangeDetails<ListOptionType>
                          ) =>
                            onSelectListOptions(
                              e,
                              value,
                              reason,
                              setFieldValue,
                              details
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={2} sm={2} lg={2}>
                        <InputLabel
                          htmlFor='bill-image'
                          className={Styles.billImageField}
                          sx={{ mb: 2 }}
                        >
                          <Field
                            style={{
                              opacity: 0,
                              display: "inherit",
                              height: 0,
                            }}
                            id='bill-image'
                            name='expense_file'
                            type='file'
                            value={undefined}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFileInputChange(event, setFieldValue)
                            }
                            error={
                              Boolean(errors.expense_file)
                                ? Boolean(touched.expense_file)
                                : undefined
                            }
                          />
                          <Avatar
                            sx={{
                              bgcolor: `${
                                formValues.expense_file != null
                                  ? "green"
                                  : "primary"
                              }`,
                            }}
                          >
                            <Assignment />
                          </Avatar>
                        </InputLabel>
                      </Grid>
                      <Grid item xs={10} sm={10} lg={10}>
                        <TextfieldWrapper
                          name='expense_description'
                          label='Description'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={12} sx={{ mb: 2 }}>
                        <TextfieldWrapper
                          name='expense_amount'
                          label='Amoount'
                          type='number'
                          size='small'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={12} sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={[]}>
                            <DatePicker
                              label='Expanse Date'
                              defaultValue={dayjs(today)}
                              slotProps={{
                                textField: { size: "small", fullWidth: true },
                              }}
                              maxDate={dayjs()}
                              onChange={(date) => {
                                const newDate = new Date(String(date));
                                setFieldValue(
                                  "expense_date",
                                  newDate.toISOString()
                                );
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={12} lg={12} sx={{ mb: 2 }}>
                        <SelectWrapper
                          name='paid_by'
                          options={
                            paidByList != undefined
                              ? paidByList?.reduce(
                                  (a, v) => ({ ...a, [v]: v }),
                                  {}
                                )
                              : []
                          }
                          defaultValue={updateExpanseData?.paid_by}
                          lable='Paid By'
                        />
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Button
                        variant='contained'
                        color='warning'
                        onClick={() => toggle("isModleOpen")}
                      >
                        Cancle
                      </Button>
                      <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                        disabled={!isValid}
                      >
                        {buttonValue} Expense
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default AddExpenseForm;
