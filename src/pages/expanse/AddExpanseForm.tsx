import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroups,
  groupDataType,
  setData,
  updateData,
} from "../../redux/groupSlice";
import AddGroupImg from "./../../assets/add_group.png";
import { Field, Form, Formik } from "formik";
import {
  AddExpenseFormSchema,
  AddGroupSchema,
} from "../../libs/services/ValidationSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AuthService from "../../libs/services/firebase/auth";
import useToggle from "../../customHooks/useToggle";
import { Rootstate } from "../../redux/store";
import { Assignment } from "@mui/icons-material";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  selectedFriends: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedFriends.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddExpenseForm({ FriendsList }: { FriendsList: string[] }) {
  const theme = useTheme();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  const [friendsSelectList, setFriendsSelectList] = useState<string[]>([]);
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
  });

  const [formValues, setFormValues] = useState({
    select_friends: "",
    expense_file: "",
    expense_description: "",
    expense_amount: 0,
    currency_type: "",
    paid_by: "",
  });

  function updateList() {
    let tempFriendsSelectList = [];
    tempFriendsSelectList[0] = "No Data";
    console.log(" i am Updating Your List");
    groupList.map((group) => {
      tempFriendsSelectList.unshift(group.name);
      group.member_list!.map((member) => {
        tempFriendsSelectList.push(member);
      });
    });
    FriendsList.map((firend) => {
      tempFriendsSelectList.push(firend);
    });
    tempFriendsSelectList = tempFriendsSelectList.filter(
      (val, id, tempFriendsSelectList) =>
        tempFriendsSelectList.indexOf(val) == id
    );
    setFriendsSelectList(tempFriendsSelectList);
  }

  useEffect(() => {
    updateList();
    console.log(" i am Updating");
  }, [toggles]);

  const buttonValue = "Create";

  const handleChange = (event: SelectChangeEvent<typeof selectedFriends>) => {
    const {
      target: { value },
    } = event;
    setSelectedFriends(typeof value === "string" ? value.split(",") : value);
  };

  const handlesubmit = (values: any) => {};
  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {};
  return (
    <>
      <Button onClick={() => toggle("isModleOpen")}>{buttonValue}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
              id="transition-modal-title"
              variant="h5"
              sx={{ textAlign: "center", mb: 2 }}
              component="h2"
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
                    <Autocomplete
                      multiple
                      id="select-friends"
                      options={friendsSelectList}
                      getOptionLabel={(friendsSelectList) => friendsSelectList}
                      renderInput={(params: any) => (
                        <Field
                          name="select_friends"
                          as={TextField}
                          {...params}
                          variant="standard"
                          sx={{ mb: 2 }}
                          label="With You And"
                          color="primary"
                          placeholder="Friend of Group"
                          error={
                            Boolean(errors.select_friends) &&
                            Boolean(touched.select_friends)
                          }
                          helperText={
                            Boolean(touched.select_friends) &&
                            errors.select_friends
                          }
                        />
                      )}
                      aria-required
                    />
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} lg={2}>
                        <InputLabel
                          htmlFor="bill-image"
                          className="m-auto flex w-fit text-center"
                          sx={{ mb: 2 }}
                        >
                          <Field
                            style={{ display: "none" }}
                            id="bill-image"
                            name="expense_file"
                            type="file"
                            value={undefined}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleFileInputChange(event, setFieldValue)
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
                          <Avatar sx={{ bgcolor: "primary" }}>
                            <Assignment />
                          </Avatar>
                          {/* <Avatar
                        alt="Remy Sharp"
                        // src={
                        //   GroupProfileimage
                        //     ? hasOldIamge
                        //       ? GroupProfileimage
                        //       : JSON.parse(GroupProfileimage)
                        //     : AddGroupImg
                        // }
                        sx={{
                          width: 100,
                          height: 100,
                          borderWidth: 2,
                          borderColor: "primary",
                        }}
                      /> */}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={10} sm={10} lg={10}>
                        <Field
                          name="expense_description"
                          type="text"
                          variant="outlined"
                          color="primary"
                          label="Description"
                          fullWidth
                          sx={{ mb: 2 }}
                          as={TextField}
                          size="small"
                          error={
                            Boolean(errors.expense_description) &&
                            Boolean(touched.expense_description)
                          }
                          helperText={
                            Boolean(touched.expense_description) &&
                            errors.expense_description
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} lg={2}>
                        <Field
                          as={Select}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                          name="currency_type"
                          size="small"
                          error={
                            Boolean(errors.currency_type) &&
                            Boolean(touched.currency_type)
                          }
                          helperText={
                            Boolean(touched.currency_type) &&
                            errors.currency_type
                          }
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={10} sm={10} lg={10}>
                        <Field
                          name="expense_amount"
                          type="number"
                          variant="outlined"
                          color="primary"
                          label="Amount"
                          fullWidth
                          sx={{ mb: 2 }}
                          as={TextField}
                          size="small"
                          error={
                            Boolean(errors.expense_amount) &&
                            Boolean(touched.expense_amount)
                          }
                          helperText={
                            Boolean(touched.expense_amount) &&
                            errors.expense_amount
                          }
                        />
                      </Grid>
                    </Grid>

                    <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="demo-simple-select-filled-label">
                        Paid by
                      </InputLabel>
                      <Field
                        as={Select}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Paid By"
                        name="paid_by"
                        size="small"
                        error={
                          Boolean(errors.paid_by) && Boolean(touched.paid_by)
                        }
                        helperText={Boolean(touched.paid_by) && errors.paid_by}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Field>
                    </FormControl>
                  </Form>
                )}
              </Formik>
              {/* <Autocomplete
                multiple
                id="select-friends"
                options={friendsSelectList}
                getOptionLabel={(friendsSelectList) => friendsSelectList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="With You And"
                    placeholder="Friend of Group"
                  />
                )}
              /> */}

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  onClick={() => toggle("isModleOpen")}
                >
                  Cancle
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  // disabled={!isValid}
                >
                  Create Expense
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AddExpenseForm;
