import { Badge, Box, Container, Grid, TextField } from "@mui/material";
import React from "react";
import Logo from "./../assets/logo.png";
import { Language } from "@mui/icons-material";
function Login() {
  return (
    <Grid
      className='w-[90%]  h-[90vh] '
      container
      spacing={2}
      sx={{ display: "flex", margin: "auto" }}
    >
      <Grid
        className='rounded-l-md tracking-wider'
        item
        xs={12}
        md={6}
        sx={{
          background: "hsl(263deg 54% 59%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "font-[Poppins]  font-sans",
          color: "white",
        }}
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
            <h1 className='text-3xl font-bold mb-5 font-[Poppins] tracking-wider font-sans'>
              Expense Tracker
            </h1>
            <h3 className='text-lg font-[Poppins] tracking-wider font-sans'>
              Spending and Manage Your Finances Effectively
            </h3>
          </Box>
        </Box>
        <Box className='pb-10 flex text-center mx-auto'>
          <Box className='px-3'>
            <Language />
          </Box>

          <p>www.expancetracker.com</p>
        </Box>
      </Grid>
      <Grid
        className='rounded-r-md tracking-wider'
        item
        xs={12}
        md={6}
        sx={{ display: "flex", backgroundColor: "white" }}
      >
        <Box className='w-100 mx-12 my-auto '>
          <Box>
            <p className=' text-3xl mb-5 font-[Poppins] tracking-wider font-sans text-left'>
              Sign In
            </p>
          </Box>
          <Box>
            <TextField
              fullWidth
              id='outlined-basic'
              margin='normal'
              label='Outlined'
              variant='outlined'
            />
            <TextField
              fullWidth
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
