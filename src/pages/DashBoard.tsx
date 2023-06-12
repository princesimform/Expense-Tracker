import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OverviewOfGroups from "../components/group/OverviewOfGroups";
import Groups from "./GroupPages";
function DashBoard() {
  return (
    <>
      <Container className="dashboard-container" maxWidth='xl' >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOfGroups sx={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOfGroups sx={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOfGroups sx={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOfGroups sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>

      <Groups />
    </>
  );
}

export default DashBoard;
