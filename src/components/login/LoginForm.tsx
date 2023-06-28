import React, { FormEvent } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../../customHooks/useToggle";
import AuthService from "../../services/firebase/auth";
import { LoginFormSchema } from "../../services/ValidationSchema";
import Styles from "./../../style/Authform.module.css";
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
      <Box className={Styles.LoginMainContainer}>
        <Box>
          <p className={Styles.LoginContainerTitle}>Sign In</p>
        </Box>
        <Formik
          initialValues={formField}
          onSubmit={handleSubmit}
          validationSchema={LoginFormSchema}
          validateOnMount
        >
          {({ handleSubmit, errors, isValid, touched }) => (
            <Form onSubmit={handleSubmit} className={Styles.LoginForm}>
              <Field
                fullWidth
                margin='dense'
                label='Email Address'
                variant='outlined'
                name='email'
                autoFocus
                type='email'
                color='primary'
                as={TextField}
                error={
                  Boolean(errors.email) ? Boolean(touched.email) : undefined
                }
                helpertext={Boolean(touched.email) ? errors.email : undefined}
              />
              <Box className={Styles.LoginFormSpace}></Box>

              <Field
                fullWidth
                margin='dense'
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
                error={
                  Boolean(errors.password)
                    ? Boolean(touched.password)
                    : undefined
                }
                helpertext={
                  Boolean(touched.password) ? errors.password : undefined
                }
              />
              <Box className={Styles.LoginBtn}>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ color: "white", padding: "0.4rem 2rem" }}
                  disabled={toggles.processing}
                >
                  {toggles.processing ? "Processing..." : "Sign In"}
                </Button>
                <Box className={Styles.forgetPasswordBtn}>
                  <Link
                    to='/reset-password'
                    className={Styles.forgetPasswordBtnLink}
                    // sx={{ margin: "auto 0" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>

      <Box onClick={() => toggleSignUp()} className={Styles.toggleForm}>
        Don't Have an Account ?<span> Sign Up</span>
      </Box>
    </div>
  );
}

export default LoginForm;
