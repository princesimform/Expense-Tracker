import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderGroupParams,
  Avatar,
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

import { Field, FieldProps, Form, Formik } from "formik";
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
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type ListOptionType = {
  label: string;
  value: string;
  group: string;
};

interface FormDataType {
  select_friends: string[] | null;
  expense_file: File | null;
  expense_description: string;
  expense_amount: number;
  currency_type: string;
  paid_by: string;
  expense_date: Date | null;
}

interface PropType extends GeneralPropType {
  FriendsList: string[];
}
function AddExpenseForm({ FriendsList, userData }: PropType) {
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  const [paidByList, setPaidByList] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormDataType>({
    select_friends: null,
    expense_file: null,
    expense_description: "",
    expense_amount: 0,
    currency_type: "",
    paid_by: "",
    expense_date: null,
  });
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const currentDate = year + "/" + mm + "/" + dd;
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
  });
  const [listOptions, setListOptions] = useState<ListOptionType[]>([]);
  let tempFriendsSelectList: ListOptionType[] = [];
  let tempGroupsList: string[] = [];
  let tempFriendsList: string[] = [];
  const buttonValue = "Create";
  const reader = new FileReader();

  const renderGroup = (params: AutocompleteRenderGroupParams) => [
    <li key={params.key} style={{ marginLeft: "10px" }}>
      <GroupHeader>{params.group}</GroupHeader>
      <GroupItems>{params.children}</GroupItems>
    </li>,
    ,
  ];

  function updateListOptions() {
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
  }

  useEffect(() => {
    updateListOptions();
  }, [toggles]);

  const onSelectListOptions = async (
    e: SyntheticEvent<Element, Event>,
    value: ListOptionType[],
    reason: AutocompleteChangeReason,
    setFieldValue: Function,
    details?: AutocompleteChangeDetails<ListOptionType>
  ) => {
    const selectedFriends = await updatePaidByList(value);
    setFieldValue("select_friends", selectedFriends);
  };

  const updatePaidByList = async (ListData: ListOptionType[]) => {
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

    userData?.email &&
      tempFriendsList.indexOf(userData?.email) >= 0 &&
      tempFriendsList.splice(tempFriendsList.indexOf(userData?.email), 1);
    setPaidByList(tempFriendsList);

    return tempFriendsList;
  };
  const handlesubmit = (values: FormDataType) => {
    console.log(values);
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files != null && e.target.files[0]) {
      setFormValues((perv) => ({ ...perv, expense_file: e.target.files![0] }));
      setFieldValue("expense_file", e.target.files[0]);
    } else {
      setFieldValue(e.target.name, Number(e.target.value));
    }
  };

  return (
    <>
      <Button onClick={() => toggle("isModleOpen")}>{buttonValue}</Button>
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
          <Box sx={style}>
            <Typography
              id='transition-modal-title'
              variant='h5'
              sx={{ textAlign: "center", mb: 2 }}
              component='h2'
            >
              Create Expanse
            </Typography>
            <Box>
              <Formik
                initialValues={formValues}
                validationSchema={AddExpenseFormSchema}
                validateOnMount
                onSubmit={handlesubmit}
              >
                {({
                  handleSubmit,
                  errors,
                  isValid,
                  touched,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit}>
                   
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
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(event, setFieldValue)
                            }
                            error={
                              Boolean(errors.expense_file) &&
                              Boolean(touched.expense_file)
                            }
                            helperText={
                              Boolean(touched.expense_file) &&
                              errors.expense_file
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
                            <TextfieldWrapper name="expense_description" size="small" />
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant='contained'
                        onClick={() => toggle("isModleOpen")}
                      >
                        Cancle
                      </Button>
                      <Button
                        type='submit'
                        variant='contained'
                        disabled={!isValid}
                      >
                        Create Expense
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
