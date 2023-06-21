import React from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  Backdrop,
  Stack,
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useToggle from "../../customHooks/useToggle";
import { GeneralPropType } from "../../routes/AuthRoutes";
import { expenseDataType } from "../../redux/expanseSlice";
import { useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface PropType extends GeneralPropType {}
function ExpenseDetails({ userData }: PropType) {
  const { id } = useParams();
  const expenseData: expenseDataType = useSelector((state: Rootstate) => {
    const data = state.expenseReducer;
    const Newdata = data.expenseList.filter(
      (expense: expenseDataType) => String(expense.id) == id
    );

    return Newdata[0];
  });

  if (expenseData) {
    return (
      <>
        <Box className='group-detail-page' padding='16px'>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            className='groups-page-heading'
          >
            <Box display='flex' alignItems='center'>
              <Avatar alt='sdf' src={expenseData.expense_file_url} />
              <Typography
                className='groups-page-title'
                variant='h4'
                textAlign='left'
              >
                {expenseData.title}
              </Typography>
            </Box>
            <Box></Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return <Loader />;
  }
}

export default ExpenseDetails;
