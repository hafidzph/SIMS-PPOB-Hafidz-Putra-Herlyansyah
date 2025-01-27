import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import informationReducer from "../features/information/informationSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    information: informationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});
