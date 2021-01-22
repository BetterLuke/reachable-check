import { combineReducers, configureStore } from "@reduxjs/toolkit";
import networkReducer from "./features/NetworkCheck/networkCheckSlice";

const store = configureStore({
  reducer: combineReducers({ network: networkReducer }),
});

export default store;
