import React, {
  ComponentType,
  ReactComponentElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../libs/services/firebase/auth";
import { User } from "@firebase/auth";
import Navbar from "../layouts/Navbar";
import { Box } from "@mui/system";
import { styled } from "@mui/material";
import Sidenav from "../layouts/Sidenav";
import { useDispatch } from "react-redux";
import { getGroups } from "../redux/groupSlice";
import { GeneralPropType } from "../routes/AuthRoutes";
import { getExpenses } from "../redux/expanseSlice";
interface PropType {
  component: React.ComponentType;
}

function AuthGuards({ component }: PropType) {
  const [status, setStatus] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function getAllGroups(email: string) {
    await dispatch(getGroups(email));
  }
  async function getAllExpenseList(email: string) {
    await dispatch(getExpenses(email));
  }
  useEffect(() => {
    checkToken().then((res) => {
      getAllGroups(String(res?.email));
      getAllExpenseList(String(res?.email));
    });
  }, [component]);

  const SIDE_NAV_WIDTH = 280;

  const LayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: "60px",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: SIDE_NAV_WIDTH,
    },
  }));

  const LayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
  });

  const checkToken = async () => {
    try {
      if (typeof AuthService.getProfile != "boolean") {
        const user: User = await AuthService.getProfile(true);
        if (!user) {
          navigate(`/login`);
        } else {
          setStatus(true);
          setUserData(user);
          return user;
        }
      }
    } catch (error) {
      navigate(`/login`);
    }
  };
  const [openNav, setOpenNav] = useState(false);
  const Component: ComponentType<GeneralPropType> = component;
  return status ? (
    <React.Fragment>
      <Box className='my-container'>
        <Box>
          <Sidenav onClose={() => setOpenNav(false)} open={openNav} />
          <Navbar onNavOpen={() => setOpenNav(true)} />
        </Box>
        <LayoutRoot>
          <LayoutContainer>
            {userData && <Component userData={userData} />}
          </LayoutContainer>
        </LayoutRoot>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}

export default AuthGuards;
