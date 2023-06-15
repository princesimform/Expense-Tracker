import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./expanseSlice";
import { groupSlice, groupStateType } from "./groupSlice";

// export interface Rootstate {
//   groupReducer: groupStateType;
// }

const rootReducer = combineReducers({
  groupReducer: groupSlice.reducer,
  expenseReducer: expenseSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export type Rootstate = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
