import { ArrowLeft } from "@mui/icons-material";
import { Button, Container, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PageNotFoundImg from "./../../assets/page_not_found.png";
function PageNotFound() {
  return (
    <Box
      component='main'
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "93vh",
      }}
    >
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
            <img
              src={PageNotFoundImg}
              alt=''
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />

            <Typography align='center' sx={{ mb: 3 }} variant='h3'>
              404: The page you are looking for isn’t here
            </Typography>
            <Typography align='center' color='text.secondary' variant='body1'>
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Button
              startIcon={
                <SvgIcon fontSize='small'>
                  <ArrowLeft />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant='contained'
            >
              Go back to dashboard
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PageNotFound;
