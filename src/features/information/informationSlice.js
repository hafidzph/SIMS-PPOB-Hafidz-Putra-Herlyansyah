import { createSlice } from "@reduxjs/toolkit";
import { getInformationAsync } from "./informationThunk";

const informationSlice = createSlice({
  name: "information",
  initialState: {
    banner: null,
    services: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInformationAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInformationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload.banner;
        state.services = action.payload.services;
      });
  },
});

export default informationSlice.reducer;
