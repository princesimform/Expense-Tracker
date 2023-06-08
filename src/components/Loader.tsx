import React from "react";
import { Box, CircularProgress } from "@mui/material";
function Loader() {
  return (
    <Box className='circular-progress-container' sx={{ height : 100}}>
      <CircularProgress className='mt-2' color='secondary' />
    </Box>
  );
}

export default Loader;
