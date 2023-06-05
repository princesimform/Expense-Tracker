import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth";

function HomePage() {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      let user = await AuthService.getProfile();
      console.log("user");
      console.log(user);

      if (!user) {
        localStorage.removeItem("token");
        setisLoggedIn(false);
      } else {
        setisLoggedIn(true);
      }
    } catch (error) {
      setisLoggedIn(false);
    }
  };

  return (
    <Box>
      {isLoggedIn ? (
        <>
          <NavLink to='/dashboard'>
            <Button variant='contained' color='error'>
              Dashboard
            </Button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to='/login'>
            <Button variant='contained' color='error'>
              Log in
            </Button>
          </NavLink>
          <NavLink to='/register'>
            <Button variant='contained' color='error'>
              Register
            </Button>
          </NavLink>
        </>
      )}
    </Box>
  );
}

export default HomePage;
