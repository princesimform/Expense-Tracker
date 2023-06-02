import {
  Badge,
  Box,
  Button,
  Collapse,
  Container,
  Fade,
  Grid,
  Link,
  TextField,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "./../assets/logo.png";
import { Language } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { KeyboardBackspace } from "@mui/icons-material";
function Login() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    return isSignUp;
  };

  return (
    <Box className='w-[90%] md:h-[90vh] flex m-auto font-poppins tracking-wider font-sans  '>
      <Grid container spacing={2}>
        <Grid
          className={
            "hidden md:flex justify-between rounded-l-md tracking-wider bg-primary text-white "
          }
          item
          xs={12}
          md={6}
          sx={{
            flexDirection: "column",
          }}
          order={{ xs: 2, sm: 1 }}
        >
          <Box className='flex'>
            <Box className='m-1 w-3 h-3 bg-red-500 rounded-full  '></Box>
            <Box className='m-1 w-3 h-3 bg-amber-400 rounded-full '></Box>
            <Box className='m-1 w-3 h-3 bg-green-600 rounded-full '></Box>
          </Box>
          <Box className='my-auto p-12'>
            <Box className='m-auto border-2 border-inherit rounded-full inline-block bg-white mb-10'>
              <img src={Logo} className='w-[7rem] h-[7rem] ' />
            </Box>
            <Box className='m-auto  '>
              <h1 className='text-3xl font-bold mb-5 '>Expense Tracker</h1>
              <h3 className='text-lg'>
                Spending and Manage Your Finances Effectively
              </h3>
            </Box>
          </Box>
          <Box className='mt-[0] mr-[4rem] mb-[4rem] ml-[4rem] p-4'>
            <Link href='#' underline='none'>
              <Box className='text-white'>
                <span className='px-3'>
                  <Language />
                </span>
                <span>www.expancetracker.com</span>
              </Box>
            </Link>
          </Box>
        </Grid>
        <Grid
          className=' justify-between rounded-r-md tracking-wider bg-white'
          item
          xs={12}
          md={6}
          sx={{
            flexDirection: "column",
          }}
          order={{ xs: 1, sm: 1 }}
        >
          <>
            <Collapse in={isSignUp}>
              <Box className='w-100 sm:mx-0 md:m-auto pr-[1rem] md:mx-[4rem] '>
                <Box>
                  <p className=' text-3xl mb-5  text-left font-medium'>
                    Sign In
                  </p>
                </Box>
                <Box className='mt-12'>
                  <TextField
                    fullWidth
                    id='outlined-basic'
                    margin='dense'
                    label='Outlined'
                    variant='outlined'
                  />
                  <Box className='my-5'></Box>
                  <TextField
                    fullWidth
                    margin='dense'
                    id='outlined-basic'
                    label='Outlined'
                    variant='outlined'
                  />

                  <Box className='grid  md:flex md:flex-row-reverse my-5 md:justify-between'>
                    <Button
                      variant='contained'
                      sx={{ color: "white", padding: "0.4rem 2rem" }}
                    >
                      Sign In
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
                </Box>
              </Box>
              <div
                onClick={() => toggleSignUp()}
                className='bg-primary bg-opacity-10 border-primary border-opacity-30 border-2 rounded-md mt-[0] md:mx-[4rem] mr-[1rem] mb-[1rem] md:mb-[4rem] p-4 cursor-pointer text-primary text-sm md:text-base'
              >
                Don't Have an Account ?
                <span className='font-bold'> Sign Up</span>
              </div>
            </Collapse>
            <Collapse in={!isSignUp}>
              <Box className='text-left font-bold'>
                <Button onClick={() => toggleSignUp()}>
                  <KeyboardBackspace />
                </Button>
              </Box>
              <Box className='w-100 sm:mx-0 md:m-auto pr-[1rem] md:mx-[4rem] '>
                <Box>
                  <p className=' text-3xl mb-5  text-left font-medium'>
                    Sign Up
                  </p>
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
            </Collapse>
            {/* {isSignUp ? (
              <SignUpForm toggleSignUp={toggleSignUp} />
            ) : (
              <LoginForm toggleSignUp={toggleSignUp} isSignUp={isSignUp} />
            )} */}
          </>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
