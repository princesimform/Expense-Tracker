import { Box, Button, ButtonBase } from "@mui/material";
import React, { ReactNode } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

function SidenavItem(props: {
  icon: ReactNode;
  key: string;
  path: string;
  title: string;
  active: boolean;
}) {
  const { active, icon, path, title } = props;
  const navigate = useNavigate();

  // const activeButton = document.getElementsByClassName()
  return (
    <ButtonBase
      className={active ? "active nav-btn" : "nav-btn"}
      sx={{}}
      onClick={() => navigate(`${String(path)}`)}
    >
      <Box
        className={active ? "active nav-btn-icon " : "nav-btn-icon "}
        component="span"
        sx={{
          ...(active && {
            color: "primary.main",
          }),
        }}
      >
        {icon}
      </Box>
      <Box
        component="span"
        sx={{
          color: "neutral.50",
          flexGrow: 1,
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "24px",
          whiteSpace: "nowrap",
          ...(active && {
            color: "primary.main",
          }),
        }}
      >
        {title}
      </Box>
    </ButtonBase>
  );
}

export default SidenavItem;
