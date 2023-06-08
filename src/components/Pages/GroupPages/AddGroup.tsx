import React, { ChangeEvent, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getGroups, setData } from "../../../store/groupSlice";
import AddGroupImg from "./../../../assets/add_group.png";
import { Field, Form, Formik } from "formik";
import { AddGroupSchema } from "../Form/ValidationSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth";
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
  group_image: string;
}

const initalValues: formDataType = {
  name: "",
  group_image: "",
};

function AddGroup() {
  const [isModleOpen, setIsModleOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reader = new FileReader();
  const date = new Date();
  const [GroupProfileimage, setgroupProfileimage] = useState<string>("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleModleToggle = () => {
    if (!isModleOpen) {
      setgroupProfileimage("");
    }
    setIsModleOpen((prevState) => !prevState);
  };

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      reader.addEventListener("load", function (event) {
        setgroupProfileimage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("group_image", e.target.files[0]);
    }
  };

  const handleSubmit = async (values: formDataType) => {
    if (Object(values.group_image).length == undefined) {
      values.group_image = GroupProfileimage;
    } else {
      values.group_image = "";
    }

    const userData = await AuthService.getProfile();

    const createdAtTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const req_data = {
      ...values,
      admin_user_id: userData.uid,
      created_at: createdAtTime,
    };
    try {
      const dataId = await dispatch(setData(req_data));
      enqueueSnackbar(`Group Created successfully ${dataId.payload.docId}`, {
        variant: "success",
        autoHideDuration: 3000,
      });
      handleModleToggle();
      dispatch(getGroups());
      navigate(`/group`);
    } catch (error) {
      enqueueSnackbar(`Something Went Wrong`, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <Button onClick={handleModleToggle}>Create Group</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isModleOpen}
        // onClose={handleModleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModleOpen}>
          <Box sx={style}>
            <Typography
              id='transition-modal-title'
              variant='h5'
              sx={{ textAlign: "center", mb: 2 }}
              component='h2'
            >
              Create Group
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
                    className='m-auto flex w-fit text-center'
                    sx={{ mb: 2 }}
                  >
                    <Field
                      style={{ display: "none" }}
                      id='group-image'
                      name='group_image'
                      type='file'
                      value={undefined}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleFileInputChange(event, setFieldValue)
                      }
                    />

                    <Avatar
                      alt='Remy Sharp'
                      src={
                        GroupProfileimage
                          ? JSON.parse(GroupProfileimage)
                          : AddGroupImg
                      }
                      sx={{
                        width: 100,
                        height: 100,
                        borderWidth: 2,
                        borderColor: "primary",
                      }}
                    />
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
                      type='submit'
                      variant='contained'
                      disabled={!isValid}
                    >
                      Create Group
                    </Button>

                    <Button variant='contained' onClick={handleModleToggle}>
                      Cancle
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

export default AddGroup;
