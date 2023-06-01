import React from "react";
import { CircularProgress } from "@mui/material";
function Loader() {
  return (
    <div className='circular-progress-container'>
      <CircularProgress className='mt-2' color='secondary' />
    </div>
  );
}

export default Loader;
