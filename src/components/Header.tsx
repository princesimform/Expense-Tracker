import React from "react";
import styles from "./../style/header.module.css";
import Logo from "./../assets/logo.png";
import { Avatar, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className={styles.headerMain}>
        <div className={styles.headerLogo}>
          <img src={Logo} />
        </div>
        <div className='flex items-center justify-end md:flex-1 lg:w-0'>
          <Link to='/login'>
            <Button variant='contained' sx={{ marginRight: 4 }}>
              Log In
            </Button>
          </Link>
          <Link to='/register'>
            <Button variant='contained'>Get Started</Button>
          </Link>
        </div>
      </div>
      <Divider />
    </header>
  );
}

export default Header;
