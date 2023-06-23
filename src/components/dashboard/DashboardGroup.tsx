import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../pages/groupPages/GroupCard";
import GroupForm from "../../pages/groupPages/GroupForm";
import { groupDataType } from "../../redux/groupSlice";
import { GeneralPropType } from "../../routes/AuthRoutes";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface PropType extends GeneralPropType {
  groups: groupDataType[];
}
function DashboardGroup({ userData, groups }: PropType) {
  const navigate = useNavigate();
  return (
    <>
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
        <Button
          variant='contained'
          color='secondary'
          onClick={() => navigate("/group")}
        >
          View Group
        </Button>
        {/* <GroupForm
          ModelButtonStyle={{
            width: "32px",
            borderRadius: "16px",
            margin: "0px 10px",
            height: "32px",
            // value: "Create",
          }}
          userData={userData}
        /> */}
      </Box>
      <Divider className='divider-bottom' />
      {groups.length > 0 ? (
        <Container maxWidth='xl'>
          <Grid container spacing={3}>
            {groups.length >= 0 ? (
              groups.map((group: groupDataType, index) => (
                <>
                  {index < 3 && (
                    <Grid item xs={12} sm={6} lg={4} key={group.created_at}>
                      <GroupCard userData={userData} groupItem={group} />
                    </Grid>
                  )}
                  {/* <p key={group.created_at}>{group.name}</p>{" "} */}
                </>
              ))
            ) : (
              <p>No data avaliable</p>
            )}
          </Grid>
        </Container>
      ) : (
        <>
          <Typography>No Data Avaliable</Typography>
        </>
      )}
    </>
  );
}

export default DashboardGroup;
