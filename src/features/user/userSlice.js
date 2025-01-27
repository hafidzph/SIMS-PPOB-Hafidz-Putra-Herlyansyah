import { createSlice } from "@reduxjs/toolkit";
import {
  getInformationProfileAsync,
  loginAsync,
  registerAsync,
  updateProfileAsync,
  updateProfileImageAsync,
} from "./userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    balance: 0,
    showSaldo: true,
    loading: false,
    message: "",
    error: "",
  },
  reducers: {
    setShowSaldo: (state) => {
      state.showSaldo = !state.showSaldo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      });

    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getInformationProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInformationProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.profile.data;
        state.balance = action.payload.balance.data;
      })
      .addCase(getInformationProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateProfileImageAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateProfileImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      });

    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
      });
  },
});

export const { setShowSaldo } = userSlice.actions;

export default userSlice.reducer;
