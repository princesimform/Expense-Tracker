import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";

const drawerWidth = 240;
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

function SideBar() {
  return (
    <>
      <StyledDrawer variant="permanent" anchor="left">
        <Typography variant="h6" color="white" sx={{ background : 'black'}}>
          Expanse Tracker
        </Typography>
      </StyledDrawer>
    </>
  );
}

export default SideBar;
