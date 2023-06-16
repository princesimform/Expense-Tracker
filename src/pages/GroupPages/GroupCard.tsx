import React from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import UserImg from "./../../assets/avatar.jpg";
import { groupDataType } from "../../redux/groupSlice";
import { useNavigate } from "react-router-dom";
import { GeneralPropType } from "../../routes/AuthRoutes";
interface PropType extends GeneralPropType {
  groupItem: groupDataType;
}
function GroupCard({ groupItem, userData }: PropType) {
  const navigate = useNavigate();

  return (
    <>
      <Card
        className='group-card'
        elevation={3}
        onClick={() => navigate(`/group/${groupItem.id}`)}
      >
        <CardContent>
          <Stack display='flex' alignItems='flex-start' direction='row'>
            <Avatar src={groupItem.group_image} alt='GroupImage' />
            <Stack sx={{ textAlign: "left", ml: 2 }}>
              <Typography fontWeight={"bolder"}>{groupItem.name}</Typography>
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
              <Button variant='contained' color='secondary'>
                Leave Group
              </Button>
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
