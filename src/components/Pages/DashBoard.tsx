import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Groups from "./GroupPages";
function DashBoard() {
  return (
    <>
      <Navbar />
      {/* <Box className=' h-[100vh] '>asd</Box> */}
      <br />
      <br />
      <br />
      <Groups />
    </>
  );
}

export default DashBoard;
