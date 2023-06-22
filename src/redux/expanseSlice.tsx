import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import React from "react";
import ExpenseFirestoreService from "../libs/services/firebase/expenseFirestore";
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
    return { docData };
  }
);

export const updateExpense: any = createAsyncThunk(
  "firestore/updateExpenses",
  async (data) => {
    const docData = await ExpenseFirestoreService.updateExpenseToFirestore(
      data,
      "expenses"
    );
    return { docData };
  }
);

export const deleteExpense: any = createAsyncThunk(
  "firestore/deleteExpenses",
  async (data) => {
    const docData = await ExpenseFirestoreService.deleteExpenseToFirestore(
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
  created_at: string;
  isSettle: boolean;
  settleBy: string;
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
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      const { docData } = action.payload;
      if (docData.status) {
        console.log(docData);
      }
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      const { docData } = action.payload;
      if (docData.status) {
        console.log(docData);
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
