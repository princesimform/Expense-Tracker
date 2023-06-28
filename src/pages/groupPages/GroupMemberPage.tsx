import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupDataType, updateData, getGroups } from "../../redux/groupSlice";
import { StyledTableCell, StyledTableRow } from "./GroupDetails";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { AppDispatch, Rootstate } from "../../redux/store";
import useToggle from "../../customHooks/useToggle";
import Loader from "../../components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";

interface PropType {
  groupMembers: string[];
  groupData: groupDataType;
}
interface formFieldType {
  new_member: string;
}

function GroupMemberPage({ groupMembers, groupData }: PropType) {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const dispatch = useDispatch<AppDispatch>();
  const [groupMembersList, setGroupMemberList] = useState<string[]>([]);
  const [toggles, toggle] = useToggle({
    processing: false,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const formFields: formFieldType = {
    new_member: "",
  };
  useEffect(() => {
    setGroupMemberList(groupData.member_list);
  }, []);
  const handleSubmit = async (values: formFieldType) => {
    toggle("processing");
    const reqData: groupDataType = JSON.parse(JSON.stringify(groupData));
    reqData.member_list = [...groupMembersList, values.new_member];

    const response = await dispatch(updateData(reqData));
    if (response.payload.status) {
      enqueueSnackbar(`Member Added successfully `, {
        variant: "success",
        autoHideDuration: 3000,
      });
      profile?.email && (await dispatch(getGroups(profile?.email)));
      setGroupMemberList((prev) => [...prev, values.new_member]);
      values.new_member = "";
      toggle("processing");
    } else {
      enqueueSnackbar(`Something Went Wrong `, {
        variant: "error",
        autoHideDuration: 3000,
      });
      toggle("processing");
    }
  };

  const DeleteMemberFromList = async (index: number) => {
    const reqData: groupDataType = JSON.parse(JSON.stringify(groupData));

    const new_member_list = groupMembersList.filter(
      (element) => element !== groupMembersList[index]
    );
    reqData.member_list = new_member_list;
    await dispatch(updateData(reqData));

    enqueueSnackbar(`Member Removed successfully `, {
      variant: "success",
      autoHideDuration: 3000,
    });
    profile?.email && (await dispatch(getGroups(profile?.email)));
    setGroupMemberList(new_member_list);
  };

  return (
    <>
      <Box>
        <Typography className='group-expense-heading' variant='h6'>
          Add Member
        </Typography>
        <Formik
          initialValues={formFields}
          validationSchema={yup.object({
            new_member: yup
              .string()
              .required("Email is required")
              .email("Enter valid email address")
              .test("unique", "Member already exists", function (value) {
                return !groupMembersList.includes(value);
              }),
          })}
          onSubmit={handleSubmit}
          validateOnMount
        >
          {({ handleSubmit, errors, isValid, touched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={9} lg={9}>
                  <Field
                    fullWidth
                    size='small'
                    name='new_member'
                    type='email'
                    as={TextField}
                    error={
                      Boolean(errors.new_member)
                        ? Boolean(touched.new_member)
                        : undefined
                    }
                    helperText={
                      Boolean(touched.new_member)
                        ? errors.new_member
                        : undefined
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3} lg={3}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
                  >
                    {toggles.processing ? "Processing" : "Add"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>

      <Paper sx={{ marginTop: 4 }}>
        {toggles.processing ? (
          <Box className='circular-progress-container' sx={{ height: 100 }}>
            <CircularProgress className='mt-2' color='secondary' />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography variant='h6' fontWeight='bold'>
                      Members
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupMembersList.length > 0 ? (
                  groupMembersList.map((member, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component='th' scope='row'>
                        <Stack
                          display='flex'
                          flexDirection='row'
                          justifyContent='space-between'
                        >
                          <Typography>{member}</Typography>

                          {profile?.email != member &&
                            profile?.email == groupData.admin && (
                              <Button
                                sx={{
                                  borderRadius: "16px",
                                  width: "32px",
                                  height: "32px",
                                }}
                                color='error'
                                variant='outlined'
                                size='small'
                                onClick={() => DeleteMemberFromList(index)}
                              >
                                <DeleteIcon color='error' />
                              </Button>
                            )}
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow key={"no data"}>
                    <StyledTableCell component='th' scope='row'>
                      <Stack
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                      >
                        <Typography>No Data Found</Typography>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </>
  );
}

export default GroupMemberPage;
