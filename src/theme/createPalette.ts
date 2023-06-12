import { common } from "@mui/material/colors";
import { alpha } from "@mui/material";
import { balcony, neutral, buttonColor, gradient } from "./color";
const createPalette = () => {
  return {
    primary: {
      main: neutral[900],
      gradient: {
        main: gradient[900],
      },
    },
    secondary: {
      main: balcony[900],
    },
    background: {
      // default: "hsl(263deg 54% 59% / 90%)",
    },
    action: {
      active: neutral[900],
    },
    neutral,
    button: {
      main: buttonColor[900],
      error: { main: "red" },
    },
    white: {
      main: neutral[50],
    },
  };
};

export default createPalette;
