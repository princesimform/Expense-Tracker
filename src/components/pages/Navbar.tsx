import React, { useEffect, useState } from "react";
import { PowerSettingsNew } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../services/auth";
import { User } from "@firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarImg from "./../../assets/avatar.jpg";
interface PropsTypes {
  window?: () => Window;
}

function Navbar({ window }: PropsTypes) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   
  const settings = ["Profile", "Logout"];
  const navItems = [
    "Dashboard",
    "Expanse",
    "Groups",
    "Help",
    "Friends",
    "Bills",
  ];

  useEffect(() => {
    if (typeof AuthService.getProfile != "boolean") {
      AuthService.getProfile().then((user: User) => {
        console.log(user);

        if (user && user.displayName != null) {
          setName(user.displayName);
        }
      });
    }
  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const profile = () => {};
  const logout = async () => {
    setProcessing(true);
    try {
      if (typeof AuthService.logout != "boolean") {
        let data: { status: boolean; message: string } =
          await AuthService.logout();
        if (data.status) {
          setProcessing(false);
          navigate(`/login`);
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
        } else {
          setProcessing(false);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        setProcessing(false);
      }
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            color='white'
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "flex" },
            }}
          >
            Expanse Tracker
          </Typography>
          <Box
            sx={{ flexGrow: 0, backgroundColor: "hsl(263deg 54% 59% / 90%)" }}
          >
            <Tooltip title='open setting'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='User' src={AvatarImg} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key='profile' onClick={profile}>
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem key='logout' onClick={logout}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant='h6' sx={{ my: 2 }} color='primary'>
              Expanse Tracker
            </Typography>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
