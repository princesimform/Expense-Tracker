import React, { ComponentType, useEffect, useState } from "react";
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
import { AppDispatch } from "../redux/store";
import Loader from "../components/Loader";
interface PropType {
  component: React.ComponentType;
}

function AuthGuards({ component }: PropType) {
  const [status, setStatus] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    checkToken().then((res) => {
      res?.email && dispatch(getGroups(String(res?.email)));
      res?.email && dispatch(getExpenses(String(res?.email)));
      setIsFetching(true);
    });
  }, []);

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
        const oldtoken = localStorage.getItem("isExpire");
        const newToken = await user.getIdToken();
        if (!user) {
          navigate(`/login`);
        } else {
          if (oldtoken == newToken) {
            setStatus(true);
            setUserData(user);
            return user;
          } else {
            AuthService.logout();
            navigate(`/login`);
          }
        }
      }
    } catch (error) {
      navigate(`/login`);
    }
  };
  const [openNav, setOpenNav] = useState(false);
  const Component: ComponentType<GeneralPropType> = component;
  return status && isFetching ? (
    <React.Fragment>
      <Box className='my-container'>
        <Box>
          <Sidenav onClose={() => setOpenNav(false)} open={openNav} />
          <Navbar onNavOpen={() => setOpenNav(true)} />
        </Box>
        <LayoutRoot>
          <LayoutContainer>
            <Component userData={userData} />
          </LayoutContainer>
        </LayoutRoot>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Box sx={{ height: "100vh", margin: "auto", display: "flex" }}>
        <Loader />
      </Box>
    </React.Fragment>
  );
}

export default AuthGuards;
