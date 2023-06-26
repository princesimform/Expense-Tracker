import React from "react";
import { Box } from "@mui/material";
import styles from "./../style/default.module.css";
import Logo from "./../assets/logo.png"; 
function Loader() {
  return (
    <Box className={styles.loader} >
      <img src={Logo} alt="Project Logo" className={styles.loaderLogo} />
    </Box>
  );
}

export default Loader;
