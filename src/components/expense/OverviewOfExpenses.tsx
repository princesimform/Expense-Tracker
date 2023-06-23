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
import AddExpenseForm from "../../pages/expensePages/AddExpanseForm";
import GroupForm from "../../pages/groupPages/GroupForm";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType extends GeneralPropType {
  numberOfExpenses: number;
  sx: { height: string };
}
function OverviewOfExpenses({ userData, sx, numberOfExpenses }: PropType) {
  return (
    <>
      <Card
        sx={sx}
        style={{
          background:
            "linear-gradient( 90deg, hsl(263deg 54% 59% / 100%), hsl(263deg 54% 59% / 100%))",
          color: "white",
        }}
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
                Expenses
              </Typography>
              <Typography variant='h4'>{numberOfExpenses}</Typography>
            </Stack>
            <AddExpenseForm
              ModelButtonStyle={{
                background: "linear-gradient( 90deg, hsl(263deg 54% 59% / 100%), hsl(263deg 54% 59% / 100%))",
                color : "white",
                border : "1px solid white",
                borderRadius: "27px",
                width: "56px",
                margin: "10px",
                height: "56px",
              }}
              FriendsList={[]}
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

export default OverviewOfExpenses;
