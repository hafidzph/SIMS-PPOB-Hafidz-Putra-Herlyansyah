import { createSlice } from "@reduxjs/toolkit";
import {
  serviceTransactionAsync,
  topUpAsync,
  transactionHistoryAsync,
} from "./transactionThunk";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    error: null,
    loading: false,
    message: null,
  },
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(topUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(topUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });

    builder
      .addCase(transactionHistoryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionHistoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.records;
        state.error = null;
      })
      .addCase(transactionHistoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.transactions = [];
        state.error = action.payload;
      });

    builder
      .addCase(serviceTransactionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(serviceTransactionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(serviceTransactionAsync.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.payload;
      });
  },
});

export const { clearState } = transactionSlice.actions;

export default transactionSlice.reducer;
