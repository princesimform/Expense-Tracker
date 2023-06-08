import React, { ChangeEvent, FormEvent, useState } from "react";
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
import AuthService from "../Services/auth";
import useToggle from "../CustomHooks/useToggle";
import { Field, Form, Formik } from "formik";
import { RegistrationFormSchema } from "../Services/ValidationSchema";
import AddUserImg from "./../../assets/add_user.png";

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
      console.log(values);
      
      toggle("processing");
      if (Object(values.profile).length == undefined) {
        values.profile = GroupProfileimage;
      } else {
        values.profile = "";
      }
      try {
        if (typeof AuthService.register != "boolean") {
          console.log(values.profile);
          
          let data: { status: boolean; message: string } =
            await AuthService.register(
              values.full_name,
              values.email,
              values.password,
              values.profile
            );
          if (data.status) {
            toggle("processing");
            navigate(`/dashboard`);
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
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
      <Box className='text-left font-bold'></Box>
      <Box className='w-100 sm:mx-0 mb-5 md:m-auto pr-[1rem] md:mx-[4rem] '>
        <Box className='flex justify-between flex-row'>
          <p className='my-auto text-3xl   text-left font-medium '>Sign Up</p>
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
                className='m-auto flex w-fit text-center'
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
                id='outlined-basic'
                margin='dense'
                label='Full Name'
                type='text'
                variant='outlined'
                name='full_name'
                autoFocus
                as={TextField}
                error={Boolean(errors.full_name) && Boolean(touched.full_name)}
                helperText={Boolean(touched.full_name) && errors.full_name}
              />
              <Field
                fullWidth
                id='outlined-basic'
                margin='dense'
                label='Email Address'
                type='email'
                variant='outlined'
                name='email'
                autoFocus
                as={TextField}
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
              />
              <Field
                fullWidth
                margin='dense'
                id='outlined-basic'
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
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
              />
              <Field
                fullWidth
                margin='dense'
                id='outlined-basic'
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
                helperText={
                  Boolean(touched.confirm_password) && errors.confirm_password
                }
              />
              <Box className='grid  md:flex md:flex-row-reverse my-5 md:justify-between'>
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

      <Box
        onClick={() => toggleSignUp()}
        className='bg-primary bg-opacity-10 border-primary border-opacity-30 border-2 rounded-md mt-[0] md:mx-[4rem] mr-[1rem] mb-[1rem] md:mb-[4rem] p-4 cursor-pointer text-primary text-sm md:text-base'
      >
        Already have an account <span className='font-bold'> Sign In</span>
      </Box>
    </>
  );
}

export default RegisterForm;
