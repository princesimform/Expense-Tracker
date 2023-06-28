import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Auth, getAuth, User } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFileinFirebase } from "../../services/utills";
import { ProfileUpdateFormSchema } from "../../services/ValidationSchema";
import {
  getProfile,
  profileDataType,
  setProfile,
  updateProfile,
} from "../../redux/profileSlice";
import { AppDispatch, Rootstate } from "../../redux/store";
import Loader from "../Loader";
import AddPerson from "./../../assets/add_user.png";

function ProfileUpdateForm() {
  const ProfileData = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const reader = new FileReader();
  const [ProfileFile, setProfileFile] = useState<string | null>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [initalValues, setInitalValues] = useState<profileDataType>(
    ProfileData.profile!
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    setProfileFile(
      ProfileData.profile != undefined ? ProfileData.profile.photoURL : ""
    );
  }, [ProfileData]);

  const handleFileInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      const res = await setFieldValue("photoURL", e.target.files[0]);
      reader.addEventListener("load", function (event) {
        if (res.photoURL == undefined)
          setProfileFile(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: profileDataType) => {
    setIsProcessing(true);
    if (typeof values.photoURL != "string") {
      const fileUrl = await setFileinFirebase(
        values.photoURL,
        "profile",
        values.u_id
      );
      values.photoURL = fileUrl;
    }

    try {
      const response = await dispatch(updateProfile(values));
      if (response.payload.status) {
        await dispatch(getProfile(values.u_id));
        enqueueSnackbar(response.payload.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/profile");
        setIsProcessing(false);
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setIsProcessing(false);
    }
  };

  if (ProfileData.profile != null)
    return (
      <>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth='lg'>
            <Stack spacing={3}>
              <div>
                <Typography variant='h4'>Update Account</Typography>
              </div>
              <div>
                <Formik
                  initialValues={initalValues}
                  onSubmit={handleSubmit}
                  validationSchema={ProfileUpdateFormSchema}
                  validateOnMount
                >
                  {({
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                    isValid,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Card sx={{ textAlign: "left" }}>
                        <CardHeader
                          subheader='The information can be edited'
                          title='Profile'
                        />
                        <CardContent>
                          <Box>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={12} lg={12}>
                                <InputLabel
                                  htmlFor='profile-image'
                                  style={{
                                    margin: "auto",
                                    width: "fit-content",
                                    textAlign: "center",
                                  }}
                                  className='m-auto '
                                >
                                  <Avatar
                                    src={
                                      ProfileFile
                                        ? ProfileFile.slice(0, 4) == "http"
                                          ? ProfileFile
                                          : JSON.parse(ProfileFile)
                                        : AddPerson
                                    }
                                    sx={{
                                      height: 80,
                                      mb: 2,
                                      width: 80,
                                      margin: "auto",
                                    }}
                                  />
                                  <Field
                                    style={{ opacity: 0 }}
                                    id='profile-image'
                                    name='photoURL'
                                    type='file'
                                    value={undefined}
                                    onChange={(
                                      event: ChangeEvent<HTMLInputElement>
                                    ) =>
                                      handleFileInputChange(
                                        event,
                                        setFieldValue
                                      )
                                    }
                                    error={
                                      Boolean(errors.photoURL)
                                        ? Boolean(touched.photoURL)
                                        : undefined
                                    }
                                    helpertext={
                                      Boolean(touched.photoURL)
                                        ? errors.photoURL?.toString()
                                        : undefined
                                    }
                                  />
                                  <ErrorMessage name='photoURL' component='p' />
                                </InputLabel>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  name='displayName'
                                  type='text'
                                  variant='outlined'
                                  color='primary'
                                  label='Full Name'
                                  size='small'
                                  fullWidth
                                  sx={{ mb: 2 }}
                                  as={TextField}
                                  error={
                                    Boolean(errors.displayName)
                                      ? Boolean(touched.displayName)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.displayName)
                                      ? errors.displayName
                                      : undefined
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  fullWidth
                                  as={TextField}
                                  size='small'
                                  label='email'
                                  type='email'
                                  name='email'
                                  disabled
                                  error={
                                    Boolean(errors.email)
                                      ? Boolean(touched.email)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.email)
                                      ? errors.email
                                      : undefined
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  size='small'
                                  label='Phone No.'
                                  name='phoneNumber'
                                  // onChange={handleChange}
                                  required
                                  // value={values.firstName}
                                  error={
                                    Boolean(errors.phoneNumber)
                                      ? Boolean(touched.phoneNumber)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.phoneNumber)
                                      ? errors.phoneNumber
                                      : undefined
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  size='small'
                                  label='City'
                                  name='city'
                                  // onChange={handleChange}
                                  required
                                  error={
                                    Boolean(errors.city)
                                      ? Boolean(touched.city)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.city)
                                      ? errors.city
                                      : undefined
                                  }
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  size='small'
                                  label='State'
                                  name='state'
                                  // onChange={handleChange}
                                  required
                                  error={
                                    Boolean(errors.state)
                                      ? Boolean(touched.state)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.state)
                                      ? errors.state
                                      : undefined
                                  }
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  size='small'
                                  label='Country'
                                  // onChange={handleChange}
                                  name='country'
                                  required
                                  error={
                                    Boolean(errors.country)
                                      ? Boolean(touched.country)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.country)
                                      ? errors.country
                                      : undefined
                                  }
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  size='small'
                                  label='Description'
                                  name='description'
                                  // onChange={handleChange}
                                  required
                                  error={
                                    Boolean(errors.description)
                                      ? Boolean(touched.description)
                                      : undefined
                                  }
                                  helpertext={
                                    Boolean(touched.description)
                                      ? errors.description
                                      : undefined
                                  }
                                  // value={values.firstName}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                          <Button
                            type='submit'
                            variant='contained'
                            disabled={!isValid || isProcessing}
                          >
                            {isProcessing ? "Processing" : "Update details"}
                          </Button>
                        </CardActions>
                      </Card>
                    </Form>
                  )}
                </Formik>
              </div>
            </Stack>
          </Container>
        </Box>
      </>
    );
  else
    return (
      <>
        <Loader />
      </>
    );
}

export default ProfileUpdateForm;
