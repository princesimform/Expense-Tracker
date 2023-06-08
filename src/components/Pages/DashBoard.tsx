import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Groups from "./GroupPages";
import SideBar from "./SideBar";
function DashBoard() {
  return (
    <>
      <SideBar />
      <Groups />
    </>
  );
}

export default DashBoard;
