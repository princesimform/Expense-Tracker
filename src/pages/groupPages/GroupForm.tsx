import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
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
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddGroupSchema } from "../../services/ValidationSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useToggle from "../../customHooks/useToggle";
import EditIcon from "@mui/icons-material/Edit";
import { GetTimestemp, setFileinFirebase } from "../../services/utills";
import { AppDispatch, Rootstate } from "../../redux/store";

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
interface formDataType {
  name: string;
  group_image: File | "";
}
interface PropsType {
  groupData?: groupDataType;
  ModelButtonStyle: {
    [key: string]: string;
  };
}

function GroupForm({ groupData, ModelButtonStyle }: PropsType) {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const reader = new FileReader();
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
    processing: false,
  });
  const buttonValue = groupData ? "Update" : "Create";
  const [GroupProfileimage, setgroupProfileimage] = useState<string>("");
  const [initalValues, setInitalValues] = useState<formDataType>({
    name: "",
    group_image: "",
  });

  useEffect(() => {
    if (groupData) {
      setInitalValues({
        name: groupData.name,
        group_image: "",
      }),
        setgroupProfileimage(groupData.group_image);
    }
  }, []);
  const handleFileInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      const res = await setFieldValue("group_image", e.target.files[0]);
      reader.addEventListener("load", function (event) {
        if (res.group_image == undefined)
          setgroupProfileimage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("group_image", e.target.files[0]);
    }
  };
  const handleSubmit = async (values: formDataType) => {
    toggle("processing");
    if (groupData) {
      handleUpdateSubmit(values);
    } else {
      handleAddSubmit(values);
    }
  };
  const handleAddSubmit = async (values: formDataType) => {
    if (profile != undefined) {
      const req_data: groupDataType = {
        id: "",
        name: values.name,
        group_image: "",
        admin_user_id: profile.u_id,
        admin: profile?.email,
        created_at: GetTimestemp(),
        deleted_at: "",
        member_list: [`${profile?.email}`],
      };
      if (values.group_image != "") {
        const fileUrl = await setFileinFirebase(
          values.group_image,
          "group_images",
          `${profile?.u_id + values.name}`
        );
        req_data.group_image = fileUrl;
      }
      try {
        const dataId = await dispatch(setData(req_data));
        if (dataId.payload.status) {
          enqueueSnackbar(dataId.payload.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
          toggle("processing");
          toggle("isModleOpen");
          profile?.email && dispatch(getGroups(profile?.email));
          navigate(`/group`);
        } else {
          enqueueSnackbar(dataId.payload.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      } catch (error) {
        enqueueSnackbar(`Something Went Wrong`, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };
  const handleUpdateSubmit = async (values: formDataType) => {
    const NewData = JSON.parse(JSON.stringify(groupData));
    NewData.name = values.name;
    NewData.group_image = values.group_image;
    if (values.group_image != "") {
      const fileUrl = await setFileinFirebase(
        values.group_image,
        "group_images",
        `${profile?.u_id + values.name}`
      );
      NewData.group_image = fileUrl;
    }
    try {
      const response = await dispatch(updateData(NewData));
      if (response.payload.status) {
        enqueueSnackbar(response.payload.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        profile?.email && dispatch(getGroups(profile?.email));
      } else {
        enqueueSnackbar(response.payload.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
      }
      toggle("processing");
      toggle("isModleOpen");
    } catch (error) {
      enqueueSnackbar(`Group Updated successfully `, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <Button
        sx={{
          color: "rgba(189,85,189,0.9)",
          minWidth: "16px",
          ...ModelButtonStyle,
        }}
        variant='outlined'
        color='secondary'
        size='small'
        onClick={() => toggle("isModleOpen")}
      >
        {groupData ? <EditIcon /> : <AddIcon />}
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={toggles.isModleOpen}
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
              {groupData ? "Update Group" : "Create Group"}
            </Typography>

            <Formik
              initialValues={initalValues}
              onSubmit={handleSubmit}
              validationSchema={AddGroupSchema}
              validateOnMount
            >
              {({ handleSubmit, errors, isValid, touched, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <InputLabel
                    htmlFor='group-image'
                    style={{
                      margin: "auto",
                      width: "fit-content",
                      textAlign: "center",
                    }}
                    className='m-auto flex w-fit text-center'
                    sx={{ mb: 2 }}
                  >
                    <Field
                      style={{ opacity: 0 }}
                      id='group-image'
                      name='group_image'
                      type='file'
                      value={undefined}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleFileInputChange(event, setFieldValue)
                      }
                      error={
                        Boolean(errors.group_image)
                          ? Boolean(touched.group_image)
                          : undefined
                      }
                      helperText={
                        Boolean(touched.group_image)
                          ? errors.group_image?.toString()
                          : undefined
                      }
                    />
                    <Avatar
                      alt='Remy Sharp'
                      src={
                        GroupProfileimage
                          ? GroupProfileimage.slice(0, 4) == "http"
                            ? GroupProfileimage
                            : JSON.parse(GroupProfileimage)
                          : AddGroupImg
                      }
                      sx={{
                        width: 100,
                        height: 100,
                        borderWidth: 2,
                        borderColor: "primary",
                        margin: "0 auto 2rem auto ",
                      }}
                    />
                    <ErrorMessage name='group_image' component='p' />
                  </InputLabel>
                  <Field
                    name='name'
                    type='text'
                    variant='outlined'
                    color='primary'
                    label='Full Name'
                    fullWidth
                    sx={{ mb: 2 }}
                    as={TextField}
                    error={
                      Boolean(errors.name) ? Boolean(touched.name) : undefined
                    }
                    helperText={Boolean(touched.name) ? errors.name : undefined}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
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
                      disabled={!isValid}
                    >
                      {groupData
                        ? toggles.processing
                          ? "Processing ..."
                          : buttonValue
                        : toggles.processing
                        ? "Processing ..."
                        : "Create Group"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default GroupForm;
