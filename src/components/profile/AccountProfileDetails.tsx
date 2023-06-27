import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { profileDataType } from "../../redux/profileSlice";
interface PropType {
  userData: profileDataType;
}
function AccountProfileDetails({ userData }: PropType) {
  const navigate = useNavigate();
  return (
    <Card sx={{ textAlign: "left" }}>
      <CardHeader subheader='' title='Profile' />
      <CardContent sx={{ pt: 2 }}>
        <Box>
          <Grid container>
            <Grid xs={12} md={12}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>Name : </span>{" "}
                {userData?.displayName}
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>Email : </span>{" "}
                {userData?.email}
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>Phone No. : </span>{" "}
                {userData?.phoneNumber}
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>City : </span>{" "}
                {userData?.city}
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>State : </span>{" "}
                {userData?.state}
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>Country : </span>{" "}
                {userData?.country}
              </Typography>
            </Grid>
            <Grid xs={12} md={12}>
              <Typography sx={{ py: 2 }}>
                <span style={{ fontWeight: 600 }}>Description : </span>{" "}
                {userData?.description}
              </Typography>
            </Grid>

          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={() => navigate("update")} variant='contained'>
          Update details
        </Button>
      </CardActions>
    </Card>
  );
}

export default AccountProfileDetails;
