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

function OverviewOfGroups({ sx }: any) {
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
              <Typography variant='h4'>10</Typography>
            </Stack>
            <Avatar
              sx={{
                // backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <Add />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default OverviewOfGroups;
