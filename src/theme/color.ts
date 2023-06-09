import { alpha } from "@mui/material";

const withAlphas = (color: any) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: "#ffffff",
  100: "hsl(263deg 54% 59% / 10%)",
  200: "hsl(263deg 54% 59% / 20%)",
  300: "hsl(263deg 54% 59% / 30%)",
  400: "hsl(263deg 54% 59% / 40%)",
  500: "hsl(263deg 54% 59% / 50%)",
  600: "hsl(263deg 54% 59% / 60%)",
  700: "hsl(263deg 54% 59% / 70%)",
  800: "hsl(263deg 54% 59% / 80%)",
  900: "hsl(263deg 54% 59% / 90%)",
};
