import { createSlice } from "@reduxjs/toolkit";

const otherUsersSlice = createSlice({
  name: "otherUsers",
  initialState: {
    list: [],
    error: null,
    loading: false,
    totalPages: undefined,
    pageToLoad: 1,
    reachedEnd: false,
  },
  reducers: {
    fetchUsersList: (state) => {
      if (state.reachedEnd) {
        state["loading"] = false;
      } else {
        state["loading"] = true;
      }
    },
    fetchUsersListSucceed: (state, action) => {
      state["loading"] = false;

      const {
        payload: { data, total_pages },
      } = action;

      if (state.pageToLoad <= total_pages) {
        state["pageToLoad"] = state.pageToLoad + 1;
      } else {
        state["pageToLoad"] = total_pages + 1;
      }

      state["list"].push(...data);
      state["totalPages"] = total_pages;

      if (state.pageToLoad > total_pages) {
        state["reachedEnd"] = true;
      }

      state["error"] = null;
    },
    fetchUsersListFailed: (state, action) => {
      console.log(action);
      state["error"] = {
        message: "An error has occured while fetching users...",
      };
    },
    clearError: (state) => {
      state["error"] = null;
    },
  },
});

export const { fetchUsersList, clearError } = otherUsersSlice.actions;

export const selectOtherUsers = (state) => state.otherUsers;

export default otherUsersSlice.reducer;
