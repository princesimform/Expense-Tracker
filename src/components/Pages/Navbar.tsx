import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
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
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../Services/auth";
import { User } from "@firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarImg from "./../../assets/avatar.jpg";
import useToggle from "../CustomHooks/useToggle";
interface PropsTypes {
  window?: () => Window;
}

function Navbar({ window }: PropsTypes) {
  const navigate = useNavigate();
  const [toggles, toggle] = useToggle({
    processing: false,
    isDrawerOpen: false,
  });
  const [name, setName] = useState<string>("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
        if (user && user.displayName != null) {
          setName(user.displayName);
        }
      });
    }
  }, []);

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
    toggle("processing");
    try {
      if (typeof AuthService.logout != "boolean") {
        let data: { status: boolean; message: string } =
          await AuthService.logout();
        if (data.status) {
          toggle("processing");

          navigate(`/login`);
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
        } else {
          toggle("processing");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        enqueueSnackbar(e.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
        toggle("processing");
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
            onClick={() => toggle("isDrawerOpen")}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "flex" },
              cursor: "pointer",
            }}
          >
            <NavLink to='/dashboard'>
              <Typography variant='h6' color='white'>
                Expanse Tracker
              </Typography>
            </NavLink>
          </Box>
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
          open={toggles.isDrawerOpen}
          onClose={() => toggle("isDrawerOpen")}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          <Box
            onClick={() => toggle("isDrawerOpen")}
            sx={{ textAlign: "center" }}
          >
            <NavLink to='/dashboard'>
              <Typography
                variant='h6'
                sx={{ my: 2, cursor: "pointer" }}
                color='primary'
              >
                Expanse Tracker
              </Typography>
            </NavLink>
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
