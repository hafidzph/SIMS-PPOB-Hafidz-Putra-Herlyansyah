import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import informationReducer from "../features/information/informationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    information: informationReducer,
  },
  devTools: true,
});
