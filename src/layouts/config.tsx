import { SvgIcon } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ReactNode } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Group } from "@mui/icons-material";
export interface itemsType {
  title: string;
  path: string;
  icon: JSX.Element;
}
export const items: itemsType[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Group />,
  },
  {
    title: "Group",
    path: "/group",
    icon: <Group />,
  },
  {
    title: "Expense",
    path: "/expense",
    icon: <ShoppingCartCheckoutIcon />,
  },
  
];
