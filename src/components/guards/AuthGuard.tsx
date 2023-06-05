import React, {
  ReactComponentElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";
interface PropType {
  component: ReactNode;
}
function AuthGuards({ component }: PropType) {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [component]);

  const checkToken = async () => {
    try {
      let user = await AuthService.getProfile(true);
      if (!user) {
        navigate(`/login`);
      }
      setStatus(true);
      return;
    } catch (error) {
      navigate(`/login`);
    }
  };

  return status ? (
    <React.Fragment>{component}</React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

export default AuthGuards;
