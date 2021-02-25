import { createSlice } from "@reduxjs/toolkit";

const otherUsersSlice = createSlice({
  name: "otherUsers",
  initialState: {
    list: [],
    error: null,
    loading: false,
    totalPages: undefined,
  },
  reducers: {
    fetchUsersList: (state) => {
      state["loading"] = true;
    },
    fetchUsersListSucceed: (state, action) => {
      state["loading"] = false;
      const {
        payload: { data, total_pages },
      } = action;
      state["list"].push(...data);
      state["totalPages"] = total_pages;
    },
    fetchUsersListFailed: (state, action) => {
      console.log(action);
    },
    clearError: (state) => {
      state["error"] = null;
    },
  },
});

export const { fetchUsersList, clearError } = otherUsersSlice.actions;

export const selectOtherUsers = (state) => state.otherUsers.list;
export const selectOtherUsersIsLoading = (state) => state.otherUsers.loading;
export const selectOtherUsersIsError = (state) => state.otherUsers.error;
export const selectOtherUserTotalPages = (state) => state.otherUsers.totalPages;

export default otherUsersSlice.reducer;
