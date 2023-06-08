import React, {  useState } from "react";
import { Box, Collapse, Container, Grid, Link } from "@mui/material";
import Logo from "./../../assets/logo.png";
import { Language } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

interface PropType {
  isLogin: boolean;
}
function Form({ isLogin }: PropType) {
  const [isSignUp, setIsSignUp] = useState<boolean>(isLogin);
  const navigate = useNavigate();
  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
    if (isSignUp) {
      navigate("/login");
    } else {
      navigate("/register");
    }
    return isSignUp;
  };

  return (
    <Container className='m-auto' sx={{ height: "100vh", display: "flex" }}>
      <Box className='w-[90%] md:h-[90vh] flex m-auto font-poppins tracking-wider font-sans max-w-[1200px] '>
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
            className=' md:flex justify-between rounded-r-md tracking-wider bg-white'
            item
            xs={12}
            md={6}
            sx={{
              flexDirection: "column",
            }}
            order={{ xs: 1, sm: 1 }}
          >
            <Box></Box>
            <Box>
              <>
                <Collapse in={isSignUp}>
                  <LoginForm toggleSignUp={toggleSignUp} />
                </Collapse>
                <Collapse in={!isSignUp}>
                  <RegisterForm toggleSignUp={toggleSignUp} />
                </Collapse>
              </>
            </Box>
            <Box></Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Form;
