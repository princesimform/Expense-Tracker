import React from "react";
import { createTheme } from "@mui/material";
import createPalette from "./createPalette";
const muiTheme = createTheme();

const createComponents = () => {
  // const { palette } = config;
  const primaryColor = createPalette().primary.main;
  const secondaryColor = createPalette().secondary.main;
  const buttonColor = createPalette().button.main;
  const white = createPalette().white.main;
  const primaryGradient = createPalette().primary.gradient.main;
  return {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(263deg 54% 59% / 90%)",
          color: "white",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "hsl(263deg 54% 59% / 90%)",
        },
        root: {
          color: "white",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          color: "hsl(263deg 54% 59% / 90%)",
        },
      },
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          ".MuiAvatar-root": {},
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.nav-btn": {
            alignItems: "center",
            borderRadius: "2px",
            display: "flex",
            justifyContent: "flex-start",
            padding: "6px 16px",
            textAlign: "left",
            width: "100%",
            "&:hover:not(.active)": {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            },
            "&.active": {
              backgroundColor: "rgba(255,255,255,0.9)",
            },
            "& .nav-btn-icon": {
              alignItems: "center",
              color: "neutral.50",
              display: "inline-flex",
              justifyContent: "center",
              marginRight: "16px",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: `${buttonColor}`,
          color: `${white}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.add-group": {
            display: "block",
            width: "fit-content",
            margin: "10px  auto",
            padding: "16px",
            cursor: "pointer",
            border: `2px dashed ${primaryColor}`,
          },
          "&.group-card": {
            backgroundImage: `${primaryGradient}`,
            color: "white",
            borderRadius: "10px",
            cursor: "pointer",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.groups-page-title": {
            padding: "16px",
            color: `${buttonColor}`,
            fontWeight: "bold",
          },
          "&.group-expense-heading": {
            textAlign: "left",
            fontWeight: "bold",
            color: "gray",
          },
          "&.group-expanse-name": {
            color: `${buttonColor}`,
            fontWeight: "bold",
          },
          "&.group-expanse-amount": {
            color: "gray",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.dashboard-container": {
            marginTop: "50px",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          "&.group-title-divider": {
            marginBottom: "50px",
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          "&.group-tab-box": {
            borderBottom: 1,
            borderColor: `${primaryColor}`,
          },
          "&.groups-page-heading": {
            marginRight: "16px",
          },
          "&.group-detail-page": {},
          "&.page-not-found": {
            margin: "auto",
          },
        },
      },
    },
  };
};

export default createComponents;
