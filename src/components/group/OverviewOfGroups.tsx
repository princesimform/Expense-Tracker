import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import GroupForm from "../../pages/groupPages/GroupForm";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType extends GeneralPropType {
  numberOfGroups: number;
  sx: { height: string };
}
function OverviewOfGroups({ userData, sx, numberOfGroups }: PropType) {
  return (
    <>
      <Card
        style={{
          background:
            "linear-gradient( 90deg, hsl(263deg 54% 59% / 100%), hsl(263deg 54% 59% / 100%))",
          color: "white",
        }}
        sx={sx}
      >
        <CardContent>
          <Stack
            display='flex'
            alignItems='flex-start'
            direction='row'
            justifyContent='space-between'
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography fontWeight={600} fontSize='1rem' variant='overline'>
                Groups
              </Typography>
              <Typography variant='h4'>{numberOfGroups}</Typography>
            </Stack>
            <GroupForm
              ModelButtonStyle={{
                background: "linear-gradient( 90deg, hsl(263deg 54% 59% / 100%), hsl(263deg 54% 59% / 100%))",
                color : "white",
                border : "1px solid white",
                borderRadius: "27px",
                width: "56px",
                margin: "10px",
                height: "56px",
              }}
              userData={userData}
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default OverviewOfGroups;
