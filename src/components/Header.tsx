import React from "react";
import styles from "./../style/header.module.css";
import Logo from "./../assets/logo.png";
import {  Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
interface PropType {
  isLoggedIn: boolean;
}
function Header({ isLoggedIn }: PropType) {
  return (
    <header>
      <div className={styles.headerMain}>
        <div className={styles.headerLogo}>
          <img src={Logo} />
          <Typography variant="h6" className={styles.productName}>
            Expense Tracker
          </Typography>
        </div>
        <div className={styles.headerButtons}>
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="contained" fullWidth>
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="contained" sx={{ marginRight: 4 }}>
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Divider />
    </header>
  );
}

export default Header;
