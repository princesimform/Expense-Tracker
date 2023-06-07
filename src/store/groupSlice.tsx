import {
  AnyAction,
  AsyncThunk,
  AsyncThunkAction,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  createSlice,
  ThunkAction,
} from "@reduxjs/toolkit";
import React from "react";
import FirestoreService from "../components/services/firestore";
import { AppDispatch } from "./store";

type SetDataPayload = {
  id: string;
};

export const setData: any = createAsyncThunk(
  "firestore/setData",
  async (data) => {
    const docId = await FirestoreService.addDataToFirestore(data, "groups");
    return { docId };
  }
);
const initalGroupState: any[] = [];

export const groupSlice = createSlice({
  name: "groupSlice",
  initialState: initalGroupState,
  reducers: {
    dataAdded(state, action) {
      console.log(action.payload);
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
  },
});

export const groupActions = groupSlice.actions;
