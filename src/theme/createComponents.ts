import React from "react";
import { createTheme } from "@mui/material";
const muiTheme = createTheme();

export function createComponents(config: any) {
  const { palette } = config;

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
    MuiButton: {
      styleOverrides: {
        root: {
          background: "hsl(263deg 54% 59% / 90%)",
          color: "white",
        },
      },
    },
  };
}

export default createComponents;
