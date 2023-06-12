import React, { useEffect } from "react";
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
import { groupDataType } from "../../redux/groupSlice";
import { useNavigate } from "react-router-dom";

function GroupCard({
  groupItem,
}: {
  groupItem: groupDataType;
}) {
  const nevagite = useNavigate();
  console.log(groupItem);

  return (
    <>
      <Card
        className='group-card'
        elevation={3}
        onClick={() => nevagite(`/group/${groupItem.id}`)}
      >
        <CardContent>
          <Stack display='flex' alignItems='flex-start' direction='row'>
            <Avatar src={groupItem.group_image} alt='GroupImage' />
            <Stack sx={{ textAlign: "left", ml: 2 }}>
              <Typography fontWeight={"bolder"}>
                {groupItem.name}
              </Typography>
              <Typography variant='caption'>
                Created By : {groupItem.admin_user_name}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ textAlign: "left", py: 2 }} spacing={5}>
            <Typography color={"lightgreen"} fontWeight={"bold"}>
              you are owned : $400
            </Typography>
            <Typography color={"darkred"} fontWeight={"bold"}>
              you are owned : $400
            </Typography>
          </Stack>
          <Stack
            display='flex'
            alignItems='flex-start'
            direction='row'
            justifyContent='space-between'
          >
            <Stack alignContent='center'>
              <Button className='leave-btn'>Leave Group</Button>
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
    </>
  );
}

export default GroupCard;
