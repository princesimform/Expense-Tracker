import React, { useState } from "react";
import { Box, Collapse, Container, Grid, Link } from "@mui/material";
import Logo from "./../assets/logo.png";
import { Language } from "@mui/icons-material";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/registration/RegisterForm";
import { useNavigate } from "react-router-dom";
import Styles from "./../style/Authform.module.css";
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
    <Container
      className={Styles.formContainer}
      sx={{ height: "100vh", display: "flex" }}
    >
      <Box className={Styles.formBox}>
        <Grid container spacing={2}>
          <Grid
            className={Styles.formGrid}
            item
            xs={12}
            md={6}
            sx={{
              flexDirection: "column",
            }}
            order={{ xs: 2, sm: 1 }}
          >
            <Box className={Styles.dotSpanContainer}>
              <Box className={`${Styles.dotSpan}  ${Styles.red}`}></Box>
              <Box className={`${Styles.dotSpan}  ${Styles.amber}`}></Box>
              <Box className={`${Styles.dotSpan}  ${Styles.green}`}></Box>
            </Box>
            <Box className={Styles.FormDesignContainer}>
              <Box className={Styles.FormDesignImgBox}>
                <img src={Logo} />
              </Box>
              <Box className={Styles.FormDesignContentBox}>
                <h1>Expense Tracker</h1>
                <h3>Spending and Manage Your Finances Effectively</h3>
              </Box>
            </Box>
            <Box className={Styles.FormDesignLinkContainer}>
              <Link href='#' underline='none'>
                <Box className={Styles.FormDesignLinkIcon}>
                  <span>
                    <Language />
                  </span>
                  <span>www.expancetracker.com</span>
                </Box>
              </Link>
            </Box>
          </Grid>
          <Grid
            className={Styles.FormRightContainer}
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
