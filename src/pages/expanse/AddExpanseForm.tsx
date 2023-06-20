import React, { ChangeEvent, ReactNode, SyntheticEvent, useEffect, useState } from "react";
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

import { Field, Form, Formik } from "formik";
import { AddExpenseFormSchema } from "../../libs/services/ValidationSchema";
import useToggle from "../../customHooks/useToggle";
import { Rootstate } from "../../redux/store";
import { Assignment } from "@mui/icons-material";
import { GroupHeader, GroupItems } from "../../components/CustomStyled";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { GeneralPropType } from "../../routes/AuthRoutes";
import TextField from "../../components/FormUI/TextField";
import TextfieldWrapper from "../../components/FormUI/TextField";
import SelectWrapper from "../../components/FormUI/Select";
import {
  expenseDataType,
  getExpenses,
  setExpense,
  updateExpense,
} from "../../redux/expanseSlice";
import ExpenseFirestoreService from "../../libs/services/firebase/expenseFirestore";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";
import FirebaseFileHandling from "../../libs/services/firebase/fileHandling";
import AddIcon from "@mui/icons-material/Add";

type ListOptionType = {
  label: string;
  value: string;
  group: string;
};

interface PropType extends GeneralPropType {
  FriendsList: string[];
  updateExpanseData?: expenseDataType;
  ModelButtonStyle: {
    borderRadius: string;
    width: string;
    margin: string;
    height: string;
  };
}
function AddExpenseForm({
  FriendsList,
  userData,
  updateExpanseData,
  ModelButtonStyle,
}: PropType) {
  const dispatch = useDispatch();
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
    currency_type: "",
    expense_date: today.toISOString(),
    created_at: today.toISOString(),
    isSettle: false,
    expense_file: null,
    group_list: [],
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
    userData?.email &&
      tempFriendsList.splice(tempFriendsList.indexOf(userData?.email), 1);

    tempGroupsList.map((groupName) => {
      tempFriendsSelectList.push({
        label: groupName,
        value: groupName,
        group: "group",
      });
    });
    tempFriendsList.map((friendName) => {
      tempFriendsSelectList.push({
        label: friendName,
        value: friendName,
        group: "friend",
      });
    });

    setListOptions(tempFriendsSelectList);

    if (updateExpanseData != undefined) {
      console.log(updateExpanseData);
      console.log("listOptions", listOptions);
      tempDefaultFriendsSelectList = [];
      updateExpanseData.group_list?.map((item) => {
        tempFriendsSelectList.map((group) => {
          if (group.group == "group" && group.value == item) {
            tempDefaultFriendsSelectList.push(group);
          }
        });
      });
      console.log(tempDefaultFriendsSelectList);
      updateExpanseData.member_list?.map((item) => {
        tempFriendsSelectList.map((friend) => {
          if (friend.value == item) {
            console.log(friend);
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
    console.log(" i  am running only ones ");

    if (userData?.email) {
      setPaidByList([userData?.email]);
    }
    if (updateExpanseData != undefined) {
      setFormValues(updateExpanseData);
    }
  }, []);
  useEffect(() => {
    console.log(" i  am running on toggle ");

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
    console.log(value);
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

  const updatePaidByList = async (ListData: ListOptionType[]) => {
    tempGroupsList = [];

    tempFriendsList = [];
    ListData.map((item) => {
      if (item.group == "group") {
        tempGroupsList.push(item.value);
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
    tempGroupsList = tempGroupsList.filter(
      (val, id, tempGroupsList) => tempGroupsList.indexOf(val) == id
    );

    if (tempFriendsList.length > 0) {
      if (userData?.email) {
        tempFriendsList.push(userData?.email);
      }
      setPaidByList(tempFriendsList);
    } else {
      if (userData?.email) {
        setPaidByList([userData.email]);
      }
    }

    return tempFriendsList;
  };
  const handlesubmit = async (values: expenseDataType, resetForm: Function) => {
    if (paidByList != undefined) {
      values.member_list = paidByList;
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
        const response = await dispatch(updateExpense(values));

        if (response.payload.docData.status) {
          enqueueSnackbar(`Expense Update successfully `, {
            variant: "success",
            autoHideDuration: 3000,
          });
          resetForm({ values: "" });
          await dispatch(getExpenses(userData?.email));
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
        const response = await dispatch(setExpense(values));

        if (response.payload.docData.status) {
          enqueueSnackbar(`Expense Created successfully `, {
            variant: "success",
            autoHideDuration: 3000,
          });
          resetForm({ values: "" });
          await dispatch(getExpenses(userData?.email));
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
          ...ModelButtonStyle,
          minWidth: "16px",
          color: "rgba(189,85,189,0.9)",
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
                  <Form onSubmit={handleSubmit}>
                    <TextfieldWrapper name='title' label='Title' size='small' />
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
                      renderInput={(params: any) => (
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

                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} lg={2}>
                        <InputLabel
                          htmlFor='bill-image'
                          className='m-auto flex w-fit text-center'
                          sx={{ mb: 2 }}
                        >
                          <Field
                            style={{ display: "none" }}
                            id='bill-image'
                            name='expense_file'
                            type='file'
                            value={undefined}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              if (e.target.files != null && e.target.files[0]) {
                                setFormValues((prev) => ({
                                  ...prev,
                                  expense_file: e.target.files![0],
                                }));
                                setFieldValue(
                                  "expense_file",
                                  e.target.files[0]
                                );
                              } else {
                                setFieldValue(
                                  e.target.name,
                                  Number(e.target.value)
                                );
                              }
                            }}
                            error={
                              Boolean(errors.expense_file) &&
                              Boolean(touched.expense_file)
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
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} lg={2}>
                        <SelectWrapper
                          name='currency_type'
                          options={currencyOptions}
                        />
                      </Grid>
                      <Grid item xs={10} sm={10} lg={10}>
                        <TextfieldWrapper
                          name='expense_amount'
                          label='Amoount'
                          type='number'
                          size='small'
                        />
                      </Grid>
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={[]}>
                        <DemoItem label='Expanse Date'>
                          <DatePicker
                            defaultValue={dayjs(today)}
                            slotProps={{ textField: { size: "small" } }}
                            maxDate={dayjs()}
                            onChange={(date) => {
                              const newDate = new Date(String(date));
                              setFieldValue(
                                "expense_date",
                                newDate.toISOString()
                              );
                            }}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>

                    <SelectWrapper
                      name='paid_by'
                      options={
                        paidByList != undefined
                          ? paidByList?.reduce((a, v) => ({ ...a, [v]: v }), {})
                          : []
                      }
                      defaultValue={updateExpanseData?.paid_by}
                      lable='Paid By'
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
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
