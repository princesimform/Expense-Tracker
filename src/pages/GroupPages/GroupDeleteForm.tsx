import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirestoreService from "../../libs/services/firebase/firestore";
import { groupDataType } from "../../redux/groupSlice";
import { GeneralPropType } from "../../routes/AuthRoutes";

interface PropType extends GeneralPropType {
  groupData: groupDataType;
}
function GroupDeleteForm({ groupData }: PropType) {
  const [openDialog, setOpenDialog] = useState(false);
  const nevagite = useNavigate();

  const deleteGroup = async (groupData: groupDataType) => {
    // dispatch(DeleteData(groupData));
    const response = await FirestoreService.deleteDataToFirestore(
      groupData,
      "groups"
    );
    if (response.status) {
      setOpenDialog(false);
      nevagite("/group");
    } else {
      throw new Error("Something went Wrong");
    }
  };

  return (
    <Box padding={1} border='2px dashed red'>
      <Typography variant='h6' fontWeight='bold' textAlign='left'>
        Danger Zone
      </Typography>
      <Box margin={1}>
        <Button
          variant='contained'
          fullWidth
          color='error'
          onClick={() => setOpenDialog(true)}
        >
          Delete Group
        </Button>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{"Are You Sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              We Are Delete Your all transaction which are done in this group
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setOpenDialog(false)}
            >
              Disagree
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => deleteGroup(groupData)}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default GroupDeleteForm;
