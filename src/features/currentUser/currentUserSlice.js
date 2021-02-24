import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currenUser",
  initialState: null,
  reducers: {
    logIn: (state, action) => action.payload,
    logOut: (state, action) => null,
  },
});

export const { logIn, logOut } = currentUserSlice.actions;

export const selectCurrentUser = (state) => state.currentUser;

export default currentUserSlice.reducer;
