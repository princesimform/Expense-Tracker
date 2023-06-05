import { PowerSettingsNew } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../services/auth";
import { User } from "@firebase/auth";

function DashBoard() {
  const [name, setName] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (typeof AuthService.getProfile != "boolean") {
      AuthService.getProfile().then((user: User) => {
        console.log(user);

        if (user && user.displayName != null) {
          setName(user.displayName);
        }
      });
    }
  }, []);

  const logout = async () => {
    setProcessing(true);

    try {
      if (typeof AuthService.logout != "boolean") {
        let data: { status: boolean; message: string } =
          await AuthService.logout();
        if (data.status) {
          setProcessing(false);
          navigate(`/login`);
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 3000,
          });
        } else {
          setProcessing(false);
        }
      }
    } catch (e: unknown) {
      setProcessing(false);
      enqueueSnackbar("Something went wrong.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return (
    <Grid container className="page-container">
      <Grid item md={4} sm={6} xs={11} className="page-block">
        <p className="page-heading">
          Welcome
          <br />
          <span>{name}...</span>
        </p>
        <br />
        <Button
          variant="contained"
          color="error"
          disabled={processing}
          onClick={logout}
        >
          <PowerSettingsNew /> &nbsp; {processing ? "Processing...." : "Logout"}
        </Button>

        {id}
      </Grid>
    </Grid>
  );
}

export default DashBoard;
