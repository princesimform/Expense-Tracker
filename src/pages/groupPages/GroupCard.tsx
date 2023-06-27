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
import { groupDataType } from "../../redux/groupSlice";
import { useNavigate } from "react-router-dom";
import GroupWiseSetttlement from "../../components/settlement/GroupWiseSetttlement";
interface PropType {
  groupItem: groupDataType;
}
function GroupCard({ groupItem }: PropType) {
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
                Created By : {groupItem.admin}
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ textAlign: "left", py: 2 }} spacing={5}>
            <GroupWiseSetttlement groupName={groupItem.name} />
          </Stack>
          <Stack
            display='flex'
            alignItems='flex-start'
            direction='row'
            justifyContent='space-between'
          >
            <Stack alignContent='center'>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => navigate(`/group/${groupItem.id}`)}
              >
                View Group
              </Button>
            </Stack>
            <Stack>
              <AvatarGroup max={3}>
                {groupItem.member_list.length > 0 ? (
                  groupItem.member_list.map((member, index) => {
                    return <Avatar key={index} alt={member} src={"asd"} />;
                  })
                ) : (
                  <></>
                )}
              </AvatarGroup>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default GroupCard;
