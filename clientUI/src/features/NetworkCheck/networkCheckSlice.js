import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = { isReachable: true };

const networkSlice = createSlice({
  name: "networkCheck",
  initialState,
  reducers: {
    setReachable(state, action) {
      state.isReachable = action.payload;
    },
  },
});

const networkSelector = (state) => state.network;

export const networkReachSelector = createSelector(
  networkSelector,
  (network) => network.isReachable
);

export const reachableSelector = createSelector(
  networkSelector,
  (networkCheck) => networkCheck.isReachable
);

export const { setReachable } = networkSlice.actions;
export default networkSlice.reducer;
