import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddExpense from "../expanse/AddExpense";
import GroupExpense from "./GroupExpense";
import GroupForm from "./GroupForm";
import { DeleteForeverOutlined, Edit, ForkRight } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";
import { DeleteData, groupDataType } from "../../redux/groupSlice";
import FirestoreService from "../../libs/services/firebase/firestore";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// const columns: readonly Column[] = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
//   {
//     id: "population",
//     label: "Population",
//     minWidth: 170,
//     align: "right",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "size",
//     label: "Size\u00a0(km\u00b2)",
//     minWidth: 170,
//     align: "right",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "density",
//     label: "Density",
//     minWidth: 170,
//     align: "right",
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function GroupDetails() {
  const [tabNumber, setTabNumber] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const groupData: groupDataType = useSelector((state: Rootstate) => {
    console.log("data");
    const data = state.groupReducer;
    console.log(data);
    const Newdata = data.groupList.filter(
      (group: groupDataType) => group.id == id
    );
    return Newdata[0];
  });
  const nevagite = useNavigate();

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };
  useEffect(() => {}, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteGroup = async (groupData: groupDataType) => {
    console.log(groupData);
    // dispatch(DeleteData(groupData));
    const response = await FirestoreService.deleteDataToFirestore(
      groupData,
      "groups"
    );
    if (response.status) {
      setOpenDialog(false);
      nevagite("/group");
    } else {
      throw new Error("Something went Wrong");
    }
  };
  return (
    <>
      <Box className="group-detail-page" padding="16px">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="groups-page-heading"
        >
          <Box display="flex" alignItems="center">
            <Avatar alt="sdf" src={groupData.group_image} />
            <Typography
              className="groups-page-title"
              variant="h4"
              textAlign="left"
            >
              {groupData.name}
            </Typography>
          </Box>
          <Box>
            <AddExpense />
            <GroupForm groupData={groupData} />
          </Box>
        </Box>
        <Divider className="group-title-divider" />
        <Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={6}>
              <Typography className="group-expense-heading" variant="h6">
                Expenses
              </Typography>

              <Box className="group-tab-box">
                <Tabs
                  value={tabNumber}
                  onChange={handleTab}
                  aria-label="basic tabs example"
                >
                  <Tab label="Active" {...a11yProps(0)} />
                  <Tab label="Settled" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <GroupExpense value={tabNumber} index={0}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableBody>
                        {/* {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return ( */}
                        <TableRow hover role="checkbox" tabIndex={-1} key={1}>
                          <TableCell
                            key={1}
                            // align={column.align}
                          >
                            {/* {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value} */}
                            <Box>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="group-expanse-name"
                              >
                                Rent
                                <Typography className="group-expanse-amount">
                                  $999.00
                                </Typography>
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box>
                              <Typography fontWeight="bold">
                                <span className="text-slate-500">Paid by </span>
                                Demo3
                              </Typography>
                              <Typography>
                                <span className="text-slate-500 font-bold">
                                  on{" "}
                                </span>
                                Sun, 19 Jun 2022
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box color="red">
                              <Typography>You Owe</Typography>
                              <Typography fontWeight="bold">$333.00</Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box>
                              <ChevronRightIcon />
                            </Box>
                          </TableCell>

                          {/* {
                                columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                  );
                                })} */}
                        </TableRow>
                        <TableRow hover role="checkbox" tabIndex={-1} key={1}>
                          <TableCell
                            key={1}
                            // align={column.align}
                          >
                            {/* {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value} */}
                            <Box>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="group-expanse-name"
                              >
                                Rent
                                <Typography className="group-expanse-amount">
                                  $999.00
                                </Typography>
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box>
                              <Typography fontWeight="bold">
                                <span className="text-slate-500">Paid by </span>
                                Demo3
                              </Typography>
                              <Typography>
                                <span className="text-slate-500 font-bold">
                                  on{" "}
                                </span>
                                Sun, 19 Jun 2022
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box color="green">
                              <Typography>You Owe</Typography>
                              <Typography fontWeight="bold">$333.00</Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box>
                              <ChevronRightIcon />
                            </Box>
                          </TableCell>

                          {/* {
                                columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                  );
                                })} */}
                        </TableRow>

                        {/* );
                          })} */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  /> */}
                </Paper>
                {/* <Box>
                  <Box display='flex' textAlign='left'>
                    <Box>
                      <Typography>Rent</Typography>
                      <Typography>$900.00</Typography>
                    </Box>
                    <Box>
                      <Typography>Paid By Username</Typography>
                      <Typography>on Sun,19 Jun 2022</Typography>
                    </Box>
                    <Box>
                      <Typography>You Owe</Typography>
                      <Typography>$ 333.00</Typography>
                    </Box>
                    <Box>
                      <ChevronRightIcon />
                    </Box>
                  </Box>
                </Box> */}
              </GroupExpense>
              <GroupExpense value={tabNumber} index={1}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableBody>
                        {/* {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return ( */}
                        <TableRow hover role="checkbox" tabIndex={-1} key={1}>
                          <TableCell
                            key={1}
                            // align={column.align}
                          >
                            {/* {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value} */}
                            <Box>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="group-expanse-name"
                              >
                                Rent
                                <Typography className="group-expanse-amount">
                                  $999.00
                                </Typography>
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box>
                              <Typography fontWeight="bold">
                                <span className="text-slate-500">Paid by </span>
                                Demo3
                              </Typography>
                              <Typography>
                                <span className="text-slate-500 font-bold">
                                  on{" "}
                                </span>
                                Sun, 19 Jun 2022
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box color="green">
                              <Typography>You Owe</Typography>
                              <Typography fontWeight="bold">$333.00</Typography>
                            </Box>
                          </TableCell>
                          <TableCell key={1}>
                            <Box>
                              <ChevronRightIcon />
                            </Box>
                          </TableCell>

                          {/* {
                                columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                  );
                                })} */}
                        </TableRow>

                        {/* );
                          })} */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  /> */}
                </Paper>
              </GroupExpense>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box>
                <Typography className="group-expense-heading" variant="h6">
                  Add Member
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={9} lg={9}>
                    <TextField fullWidth size="small" />
                  </Grid>
                  <Grid item xs={12} sm={3} lg={3}>
                    <Button type="submit" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Paper sx={{ marginTop: 4 }}>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>
                          <Typography variant="h6" fontWeight="bold">
                            Members
                          </Typography>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow key={1}>
                        <StyledTableCell component="th" scope="row">
                          <Stack
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Typography>MemberName</Typography>
                            <Box color="red">
                              <DeleteForeverOutlined />
                            </Box>
                          </Stack>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box padding={1} border="2px dashed red">
                <Typography variant="h6" fontWeight="bold" textAlign="left">
                  Danger Zone
                </Typography>
                <Box margin={1}>
                  <Button
                    fullWidth
                    color="error"
                    onClick={() => setOpenDialog(true)}
                  >
                    Delete Group
                  </Button>

                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are You Sure?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        We Are Delete Your all transaction which are done in
                        this group
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpenDialog(false)}>
                        Disagree
                      </Button>
                      <Button onClick={() => deleteGroup(groupData)} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

export default GroupDetails;
