import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  profile,
  register,
  updateProfile,
  updateProfileImage,
} from "../../services/user";
import { balance } from "../../services/transaction";

export const registerAsync = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await register(user);
      return response.data.message;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await login(user);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getInformationProfileAsync = createAsyncThunk(
  "user/information",
  async (_, { rejectWithValue }) => {
    try {
      const [profileRes, balanceRes] = await Promise.all([
        profile(),
        balance(),
      ]);

      return {
        profile: profileRes.data,
        balance: balanceRes.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfileImageAsync = createAsyncThunk(
  "user/profile/image",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateProfileImage(formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  "user/profile/update",
  async (user, { rejectWithValue }) => {
    try {
      const response = await updateProfile(user);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
