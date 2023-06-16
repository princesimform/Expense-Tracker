import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import React from "react";
import ExpenseFirestoreService from "../libs/services/firebase/expenseFirestore";
import FirestoreService from "../libs/services/firebase/firestore";
import { Rootstate } from "./store";

export const setExpense: any = createAsyncThunk(
  "firestore/setExpense",
  async (data) => {
    const docData = await ExpenseFirestoreService.addExpenseToFirestore(
      data,
      "expenses"
    );
    return { docData };
  }
);

export const getExpenses: any = createAsyncThunk(
  "firestore/getExpenses",
  async (email) => {
    const docData = await ExpenseFirestoreService.getExpensesFromFirestore(
      email,
      "expenses"
    );
    console.log("i am from doc data");
    console.log(docData);
    return { docData };
  }
);

export interface expenseDataType {
  title : string;
  expense_description: string;
  member_list: string[] | null;
  expense_file_url: string;
  expense_amount: number;
  paid_by: string;
  currency_type: string;
  expense_date: string;
  created_at: string;
  isSettle: boolean;
  group_list: string[];
  expense_file: File | null;
}

export interface expenseStateType {
  expenseList: expenseDataType[];
}
const initalExpenseState: expenseStateType = { expenseList: [] };

export const expenseSlice = createSlice({
  name: "groupSlice",
  initialState: initalExpenseState,
  reducers: {
    getExpenseList(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(setExpense.fulfilled, (state, action) => {
      const { docData } = action.payload;
      if (docData.status) {
      }
      console.log("you are from thunk");
      console.log(docData);
    });
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      const { docData } = action.payload;
      console.log(docData);

      if (docData.status) {
        state.expenseList = docData.data;
      }
      console.log("you are from thunk");
      console.log(docData);
    });
  },
});

export const expenseActions = expenseSlice.actions;
