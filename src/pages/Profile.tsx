import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Auth, getAuth, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import AuthService from "../libs/services/firebase/auth";
import { GeneralPropType } from "../routes/AuthRoutes";
interface PropType extends GeneralPropType {}
function Profile({userData} : PropType) {
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
    <Box>
      {ProfileData != null ? (
        <Box>
          {ProfileData.photoURL ? <img src={ProfileData.photoURL} /> : <></>}

          <Typography>Gata Are Here</Typography>
        </Box>
      ) : (
        <Box>No Data Avaliable</Box>
      )}
    </Box>
  );
}

export default Profile;
