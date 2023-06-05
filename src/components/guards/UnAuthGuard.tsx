import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
import { User } from "@firebase/auth";

interface PropType {
  component: ReactNode;
}

function UnAuthGuard({ component }: PropType) {
  const [status, setStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [component]);

  const checkToken = async () => {
    try {
      if (typeof AuthService.getProfile != "boolean") {
        let user : User= await AuthService.getProfile();
        if (!user) {
          localStorage.removeItem("token");
        } else {
          navigate(`/`);
        }
        setStatus(true);
      }
    } catch (error) {
      navigate(`/`);
    }
  };

  return status ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

export default UnAuthGuard;
