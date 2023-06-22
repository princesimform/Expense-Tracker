import React from "react";
import { Box, CircularProgress } from "@mui/material";
import styles from "./../style/default.module.css";
import Logo from "./../assets/logo.png"; 
function Loader() {
  return (
    <Box className={styles.loader} >
      <img src={Logo} alt="" className={styles.loaderLogo} />
    </Box>
  );
}

export default Loader;
