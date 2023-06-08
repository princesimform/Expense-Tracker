import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useToggle from "../CustomHooks/useToggle";
import AuthService from "../Services/auth";
import { LoginFormSchema } from "../Services/ValidationSchema";

interface PropType {
  toggleSignUp: Function;
}

interface formFieldType {
  [key: string]: string;
}
const formField: formFieldType = {
  email: "",
  password: "",
};

function LoginForm({ toggleSignUp }: PropType) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [toggles, toggle] = useToggle({
    passwordVisibility: false,
    processing: false,
  });
  const handleSubmit = async (values: formFieldType) => {
    if (values.email && values.password) {
      toggle("processing");

      try {
        if (typeof AuthService.login != "boolean") {
          let data: { status: boolean; message: string } =
            await AuthService.login(values.email, values.password);
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
        if (e instanceof Error) {
          enqueueSnackbar(e.message, {
            variant: "error",
            autoHideDuration: 3000,
          });
          toggle("processing");
        }
      }
    } else {
      enqueueSnackbar("All fields are required.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <div>
      <Box className='w-100 sm:mx-0 md:m-auto pr-[1rem] md:mx-[4rem] '>
        <Box>
          <p className=' text-3xl mb-5  text-left font-medium'>Sign In</p>
        </Box>
        <Formik
          initialValues={formField}
          onSubmit={handleSubmit}
          validationSchema={LoginFormSchema}
          validateOnMount
        >
          {({ handleSubmit, errors, isValid, touched }) => (
            <Form onSubmit={handleSubmit} className='mt-12'>
              <Field
                fullWidth
                id='outlined-basic'
                margin='dense'
                label='Email Address'
                variant='outlined'
                name='email'
                autoFocus
                type='email'
                color='primary'
                as={TextField}
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
              />
              <Box className='my-5'></Box>

              <Field
                fullWidth
                margin='dense'
                id='outlined-basic'
                label='Password'
                name='password'
                as={TextField}
                variant='outlined'
                type={toggles.passwordVisibility ? "text" : "password"}
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
              <Box className='grid  md:flex md:flex-row-reverse my-5 md:justify-between'>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ color: "white", padding: "0.4rem 2rem" }}
                  disabled={toggles.processing}
                >
                  {toggles.processing ? "Processing..." : "Sign In"}
                </Button>
                <Box className='my-5 md:my-auto '>
                  {/* <Link
                underline='none'
                className='text-center md:text-left '
                sx={{ margin: "auto 0" }}
              >
                Forgot Password?
              </Link> */}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        onClick={() => toggleSignUp()}
        className='bg-primary bg-opacity-10 border-primary border-opacity-30 border-2 rounded-md mt-[0] md:mx-[4rem] mr-[1rem] mb-[1rem] md:mb-[4rem] p-4 cursor-pointer text-primary text-sm md:text-base'
      >
        Don't Have an Account ?<span className='font-bold'> Sign Up</span>
      </Box>
    </div>
  );
}

export default LoginForm;
