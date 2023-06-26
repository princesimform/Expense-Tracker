import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import React from "react";
import { Rootstate } from "./store";
import GroupFirestoreService from "../libs/services/firebase/groupFirestoreServices";

export const setData = createAsyncThunk(
  "firestore/setData",
  async (data: groupDataType) => {
    return await GroupFirestoreService.addGroup(data);
  }
);

export const updateData = createAsyncThunk(
  "firestore/updateData",
  async (data: groupDataType) => {
    return await GroupFirestoreService.updateGroup(data);
  }
);

// export const DeleteData = createAsyncThunk(
//   "firestore/deleteData",
//   async (data: groupDataType) => {
//     return await GroupFirestoreService.deleteGroup(data);
//   }
// );

export const getGroups = createAsyncThunk(
  "firestore/getData",
  async (email: string) => {
    return await GroupFirestoreService.getGroups(email);
  }
);

export interface groupDataType {
  id: string;
  name: string;
  group_image: string;
  admin_user_id: string;
  admin_user_name: string | null;
  member_list: string[] | [];
  created_at: string;
  deleted_at: string;
}
export interface groupStateType {
  groupList: groupDataType[];
}
const initalGroupState: groupStateType = { groupList: [] };

export const groupSlice = createSlice({
  name: "groupSlice",
  initialState: initalGroupState,
  reducers: {
    getGroupList(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(setData.fulfilled, (state, action) => {
      const { res } = action.payload;
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.status) {
        state.groupList = response.data;
      } else {
        throw new Error("Something went wrong in fetch group");
      }
    });
    builder.addCase(updateData.fulfilled, (state, action) => {
      console.log(action.payload);
      // state.groupList = groupList;
    });
  },
});

export const groupActions = groupSlice.actions;
