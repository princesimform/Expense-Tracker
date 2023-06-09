import { configureStore } from "@reduxjs/toolkit";
import { groupSlice, groupStateType } from "./groupSlice";

export interface Rootstate {
  groupReducer: groupStateType;
}

const store = configureStore({
  reducer: {
    groupReducer: groupSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
