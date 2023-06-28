import React, { ChangeEvent, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AuthService from "../../services/firebase/auth";
import useToggle from "../../customHooks/useToggle";
import { Field, Form, Formik } from "formik";
import { RegistrationFormSchema } from "../../services/ValidationSchema";
import AddUserImg from "./../../assets/add_user.png";
import Styles from "./../../style/Authform.module.css";
import { Auth, getAuth } from "firebase/auth";
import {
  getProfile,
  profileDataType,
  setProfile,
} from "../../redux/profileSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface PropType {
  toggleSignUp: Function;
}
interface formFieldType {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  profile: string;
}

const formFields: formFieldType = {
  full_name: "",
  email: "",
  password: "",
  confirm_password: "",
  profile: "",
};

function RegisterForm({ toggleSignUp }: PropType) {
  const navigate = useNavigate();
  const reader = new FileReader();
  const dispatch = useDispatch<AppDispatch>();
  const [GroupProfileimage, setgroupProfileimage] = useState<string>("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [toggles, toggle] = useToggle({
    passwordVisibility: false,
    confirmPasswordVisibility: false,
    processing: false,
  });
  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      reader.addEventListener("load", function (event) {
        setgroupProfileimage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("profile", e.target.files[0]);
    }
  };

  const handleSubmit = async (values: formFieldType) => {
    if (values.email && values.password) {
      toggle("processing");

      try {
        if (typeof AuthService.register != "boolean") {
          const reqData = [];
          let data: { status: boolean; message: string } =
            await AuthService.register(
              values.full_name,
              values.email,
              values.password,
              values.profile
            );
          if (data.status) {
            const fauth: Auth = getAuth();

            const profileData: profileDataType = {
              displayName: String(fauth.currentUser?.displayName),
              photoURL: String(fauth.currentUser?.photoURL),
              u_id: String(fauth.currentUser?.uid),
              email: String(fauth.currentUser?.email),
              phoneNumber: String(
                fauth.currentUser?.phoneNumber != null
                  ? fauth.currentUser?.phoneNumber
                  : ""
              ),
              city: "",
              state: "",
              country: "",
              description: "",
            };
            const response = await dispatch(setProfile(profileData));
            if (response.payload.status) {
              toggle("processing");
              navigate(`/dashboard`);
              enqueueSnackbar(data.message, {
                variant: "success",
                autoHideDuration: 3000,
              });
            }
          } else {
            toggle("processing");
            enqueueSnackbar(data.message, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
        }
      } catch (e) {
        toggle("processing");
        enqueueSnackbar("Something went wrong.", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } else {
      enqueueSnackbar("All fields are required.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <>
      <Box className={Styles.RegistrationContainerMain}>
        <Box className={Styles.RegistrationTitleContainer}>
          <p>Sign Up</p>
        </Box>
        <Formik
          initialValues={formFields}
          validationSchema={RegistrationFormSchema}
          validateOnMount
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, errors, isValid, touched, setFieldValue }) => (
            <Form className='mt-12' onSubmit={handleSubmit}>
              <InputLabel
                htmlFor='profile'
                className={Styles.ProfileAvatar}
                sx={{ mb: 2 }}
              >
                <Field
                  style={{ display: "none" }}
                  id='profile'
                  name='profile'
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
                      : AddUserImg
                  }
                  sx={{
                    width: 100,
                    height: 100,
                    borderWidth: 2,
                    borderColor: "primary",
                    backgroundColor: "primary",
                  }}
                />
              </InputLabel>

              <Field
                fullWidth
                margin='dense'
                label='Full Name'
                type='text'
                variant='outlined'
                name='full_name'
                autoFocus
                as={TextField}
                error={
                  Boolean(errors.full_name)
                    ? Boolean(touched.full_name)
                    : undefined
                }
                helpertext={
                  Boolean(touched.full_name) ? errors.full_name : undefined
                }
              />
              <Field
                fullWidth
                margin='dense'
                label='Email Address'
                type='email'
                variant='outlined'
                name='email'
                as={TextField}
                error={
                  Boolean(errors.email) ? Boolean(touched.email) : undefined
                }
                helpertext={Boolean(touched.email) ? errors.email : undefined}
              />
              <Field
                fullWidth
                margin='dense'
                name='password'
                label='Password'
                variant='outlined'
                type={toggles.passwordVisibility ? "text" : "password"}
                as={TextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        tabIndex={-1}
                        onClick={(e) => toggle("passwordVisibility")}
                      >
                        {toggles.passwordVisibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={
                  Boolean(errors.password)
                    ? Boolean(touched.password)
                    : undefined
                }
                helpertext={
                  Boolean(touched.password) ? errors.password : undefined
                }
              />
              <Field
                fullWidth
                margin='dense'
                name='confirm_password'
                label='Confirm Password'
                variant='outlined'
                type={toggles.confirmPasswordVisibility ? "text" : "password"}
                as={TextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        tabIndex={-1}
                        onClick={(e) => toggle("confirmPasswordVisibility")}
                      >
                        {toggles.confirmPasswordVisibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={
                  Boolean(errors.confirm_password) &&
                  Boolean(touched.confirm_password)
                }
                helpertext={
                  Boolean(touched.confirm_password) && errors.confirm_password
                }
              />
              <Box className={Styles.SignUpBtn}>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ color: "white", padding: "0.4rem 2rem" }}
                  disabled={toggles.processing}
                >
                  {toggles.processing ? "Processing..." : "Get Started"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Box onClick={() => toggleSignUp()} className={Styles.toggleForm}>
        Already have an account <span> Sign In</span>
      </Box>
    </>
  );
}

export default RegisterForm;
