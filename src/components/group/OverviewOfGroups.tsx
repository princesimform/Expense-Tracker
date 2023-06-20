import Add from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
import GroupForm from "../../pages/GroupPages/GroupForm";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType extends GeneralPropType{
  numberOfGroups: number;
  sx: { height: string };
}
function OverviewOfGroups({ userData , sx, numberOfGroups }: PropType) {
  return (
    <>
      <Card sx={sx}>
        <CardContent>
          <Stack
            display='flex'
            alignItems='flex-start'
            direction='row'
            justifyContent='space-between'
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color='text.secondary' variant='overline'>
                Groups
              </Typography>
              <Typography variant='h4'>{numberOfGroups}</Typography>
            </Stack>
            <GroupForm
              ModelButtonStyle={{
                borderRadius: "27px",
                width: "56px",
                margin: "10px",
                height: "56px",
              }}
              userData={userData}
            />
            {/* <Avatar
              sx={{
                // backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <Add />
              </SvgIcon>
            </Avatar> */}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default OverviewOfGroups;
