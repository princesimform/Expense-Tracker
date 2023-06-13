import { createTheme as createMuiTheme } from "@mui/material";
import  createComponents from "./createComponents";
import createPalette  from "./createPalette";
export function createTheme() {
  const palette = createPalette();
  const components = createComponents();
  return createMuiTheme({
    palette,
    components,
  });
}
