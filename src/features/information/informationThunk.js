import { createAsyncThunk } from "@reduxjs/toolkit";
import { banner, services } from "../../services/information";

export const getInformationAsync = createAsyncThunk(
  "information/assets",
  async (_, { rejectWithValue }) => {
    try {
      const [bannerRes, servicesRes] = await Promise.all([
        banner(),
        services(),
      ]);
      return {
        banner: bannerRes.data.data,
        services: servicesRes.data.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
