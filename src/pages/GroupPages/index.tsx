import { Add } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  AvatarGroup,
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
import { getGroups, groupActions, setData } from "../../redux/groupSlice";
import { Rootstate } from "../../redux/store";
import AddGroup from "./AddGroup";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
function Groups() {
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return (
    <div>
      <AddGroup />
      {groupList.length >= 0 ? (
        groupList.map((group) => <p key={group.created_at}>{group.name}</p>)
      ) : (
        <p>No data avaliable</p>
      )}

      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                border: 2,
                // borderColor: (theme) => alpha(theme.palette.primary.main, 0.8),
                borderColor: "hsl(263deg 54% 59% / 80%)",
                backgroundColor: "hsl(263deg 54% 59% / 80%)",
                color: "white",
                borderRadius: 3,
              }}
              elevation={3}
            >
              <CardContent>
                <Stack display='flex' alignItems='flex-start' direction='row'>
                  <Avatar></Avatar>
                  <Stack sx={{ textAlign: "left", ml: 2 }}>
                    <Typography fontWeight={"bolder"} >Group Name</Typography>
                    <Typography variant='caption'>
                      Created By : Prince Makavana
                    </Typography>
                  </Stack>
                </Stack>
                <Stack sx={{ textAlign: "left", py: 2 }} spacing={5}>
                  <Typography>
                    Inventore, id architecto enim vitae quasi doloribus pariatur
                    obcaecati,
                  </Typography>
                </Stack>
                <Stack
                  display='flex'
                  alignItems='flex-start'
                  direction='row'
                  justifyContent='space-between'
                >
                  <Stack>
                    <Button>Leave Group</Button>
                  </Stack>
                  <Stack>
                    <AvatarGroup max={3}>
                      <Avatar alt='Remy Sharp' src={UserImg} />
                      <Avatar alt='Travis Howard' src={UserImg} />
                      <Avatar alt='Cindy Baker' src={UserImg} />
                      <Avatar alt='Agnes Walker' src={UserImg} />
                      <Avatar alt='Trevor Henderson' src={UserImg} />
                    </AvatarGroup>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Groups;
