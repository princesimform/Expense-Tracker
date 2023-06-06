import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Link,
  Box,
  Slide,
  Collapse,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
import { User } from "@firebase/auth";
interface PropType {
  toggleSignUp: Function;
}
interface formField {
  [key: string]: { value: string };
}
function LoginForm({ toggleSignUp }: PropType) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const [form, setForm] = useState<formField>({
    email: { value: "" },
    password: { value: "" },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let _form: formField = { ...form };
    _form[e.currentTarget.name].value = e.currentTarget.value;
    setForm(_form);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.email.value && form.password.value) {
      setProcessing(true);

      try {
        if (typeof AuthService.login != "boolean") {
          let data: { status: boolean; message: string } =
            await AuthService.login(form.email.value, form.password.value);
          if (data.status) {
            setProcessing(false);
            navigate(`/dashboard`);
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
          } else {
            setProcessing(false);
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
          setProcessing(false);
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
    <>
      <Box className='w-100 sm:mx-0 md:m-auto pr-[1rem] md:mx-[4rem] '>
        <Box>
          <p className=' text-3xl mb-5  text-left font-medium'>Sign In</p>
        </Box>
        <form className='mt-12' onSubmit={submitForm}>
          <TextField
            fullWidth
            id='outlined-basic'
            margin='dense'
            label='Email Address'
            variant='outlined'
            name='email'
            autoFocus
            onChange={handleChange}
          />
          <Box className='my-5'></Box>
          <TextField
            fullWidth
            margin='dense'
            id='outlined-basic'
            label='Password'
            name='password'
            variant='outlined'
            type={passwordVisibility ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    tabIndex={-1}
                    onClick={(e) => setPasswordVisibility(!passwordVisibility)}
                  >
                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />

          <Box className='grid  md:flex md:flex-row-reverse my-5 md:justify-between'>
            <Button
              type='submit'
              variant='contained'
              sx={{ color: "white", padding: "0.4rem 2rem" }}
              disabled={processing}
            >
              {processing ? "Processing..." : "Sign In"}
            </Button>
            <Box className='my-5 md:my-auto '>
              <Link
                underline='none'
                className='text-center md:text-left '
                sx={{ margin: "auto 0" }}
              >
                Forgot Password?
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
      <Box
        onClick={() => toggleSignUp()}
        className='bg-primary bg-opacity-10 border-primary border-opacity-30 border-2 rounded-md mt-[0] md:mx-[4rem] mr-[1rem] mb-[1rem] md:mb-[4rem] p-4 cursor-pointer text-primary text-sm md:text-base'
      >
        Don't Have an Account ?<span className='font-bold'> Sign Up</span>
      </Box>
    </>
  );
}

export default LoginForm;
