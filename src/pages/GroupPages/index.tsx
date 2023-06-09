import { Button, TextField } from "@mui/material";
import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, groupActions, setData } from "../../redux/groupSlice";
import { Rootstate } from "../../redux/store";
import AddGroup from "./AddGroup";

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
    </div>
  );
}

export default Groups;
