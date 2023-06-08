import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AuthService from "../Services/auth";
import useToggle from "../CustomHooks/useToggle";

interface PropType {
  toggleSignUp: Function;
}

interface formField {
  [key: string]: { value: string };
}

function RegisterForm({ toggleSignUp }: PropType) {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [toggles, toggle] = useToggle({
    passwordVisibility: false,
    processing: false,
  });
  const [form, setForm] = useState<formField>({
    full_name: { value: "" },
    email: { value: "" },
    password: { value: "" },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let _form: formField = { ...form };
    _form[e.target.name].value = e.target.value;
    setForm(_form);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email.value && form.password.value) {
      toggle("processing");

      try {
        if (typeof AuthService.register != "boolean") {
          let data: { status: boolean; message: string } =
            await AuthService.register(
              form.full_name.value,
              form.email.value,
              form.password.value
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
        <form className='mt-12' onSubmit={submitForm}>
          <TextField
            fullWidth
            id='outlined-basic'
            margin='dense'
            label='Full Name'
            variant='outlined'
            name='full_name'
            autoFocus
            onChange={handleChange}
          />
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
          <TextField
            fullWidth
            margin='dense'
            id='outlined-basic'
            name='password'
            label='Password'
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
            onChange={handleChange}
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
        </form>
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
