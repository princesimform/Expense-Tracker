import { Button, Container, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GeneralPropType } from "../../routes/AuthRoutes";
import { expenseDataType } from "../../redux/expanseSlice";
import ExpenseDataTable from "../expense/ExpenseDataTable";

interface PropType extends GeneralPropType {
  expanses: expenseDataType[];
}
function DashboardExpense({ userData, expanses }: PropType) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        margin='0px 16px'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className='groups-page-heading'
      >
        <Typography className='groups-page-title' variant='h4' textAlign='left'>
          Your Expanses
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate("/expense")}
        >
          View Expense
        </Button>
      </Box>
      <Divider className='divider-bottom' />
      <Container maxWidth='xl'>
        {expanses.length > 0 ? (
          <ExpenseDataTable userData={userData} />
        ) : (
          <Typography> No Data Avaliable</Typography>
        )}
      </Container>
    </>
  );
}

export default DashboardExpense;
