import { Box, Button, ButtonBase } from "@mui/material";
import React from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";

function SidenavItem(props: any) {
  const { active, disabled, external, icon, path, title } = props;
  console.log(path);
  const navigate = useNavigate();
  return (
    <ButtonBase
      sx={{
        alignItems: "center",
        borderRadius: 2,
        display: "flex",
        justifyContent: "flex-start",
        pl: "16px",
        pr: "16px",
        py: "6px",
        textAlign: "left",
        width: "100%",
        // backgroundColor: "rgba(255, 255, 255, 0.04)",
        ...(active && {
          background: "rgba(255, 255, 255, 0.9)",
        }),
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
        },
      }}
      onClick={() => navigate(`${String(path)}`)}
    >
      <Box
        component='span'
        sx={{
          alignItems: "center",
          color: "neutral.50",
          display: "inline-flex",
          justifyContent: "center",
          mr: 2,
          ...(active && {
            color: "primary.main",
          }),
        }}
      >
        {icon}
      </Box>
      <Box
        component='span'
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

// SidenavItem.propTypes = {
//   active: PropTypes.bool,
//   disabled: PropTypes.bool,
//   external: PropTypes.bool,
//   icon: PropTypes.node,
//   path: PropTypes.string,
//   title: PropTypes.string.isRequired,
// };

export default SidenavItem;
