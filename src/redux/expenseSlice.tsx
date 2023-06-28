import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import React from "react";
import ExpenseFirestoreService from "../services/firebase/expenseFirestore";
import { Rootstate } from "./store";

export const setExpense = createAsyncThunk(
  "firestore/setExpense",
  async (data : expenseDataType) => {
    const docData = await ExpenseFirestoreService.addExpenseToFirestore(
      data ,
      "expenses"
    );
    return { docData };
  }
);

export const getExpenses = createAsyncThunk(
  "firestore/getExpenses",
  async (email : string) => {
    const docData = await ExpenseFirestoreService.getExpensesFromFirestore(
      email,
      "expenses"
    );
    return { docData };
  }
);

export const updateExpense = createAsyncThunk(
  "firestore/updateExpenses",
  async (data : expenseDataType) => {
    const docData = await ExpenseFirestoreService.updateExpenseToFirestore(
      data,
      "expenses"
    );
    return { docData };
  }
);

export interface expenseDataType {
  id: number;
  title: string;
  expense_description: string;
  member_list: string[] | null;
  expense_file_url: string;
  expense_amount: number;
  paid_by: string;
  currency_type: string;
  expense_date: string;
  isSettle: boolean;
  settleBy: string;
  type_of_settle: string; // online/Ofline
  group_list: string[];
  expense_file: File | null;
  created_at: string;
  deleted_at: string;
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
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      const { docData } = action.payload;
      if (docData.status) {
      }
    });
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      const { docData } = action.payload;

      if (docData.status) {
        state.expenseList = docData.data;
      }
    });
  },
});

export const expenseActions = expenseSlice.actions;
