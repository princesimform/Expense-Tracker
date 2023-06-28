import { AssignmentIndOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { ForgotPasswordFormSchema } from "../../services/ValidationSchema";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handlesubmit = async (values: { email: string }) => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, values.email)
      .then((res) => {
        enqueueSnackbar("Link send to your email", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error && error.code && error.code == "auth/user-not-found") {
          enqueueSnackbar("User Not Found", {
            variant: "error",
            autoHideDuration: 3000,
          });
        }
      });
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {/* <LockOutlinedIcon /> */}
        <AssignmentIndOutlined />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Forgot Password
      </Typography>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={handlesubmit}
        validateOnMount
      >
        {({ errors, isValid, touched }) => (
          <Form>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name='email'
                    fullWidth
                    id='email'
                    label='Mail'
                    type='email'
                    error={
                      Boolean(errors.email) ? Boolean(touched.email) : undefined
                    }
                    helperText={
                      Boolean(touched.email) ? errors.email : undefined
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
              >
                Reset Password
              </Button>
              <Button
                onClick={() => navigate("/login")}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Go to Login Page
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ResetPassword;
