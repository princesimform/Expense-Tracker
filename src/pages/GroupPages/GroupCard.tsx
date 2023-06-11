import React from "react";
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

function GroupCard() {
  return (
    <>
      <Card
      className="group-cards"
        elevation={3}
      >
        <CardContent>
          <Stack display="flex" alignItems="flex-start" direction="row">
            <Avatar></Avatar>
            <Stack sx={{ textAlign: "left", ml: 2 }}>
              <Typography fontWeight={"bolder"}>Group Name</Typography>
              <Typography variant="caption">
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
            display="flex"
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
          >
            <Stack>
              <Button className="leave-btn">Leave Group</Button>
            </Stack>
            <Stack>
              <AvatarGroup max={3}>
                <Avatar alt="Remy Sharp" src={UserImg} />
                <Avatar alt="Travis Howard" src={UserImg} />
                <Avatar alt="Cindy Baker" src={UserImg} />
                <Avatar alt="Agnes Walker" src={UserImg} />
                <Avatar alt="Trevor Henderson" src={UserImg} />
              </AvatarGroup>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default GroupCard;
