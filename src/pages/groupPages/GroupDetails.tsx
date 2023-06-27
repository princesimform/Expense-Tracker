import {
  Avatar,
  Box,
  Divider,
  Grid,
  Stack,
  styled,
  Tab,
  TableCell,
  tableCellClasses,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GroupExpense from "./GroupExpense";
import GroupForm from "./GroupForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import { groupDataType } from "../../redux/groupSlice";
import AddExpenseForm from "../expensePages/AddExpanseForm";
import { expenseDataType } from "../../redux/expanseSlice";
import Loader from "../../components/Loader";
import { useSnackbar } from "notistack";
import GroupDeleteForm from "./GroupDeleteForm";
import GroupMemberPage from "./GroupMemberPage";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function GroupDetails() {
  const { profile } = useSelector((state: Rootstate) => {
    return state.profileReducer;
  });

  const [tabNumber, setTabNumber] = useState(0);
  const { id } = useParams();
  const [groupMembers, setGroupMember] = useState<string[]>([]);
  const [activeGroupExpense, setActiveGroupExpenseList] =
    useState<expenseDataType[]>();
  const [settleGroupExpense, setSettleGroupExpenseList] =
    useState<expenseDataType[]>();
  const { expenseList } = useSelector(
    (state: Rootstate) => state.expenseReducer
  );

  const groupData: groupDataType = useSelector((state: Rootstate) => {
    const data = state.groupReducer;
    const Newdata = data.groupList.filter(
      (group: groupDataType) => group.id == id
    );

    return Newdata[0];
  });

  useEffect(() => {
    if (groupData != undefined) {
      const activeGroupExpenseList: expenseDataType[] = [];
      const settleGroupExpenseList: expenseDataType[] = [];
      expenseList.forEach((expense) => {
        if (expense.group_list?.indexOf(groupData.name) >= 0) {
          if (expense.isSettle) {
            settleGroupExpenseList.push(expense);
          } else {
            activeGroupExpenseList.push(expense);
          }
        }
      });
      setSettleGroupExpenseList(settleGroupExpenseList);
      setActiveGroupExpenseList(activeGroupExpenseList);
      setGroupMember(groupData.member_list);
    }
  }, [expenseList]);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  if (groupData != undefined)
    return (
      <>
        <Box className='group-detail-page' padding='16px'>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            className='groups-page-heading'
          >
            <Box display='flex' alignItems='center'>
              <Avatar alt='sdf' src={groupData.group_image} />
              <Typography
                className='groups-page-title'
                variant='h4'
                textAlign='left'
              >
                {groupData.name}
              </Typography>
            </Box>
            <Box>
              <GroupForm
                ModelButtonStyle={{
                  borderRadius: "16px",
                  width: "32px",
                  margin: "5px 10px",
                  height: "32px",
                }}
                groupData={groupData}
              />
            </Box>
          </Box>
          <Divider className='divider-bottom' />
          <Stack>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={6}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    className='group-expense-heading'
                    variant='h6'
                    margin={"auto 0"}
                  >
                    Expenses
                  </Typography>
                  <AddExpenseForm
                    ModelButtonStyle={{
                      borderRadius: "16px",
                      width: "32px",
                      margin: "10px",
                      height: "32px",
                    }}
                    FriendsList={groupData.member_list}
                  />
                </Box>
                <Divider />

                {activeGroupExpense != undefined &&
                settleGroupExpense != undefined ? (
                  <>
                    <Box className='group-tab-box'>
                      <Tabs
                        value={tabNumber}
                        onChange={handleTab}
                        aria-label='basic tabs example'
                      >
                        <Tab
                          label={"Active - " + activeGroupExpense.length}
                          {...a11yProps(0)}
                        />
                        <Tab
                          label={"Settled - " + settleGroupExpense.length}
                          {...a11yProps(1)}
                        />
                      </Tabs>
                    </Box>

                    {/* Active Box  */}
                    <GroupExpense
                      value={tabNumber}
                      index={0}
                      groupExpenseList={activeGroupExpense}
                    ></GroupExpense>
                    {/* Settled Box  */}
                    <GroupExpense
                      value={tabNumber}
                      index={1}
                      groupExpenseList={settleGroupExpense}
                    ></GroupExpense>
                  </>
                ) : (
                  <Loader />
                )}
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <GroupMemberPage
                  groupMembers={groupMembers}
                  groupData={groupData}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                {profile?.email == groupData.admin && (
                  <GroupDeleteForm groupData={groupData} />
                )}
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </>
    );
  else return <Loader />;
}

export default GroupDetails;
