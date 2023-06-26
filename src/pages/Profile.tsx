import { Avatar, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Auth, getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import AccountProfile from "../components/profile/AccountProfile";
import AccountProfileDetails from "../components/profile/AccountProfileDetails";
import AuthService from "../libs/services/firebase/auth";
import { GeneralPropType } from "../routes/AuthRoutes";
interface PropType extends GeneralPropType {}
function Profile({ userData }: PropType) {
  const [ProfileData, setProfileData] = useState<User | null>();

  const getUserData = async () => {
    const fauth: Auth = await getAuth();
    setProfileData(fauth.currentUser);
    return fauth.currentUser;
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      {ProfileData != null ? (
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
                    <AccountProfile />
                  </Grid>
                  <Grid item xs={12} md={6} lg={8}>
                    <AccountProfileDetails userData={ProfileData} />
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
