import { Add } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import UserImg from "./../../assets/avatar.jpg";

import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroups,
  groupActions,
  groupDataType,
  setData,
} from "../../redux/groupSlice";
import { Rootstate } from "../../redux/store";
import GroupForm from "./GroupForm";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GroupCard from "./GroupCard";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType extends GeneralPropType {}
function Groups({ userData }: PropType) {
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups(userData?.email));
  }, []);

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="groups-page-heading"
      >
        <Typography className="groups-page-title" variant="h4" textAlign="left">
          Your Groups
        </Typography>
        <GroupForm />
      </Box>
      <Divider className="group-title-divider" />
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {groupList.length >= 0 ? (
            groupList.map((group: groupDataType) => (
              <>
                <Grid item xs={12} sm={6} lg={4} key={group.created_at}>
                  <GroupCard userData={userData} groupItem={group} />
                </Grid>
                {/* <p key={group.created_at}>{group.name}</p>{" "} */}
              </>
            ))
          ) : (
            <p>No data avaliable</p>
          )}

          <Grid item xs={12} sm={6} lg={4}>
            {/* <GroupCard /> */}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <GroupForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Groups;
