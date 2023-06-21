import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import AuthService from "../libs/services/firebase/auth";
import { User } from "@firebase/auth";
import Loader from "../components/Loader";
import LandingPage from "./LandingPage";

function HomePage() {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      if (typeof AuthService.getProfile != "boolean") {
        let user: User = await AuthService.getProfile();

        if (!user) {
          localStorage.removeItem("token");
          setisLoggedIn(false);
        } else {
          setisLoggedIn(true);
        }
      }
    } catch (error: unknown) {
      setisLoggedIn(false);
    }
  };

  // if (isLoggedIn == undefined) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   );
  // } else if (isLoggedIn == false) {
  //   return (
  //     <>
  //       <NavLink to='/login'>
  //         <Button variant='contained' color='error'>
  //           Log in
  //         </Button>
  //       </NavLink>
  //       <NavLink to='/register'>
  //         <Button variant='contained' color='error'>
  //           Register
  //         </Button>
  //       </NavLink>
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <NavLink to='/dashboard'>
  //         <Button variant='contained' color='error'>
  //           Dashboard
  //         </Button>
  //       </NavLink>
  //     </>
  //   );
  // }

  return <>
  <LandingPage />
  </>;
}

export default HomePage;
