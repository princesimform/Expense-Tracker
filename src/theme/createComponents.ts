import React from "react";
import { createTheme } from "@mui/material";
import createPalette from "./createPalette";
const muiTheme = createTheme();

const createComponents = (config: any) => {
  // const { palette } = config;
  const primaryColor = createPalette().primary.main; 
  const secondaryColor = createPalette().secondary.main; 
  const buttonColor = createPalette().button.main;
  const white = createPalette().white.main;

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
    MuiButtonBase:{
      styleOverrides:{
        root:{
          "&.nav-btn":{
            alignItems: "center",
            borderRadius: "2px",
            display: "flex",
            justifyContent: "flex-start",
            padding: "6px 16px",
            textAlign: "left",
            width: "100%",
            "&:hover:not(.active)":{
              backgroundColor:"rgba(255, 255, 255, 0.4)",
            },
            "&.active":{
              backgroundColor:"rgba(255,255,255,0.9)",
            },
            "& .nav-btn-icon":{
              alignItems: "center",
              color: "neutral.50",
              display: "inline-flex",
              justifyContent: "center",
              marginRight:"16px",
            },
          },
        },
      },
    },
    MuiButton:{
      styleOverrides:{
        root:{
          backgroundColor:`${buttonColor}`,
          color:`${white}`
        },
      },
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          "&.add-group":{
            display: "block",
            width: "fit-content",
            margin: "10px  auto",
            padding: "16px",
          cursor: "pointer",
            border:`2px dashed ${primaryColor}`
          },
          "&.group-cards":{
          backgroundColor: `${secondaryColor}`,
          color: "white",
          borderRadius: "10px",
          }
        },
      },
    },
  };
}

export default createComponents;
