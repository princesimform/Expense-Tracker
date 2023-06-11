import { common } from "@mui/material/colors";
import { alpha } from "@mui/material";
import { balcony, neutral, buttonColor } from "./color";
const createPalette = () => {
  return {
    primary: {
      main: neutral[900],
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
    button:{
      main:buttonColor[900],
    },
    white:{
      main:neutral[50],
    }
  };
}

export default createPalette;