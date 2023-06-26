import { Add } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import UserImg from "./../../assets/avatar.jpg";

import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, groupDataType } from "../../redux/groupSlice";
import { AppDispatch, Rootstate } from "../../redux/store";
import GroupForm from "./GroupForm";
import GroupCard from "./GroupCard";
import { GeneralPropType } from "../../routes/AuthRoutes";
import NoDataFound from "../errorPages/NoDataFound";
interface PropType extends GeneralPropType {}
function Groups({ userData }: PropType) {
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    userData?.email && dispatch(getGroups(userData?.email));
  }, []);

  return (
    <div>
      <Box
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
          userData={userData}
        />
      </Box>
      <Divider className='divider-bottom' />
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          {groupList.length > 0 ? (
            groupList.map((group: groupDataType) => (
              <>
                <Grid item xs={12} sm={6} lg={4} key={group.created_at}>
                  <GroupCard userData={userData} groupItem={group} />
                </Grid>
              </>
            ))
          ) : (
            <NoDataFound />
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Groups;
