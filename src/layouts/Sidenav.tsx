import {
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Logo from "./../assets/logo.png";
import SidenavItem from "./SidenavItem";
import { items } from "./config";
import { useLocation, useNavigate } from "react-router-dom";
function Sidenav({ onClose, open }: { onClose: Function; open: Boolean }) {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const path = useLocation();
  const pathname = path.pathname;
  const navigate = useNavigate();
  const content = (
    <>
      <Box
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-scrollbar:before": {
            background: "neutral.400",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ p: 3 }} onClick={() => navigate("/")}>
            <Box
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <img src={Logo} alt="" />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderRadius: 1,
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                mt: 2,
                p: "12px",
              }}
            >
              <Box>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                  textAlign="center"
                >
                  Expanse Tracker
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ borderColor: "neutral.100" }} />
          <Box
            component="nav"
            sx={{
              flexGrow: 1,
              px: 2,
              py: 3,
            }}
          >
            <Stack
              component="ul"
              spacing={0.5}
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              {items.map((item: any) => {
                const active = pathname == item.path ? true : false;

                return (
                  <SidenavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "netural",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={() => onClose()}
      open={Boolean(open)}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

export default Sidenav;
