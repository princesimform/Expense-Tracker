import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroups,
  groupDataType,
  setData,
  updateData,
} from "../../redux/groupSlice";
import AddGroupImg from "./../../assets/add_group.png";
import { Field, Form, Formik } from "formik";
import { AddGroupSchema } from "../../libs/services/ValidationSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AuthService from "../../libs/services/firebase/auth";
import useToggle from "../../customHooks/useToggle";
import { Rootstate } from "../../redux/store";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  selectedFriends: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedFriends.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddExpenseForm({ FriendsList }: { FriendsList: string[] }) {
  const theme = useTheme();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const { groupList } = useSelector((state: Rootstate) => state.groupReducer);
  let FriendsSelectList: string[] = [];
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
  });
  groupList.map((group) => {
    FriendsSelectList.unshift(group.name);
    group.member_list.map((member) => {
      FriendsSelectList.push(member);
    });
  });
  async function updateList() {
    FriendsList.map((item) => {
      FriendsSelectList.push(item);
    });
    FriendsSelectList = FriendsSelectList.filter(
      (val, id, FriendsSelectList) => FriendsSelectList.indexOf(val) == id
    );
  }

  useEffect(() => {
    updateList();
    console.log(" i am Updating");
  }, [toggles]);

  console.log(groupList);

  const buttonValue = "Create";
  console.log("FriendsSelectList");
  console.log(FriendsSelectList);

  const handleChange = (event: SelectChangeEvent<typeof selectedFriends>) => {
    const {
      target: { value },
    } = event;
    setSelectedFriends(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id='demo-multiple-chip-label'>Chip</InputLabel>
          <Select
            labelId='demo-multiple-chip-label'
            id='demo-multiple-chip'
            multiple
            value={selectedFriends}
            onChange={handleChange}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {FriendsSelectList.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectedFriends, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button onClick={() => toggle("isModleOpen")}>{buttonValue}</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={toggles.isModleOpen}
        // onClose={handleModleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={toggles.isModleOpen}>
          <Box sx={style}>
            <Typography
              id='transition-modal-title'
              variant='h5'
              sx={{ textAlign: "center", mb: 2 }}
              component='h2'
            >
              Create Expanse
              <Button variant='contained' onClick={() => toggle("isModleOpen")}>
                Cancle
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AddExpenseForm;
