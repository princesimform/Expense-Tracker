import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType {
  profileImage: string;
}
function AccountProfile({ profileImage }: PropType) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={profileImage}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant='h5'>
            {/* {userData?.displayName} */}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            {/* {user.city} {user.country} */}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            {/* {user.timezone} */}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button fullWidth variant='contained'>
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default AccountProfile;
