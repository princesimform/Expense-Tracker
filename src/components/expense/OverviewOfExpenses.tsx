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
import AddExpenseForm from "../../pages/expanse/AddExpanseForm";
import GroupForm from "../../pages/GroupPages/GroupForm";
interface PropType {
  numberOfExpenses: number;
  sx: { height: string };
 
}
function OverviewOfExpenses({ sx, numberOfExpenses }: PropType) {
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
                Expenses
              </Typography>
              <Typography variant='h4'>{numberOfExpenses}</Typography>
            </Stack>
            <AddExpenseForm    ModelButtonStyle={{
                borderRadius: "27px",
                width: "56px",
                margin: "10px",
                height: "56px",
              }} FriendsList={[]} />
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
