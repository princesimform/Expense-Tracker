import { Avatar, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Auth, getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountProfile from "../components/profile/AccountProfile";
import AccountProfileDetails from "../components/profile/AccountProfileDetails";
import AuthService from "../services/firebase/auth";
import { Rootstate } from "../redux/store";
function Profile() {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });

  return (
    <>
      {profile != null ? (
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth='lg'>
            <Stack spacing={3}>
              <div>
                <Typography variant='h4'>Account</Typography>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <AccountProfile profileImage={profile.photoURL} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={8}>
                    <AccountProfileDetails userData={profile} />
                  </Grid>
                </Grid>
              </div>
            </Stack>
          </Container>
        </Box>
      ) : (
        <Box>No Data Avaliable</Box>
      )}
    </>
  );
}

export default Profile;
