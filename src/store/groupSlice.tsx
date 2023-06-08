import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import FirestoreService from "../components/Services/firestore";

export const setData: any = createAsyncThunk(
  "firestore/setData",
  async (data) => {
    const docId = await FirestoreService.addDataToFirestore(data, "groups");
    return { docId };
  }
);

export const getGroups: any = createAsyncThunk(
  "firestore/getData",
  async () => {
    const groupList = await FirestoreService.getGroups();
    return { groupList };
  }
);

export interface groupDataType {
  name: string;
  group_image: string;
  created_at: string;
  admin_user_id: string;
}
export interface groupStateType {
  groupList: groupDataType[] | [];
}
const initalGroupState: groupStateType = { groupList: [] };

export const groupSlice = createSlice({
  name: "groupSlice",
  initialState: initalGroupState,
  reducers: {
    getGroupList(state, action) {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setData.fulfilled, (state, action) => {
      const { docId } = action.payload;
      console.log("you are from thunk");
      console.log(docId);
    });
    builder.addCase(setData.rejected, (state, action) => {
      console.log("you are rejected");
      throw new Error("are you here ");
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      const { groupList } = action.payload;
      state.groupList = groupList;
    });
    builder.addCase(getGroups.rejected, (state, action) => {
      console.log("you are rejected");
      throw new Error("are you here ");
    });
  },
});

export const groupActions = groupSlice.actions;
