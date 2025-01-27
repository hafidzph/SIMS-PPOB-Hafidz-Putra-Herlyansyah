import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  serviceTransaction,
  topup,
  transactionHistory,
} from "../../services/transaction";

export const topUpAsync = createAsyncThunk(
  "transaction/topUp",
  async (nominal, { rejectWithValue }) => {
    try {
      const response = await topup(nominal);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const serviceTransactionAsync = createAsyncThunk(
  "transaction/service",
  async (service_code, { rejectWithValue }) => {
    try {
      const response = await serviceTransaction(service_code);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const transactionHistoryAsync = createAsyncThunk(
  "transaction/history",
  async (offset, { rejectWithValue }) => {
    try {
      const response = await transactionHistory(offset);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
