import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../pages/GroupPages/GroupCard";
import GroupForm from "../../pages/GroupPages/GroupForm";
import { groupDataType } from "../../redux/groupSlice";
import { GeneralPropType } from "../../routes/AuthRoutes";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { expenseDataType } from "../../redux/expanseSlice";
import ExpenseList from "./../../pages/expanse";
import ExpenseDataTable from "../expense/ExpenseDataTable";

interface PropType extends GeneralPropType {
  expanses: expenseDataType[];
}
function DashboardExpense({ userData, expanses }: PropType) {
  const navigate = useNavigate();
  return (
    <>
      <Box
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
        <ExpenseDataTable userData={userData} />
      </Container>
    </>
  );
}

export default DashboardExpense;
