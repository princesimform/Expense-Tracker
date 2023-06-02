import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";

interface PropType {
  toggleSignUp: Function;
}

function SignUpForm({ toggleSignUp }: PropType) {
  return (
    <>
      <Box className='text-left font-bold'>
        <Button
         onClick={() => toggleSignUp()}
        >
          <KeyboardBackspace />
        </Button>
      </Box>
      <Box className='w-100 sm:mx-0 md:m-auto pr-[1rem] md:mx-[4rem] '>
        <Box>
          <p className=' text-3xl mb-5  text-left font-medium'>Sign Up</p>
        </Box>
        <Box className='mt-12'>
          <TextField
            fullWidth
            id='outlined-basic'
            margin='dense'
            label='Email Address'
            variant='outlined'
          />

          <Box className='grid  md:flex md:flex-row-reverse my-5 md:justify-between'>
            <Button
              variant='contained'
              sx={{ color: "white", padding: "0.4rem 2rem" }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignUpForm;
