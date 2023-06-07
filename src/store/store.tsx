import { configureStore } from "@reduxjs/toolkit";
import { groupSlice } from "./groupSlice";

const store = configureStore({
  reducer: {
    groupReducer: groupSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch
export default store;
