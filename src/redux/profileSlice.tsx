import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProfileService from "../libs/services/firebase/profile";

export const setProfile: any = createAsyncThunk(
  "profile/setProfile",
  async (data) => {
    return await ProfileService.addProfile(data);
  }
);

export const getProfile: any = createAsyncThunk(
  "profile/getProfile",
  async (u_id) => {
    return await ProfileService.getProfile(u_id);
  }
);

export const updateProfile: any = createAsyncThunk(
  "profile/updateProfile",
  async (data) => {
    return await ProfileService.updateProfile(data);
  }
);

export interface profileDataType {
  u_id: string;
  displayName: string;
  photoURL: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  description: string;
}

export interface profileStateType {
  profile: profileDataType | null;
}

const initalProfileState: profileStateType = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "ProfileSlice",
  initialState: initalProfileState,
  reducers: {
    // getProfile(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(setProfile.fulfilled, (state, action) => {});
    builder.addCase(getProfile.fulfilled, (state, action) => {
      const res: profileDataType = action.payload.data;
      state.profile = null;
      state.profile = res;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const res = action.payload;
      console.log(res);
    });
  },
});

export const profileActions = profileSlice.actions;
