import React, { useEffect, useState } from "react";
import {
  alpha,
  AppBar,
  AppBarProps,
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
  styled,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from "../libs/services/firebase/auth";
import { User } from "@firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import AvatarImg from "./../assets/avatar.jpg";
import useToggle from "../customHooks/useToggle";
import usePopover from "./../customHooks/usePopover";
import { useSelector } from "react-redux";
import { Rootstate } from "../redux/store";
interface PropsTypes {
  window?: () => Window;
  onNavOpen: Function;
}
const SIDE_NAV_WIDTH = 280;
function Navbar({ window, onNavOpen }: PropsTypes) {
  const navigate = useNavigate();
  const [toggles, toggle] = useToggle({
    processing: false,
    isDrawerOpen: false,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });

  const navItems = [
    "Dashboard",
    "Expanse",
    "Groups",
    "Help",
    "Friends",
    "Bills",
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
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
      <AppBar
        elevation={0}
        sx={{
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          backdropFilter: "blur(6px)",
          backgroundColor: {
            lg: "white",
            sm: (theme) => alpha(theme.palette.background.default, 0.8),
          },

          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={() => onNavOpen()}
            sx={{
              mr: 2,
              display: { lg: "none" },
            }}
            style={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component='div'
            sx={{
              flexGrow: 1,
              display: { sm: "block", lg: "flex" },
              cursor: "pointer",
            }}
          >
            {!lgUp && (
              <NavLink to='/dashboard'>
                <Typography variant='h6' style={{ color: "white" }}>
                  Expanse Tracker
                </Typography>
              </NavLink>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='open setting'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='User' src={profile?.photoURL} />
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
              <MenuItem
                key='profile'
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/profile");
                }}
              >
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
