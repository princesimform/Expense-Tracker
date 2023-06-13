import { ArrowLeft } from "@mui/icons-material";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";

function SomethingWentWrong() {
  // const navigate = useNavigate();
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mb: 3,
            textAlign: "center",
          }}
        >
          <Typography align='center' sx={{ mb: 3 }} variant='h3'>
            Something Went Wrong , Please Go Back
          </Typography>
          <Typography align='center' color='text.secondary' variant='body1'>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          {/* <Button
            startIcon={
              <SvgIcon fontSize='small'>
                <ArrowLeft />
              </SvgIcon>
            }
            sx={{ mt: 3 }}
            variant='contained'
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button> */}
          {/* <Link to={"/dashboard"}>Go to Dashboard</Link> */}
        </Box>
      </Box>
    </Container>
  );
}

export default SomethingWentWrong;
