import React from "react";
import { TextField, Button, Link, Box, Slide, Collapse } from "@mui/material";
interface PropType {
  toggleSignUp: Function;
  isSignUp: boolean;
}
function LoginForm({ toggleSignUp, isSignUp }: PropType) {
  return (
    <>
      <Box className="w-100 sm:mx-0 md:m-auto pr-[1rem] md:mx-[4rem] ">
        <Box>
          <p className=" text-3xl mb-5  text-left font-medium">Sign In</p>
        </Box>
        <Box className="mt-12">
          <TextField
            fullWidth
            id="outlined-basic"
            margin="dense"
            label="Outlined"
            variant="outlined"
          />
          <Box className="my-5"></Box>
          <TextField
            fullWidth
            margin="dense"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />

          <Box className="grid  md:flex md:flex-row-reverse my-5 md:justify-between">
            <Button
              variant="contained"
              sx={{ color: "white", padding: "0.4rem 2rem" }}
            >
              Sign In
            </Button>
            <Box className="my-5 md:my-auto ">
              <Link
                underline="none"
                className="text-center md:text-left "
                sx={{ margin: "auto 0" }}
              >
                Forgot Password?
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        onClick={() => toggleSignUp()}
        className="bg-primary bg-opacity-10 border-primary border-opacity-30 border-2 rounded-md mt-[0] md:mx-[4rem] mr-[1rem] mb-[1rem] md:mb-[4rem] p-4 cursor-pointer text-primary text-sm md:text-base"
      >
        Don't Have an Account ?<span className="font-bold"> Sign Up</span>
      </Box>
    </>
  );
}

export default LoginForm;
