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
import { Field, Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ProfileUpdateFormSchema } from "../../libs/services/ValidationSchema";

function ProfileUpdateForm() {
  const [ProfileData, setProfileData] = useState<User | null>();
  const reader = new FileReader();
  const [ProfileImage, setProfileImage] = useState("");
  const getUserData = async () => {
    const fauth: Auth = getAuth();
    setProfileData(fauth.currentUser);
    return fauth.currentUser;
  };
  const initalValues = { profile_iamge: "" };
  useEffect(() => {
    getUserData();
  }, []);

  const handleFileInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      const res = await setFieldValue("group_image", e.target.files[0]);
      reader.addEventListener("load", function (event) {
        if (res.group_image == undefined)
          setProfileImage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("group_image", e.target.files[0]);
    }
  };

  const handleSubmit = () => {};
  return (
    <>
      {ProfileData != null ? (
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
                  validationSchema={ProfileUpdateFormSchema}
                  validateOnMount
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    errors,
                    isValid,
                    touched,
                    setFieldValue,
                  }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                          <InputLabel
                            htmlFor='group-image'
                            style={{
                              margin: "auto",
                              width: "fit-content",
                              textAlign: "center",
                            }}
                            className='m-auto '
                          >
                            <Avatar
                              src={"p"}
                              sx={{
                                height: 80,
                                mb: 2,
                                width: 80,
                                margin: "auto",
                              }}
                            />
                            <Field
                              style={{ opacity: 0 }}
                              id='group-image'
                              name='profile_iamge'
                              type='file'
                              value={undefined}
                              onChange={(
                                event: ChangeEvent<HTMLInputElement>
                              ) => handleFileInputChange(event, setFieldValue)}
                              error={
                                Boolean(errors.profile_iamge) &&
                                Boolean(touched.profile_iamge)
                              }
                              helperText={
                                Boolean(touched.profile_iamge) &&
                                errors.profile_iamge
                              }
                            />
                          </InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                          <Card sx={{ textAlign: "left" }}>
                            <CardHeader
                              subheader='The information can be edited'
                              title='Profile'
                            />
                            <CardContent>
                              <Box>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      helperText='Please specify the first name'
                                      label='First name'
                                      name='firstName'
                                      // onChange={handleChange}
                                      required
                                      // value={values.firstName}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ justifyContent: "flex-end" }}>
                              <Button variant='contained'>
                                Update details
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </div>
            </Stack>
          </Container>
        </Box>
      ) : (
        <Box>No Data Avaliable</Box>
      )}
    </>
  );
}

export default ProfileUpdateForm;
