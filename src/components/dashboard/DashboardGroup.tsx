import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../pages/groupPages/GroupCard";
import { groupDataType } from "../../redux/groupSlice";

interface PropType {
  groups: groupDataType[];
}
function DashboardGroup({ groups }: PropType) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        key='dashboardList'
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
      </Box>
      <Divider className='divider-bottom' />
      {groups.length > 0 ? (
        <Container maxWidth='xl'>
          <Grid container spacing={3}>
            {groups.length > 0 ? (
              groups.map((group: groupDataType, index) => (
                <>
                  {index < 3 && (
                    <Grid item xs={12} sm={6} lg={4} key={group.created_at}>
                      <GroupCard groupItem={group} />
                    </Grid>
                  )}
                </>
              ))
            ) : (
              <p key={"noGroupAvaliable"}>No data avaliable</p>
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
