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

export const gradient = {
  900: "linear-gradient(to right top, #bd55bd, #b257c2, #a559c7, #985ccb, #895ecf)",
} 
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

export const balcony = {
  50:"rgba(189,85,189,1)",
  100:"rgba(189,85,189,0.1)",
  200:"rgba(189,85,189,0.2)",
  300:"rgba(189,85,189,0.3)",
  400:"rgba(189,85,189,0.4)",
  500:"rgba(189,85,189,0.5)",
  600:"rgba(189,85,189,0.6)",
  700:"rgba(189,85,189,0.7)",
  800:"rgba(189,85,189,0.8)",
  900:"rgba(189,85,189,0.9)"
}

export const buttonColor = {
  50:"rgba(240,120,20,1)",
  100:"rgba(240,120,20,0.1)",
  200:"rgba(240,120,20,0.2)",
  300:"rgba(240,120,20,0.3)",
  400:"rgba(240,120,20,0.4)",
  500:"rgba(240,120,20,0.5)",
  600:"rgba(240,120,20,0.6)",
  700:"rgba(240,120,20,0.7)",
  800:"rgba(240,120,20,0.8)",
  900:"rgba(240,120,20,0.9)"
}
