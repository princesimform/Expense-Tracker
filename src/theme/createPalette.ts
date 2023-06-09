import { common } from "@mui/material/colors";
import { alpha } from "@mui/material";
import { neutral } from "./color";
export function createPalette() {
  return {
    primary: {
      main: neutral[900],
    },
    secondary: {
      main: "hsl(263deg 54% 59% / 30%)",
    },
    background: {
      // default: "hsl(263deg 54% 59% / 90%)",
    },
    action: {
      active: neutral[900],
    },
    neutral,
  };
}
