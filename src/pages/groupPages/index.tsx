import { Add } from "@mui/icons-material";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import UserImg from "./../../assets/avatar.jpg";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, groupDataType } from "../../redux/groupSlice";
import { AppDispatch, Rootstate } from "../../redux/store";
import GroupForm from "./GroupForm";
import GroupCard from "./GroupCard";
import NoDataFound from "../errorPages/NoDataFound";
function Groups() {
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });
  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   profile?.email && dispatch(getGroups(profile?.email));
  // }, []);

  return (
    <div>
      <Box
        key='GroupListBox'
        margin='0px 16px'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className='groups-page-heading'
      >
        <Typography className='groups-page-title' variant='h4' textAlign='left'>
          Your Groups
        </Typography>
        <GroupForm
          ModelButtonStyle={{
            borderRadius: "16px",
            width: "32px",
            margin: "0px 10px",
            height: "32px",
          }}
        />
      </Box>
      <Divider className='divider-bottom' />
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          {groupList.length > 0 ? (
            groupList.map((group: groupDataType, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <GroupCard groupItem={group} />
              </Grid>
            ))
          ) : (
            <Box key='noData'>
              <NoDataFound />
            </Box>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Groups;
