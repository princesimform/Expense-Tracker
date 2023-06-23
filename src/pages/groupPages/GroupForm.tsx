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
import { useDispatch } from "react-redux";
import {
  getGroups,
  groupDataType,
  setData,
  updateData,
} from "../../redux/groupSlice";
import AddGroupImg from "./../../assets/add_group.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddGroupSchema } from "../../libs/services/ValidationSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AuthService from "../../libs/services/firebase/auth";
import useToggle from "../../customHooks/useToggle";
import { GeneralPropType } from "../../routes/AuthRoutes";
import EditIcon from "@mui/icons-material/Edit";
import FirebaseFileHandling from "../../libs/services/firebase/fileHandling";
import { createdAtTime, setFileinFilebase } from "../../libs/services/utills";
import { AppDispatch } from "../../redux/store";
import { string } from "yup";
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
  group_image: File | null;
}
interface PropsType extends GeneralPropType {
  groupData?: groupDataType;
  ModelButtonStyle: {
    [key: string]: string;
  };
}

function GroupForm({ groupData, userData, ModelButtonStyle }: PropsType) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const reader = new FileReader();
  const date = new Date();
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
    processing: false,
  });
  const buttonValue = groupData ? "Update" : "Create";
  const [GroupProfileimage, setgroupProfileimage] = useState<string>("");
  const [initalValues, setInitalValues] = useState<formDataType>({
    name: "",
    group_image: null,
  });

  useEffect(() => {
    if (groupData) {
      setInitalValues({
        name: groupData.name,
        group_image: null,
      }),
        setgroupProfileimage(groupData.group_image);
      // initalValues.group_image = groupData.group_image;
    }
  }, []);
  const handleFileInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      const res = await setFieldValue("group_image", e.target.files[0]);
      reader.addEventListener("load", function (event) {
        console.log(res.group_image);
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
    if (userData != undefined) {
      const req_data: groupDataType = {
        id: "",
        name: values.name,
        group_image: "",
        admin_user_id: userData?.uid,
        admin_user_name: userData?.displayName,
        created_at: createdAtTime(),
        member_list: [`${userData?.email}`],
      };
      if (values.group_image != null) {
        const fileUrl = await setFileinFilebase(
          values.group_image,
          "group_images",
          `${userData?.uid + values.name}`
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
          userData?.email && dispatch(getGroups(userData?.email));
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
    if (values.group_image != null) {
      const fileUrl = await setFileinFilebase(
        values.group_image,
        "group_images",
        `${userData?.uid + values.name}`
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
        toggle("isModleOpen");
        userData?.email && dispatch(getGroups(userData?.email));
      } else {
        enqueueSnackbar(response.payload.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        toggle("isModleOpen");
      }
      console.log(response.payload);
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
                      display: "play",
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
                        Boolean(errors.group_image) &&
                        Boolean(touched.group_image)
                      }
                      helperText={
                        Boolean(touched.group_image) && errors.group_image
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
                        margin: "auto",
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
                    error={Boolean(errors.name) && Boolean(touched.name)}
                    helperText={Boolean(touched.name) && errors.name}
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
