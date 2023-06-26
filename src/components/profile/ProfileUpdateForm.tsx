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
import { GeneralPropType } from "../../routes/AuthRoutes";
import AddPerson from "./../../assets/add_user.png";
interface PropType extends GeneralPropType {}
interface initalValuesType {
  [key: string]: string | null;
}
function ProfileUpdateForm({ userData }: PropType) {
  const [ProfileData, setProfileData] = useState<User | null>();
  const reader = new FileReader();
  const [ProfileFile, setProfileFile] = useState("");
  const getUserData = async () => {
    const fauth: Auth = getAuth();
    setProfileData(fauth.currentUser);
    return fauth.currentUser;
  };
  const [initalValues, setInitalValues] = useState({
    photoURL: userData?.photoURL,
    displayName: userData?.displayName,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    city: "",
    state: "",
    country: "",
    description: "",
  });
  useEffect(() => {
    getUserData();
  }, []);
  console.log(userData);

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

  const handleSubmit = () => {};
  return (
    <>
      {ProfileData != null ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <div>
                <Typography variant="h4">Update Account</Typography>
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
                      <Card sx={{ textAlign: "left" }}>
                        <CardHeader
                          subheader="The information can be edited"
                          title="Profile"
                        />
                        <CardContent>
                          <Box>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={12} lg={12}>
                                <InputLabel
                                  htmlFor="profile-image"
                                  style={{
                                    margin: "auto",
                                    width: "fit-content",
                                    textAlign: "center",
                                  }}
                                  className="m-auto "
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
                                    id="profile-image"
                                    name="photoURL"
                                    type="file"
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
                                      Boolean(errors.photoURL) &&
                                      Boolean(touched.photoURL)
                                    }
                                    helperText={
                                      Boolean(touched.photoURL) &&
                                      errors.photoURL
                                    }
                                  />
                                </InputLabel>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  // helperText="Please specify the first name"
                                  label="Full Name"
                                  name="full_name"
                                  // onChange={handleChange}
                                  required
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  helperText="Please specify the first name"
                                  label="email"
                                  type="email"
                                  name="firstName"
                                  disabled
                                  value="asd@e.sdf"
                                  // onChange={handleChange}
                                  required
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  helperText="Please specify the first name"
                                  label="Phone No."
                                  name="firstName"
                                  // onChange={handleChange}
                                  required
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  helperText="Please specify the first name"
                                  label="City"
                                  name="firstName"
                                  // onChange={handleChange}
                                  required
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  helperText="Please specify the first name"
                                  label="State"
                                  name="firstName"
                                  // onChange={handleChange}
                                  required
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  helperText="Please specify the first name"
                                  label="Country"
                                  // onChange={handleChange}
                                  name="firstName"
                                  required
                                  // value={values.firstName}
                                />
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  helperText="Please specify the first name"
                                  label="Description"
                                  name="firstName"
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
                          <Button variant="contained">Update details</Button>
                        </CardActions>
                      </Card>
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
