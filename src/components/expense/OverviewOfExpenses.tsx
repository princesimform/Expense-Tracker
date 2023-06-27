import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import AddExpenseForm from "../../pages/expensePages/AddExpanseForm";
interface PropType  {
  numberOfExpenses: number;
  sx: { height: string };
}
function OverviewOfExpenses({  sx, numberOfExpenses }: PropType) {

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
            />
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default OverviewOfExpenses;
