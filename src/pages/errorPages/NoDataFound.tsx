import React from "react";
import { Box, Container, Typography } from "@mui/material";
import NoDataImg from "./../../assets/page_not_found.png";

function NoDataFound() {
  return (
    <Box
      component='main'
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
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
              src={NoDataImg}
              alt=''
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />

            <Typography align='center' sx={{ mt: 5, mb: 5 }} variant='h3'>
              No Data Avaliable
            </Typography>
            <Typography align='center' color='text.secondary' variant='body1'>
              There is currently no data available for the parameters selected.
              Please try a different combination or create new Record
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default NoDataFound;
