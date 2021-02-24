import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

// List of users
const initialState = {
  "0d61e6-366c-763c-dd6e-6bd078b7f8": {
    first_name: "Hem Raj",
    last_name: "Rana",
    name: "Hem",
    gender: "Male",
    email: "hemraj@email.com",
    password: "12345678",
  },
  "aa6fe4-d075-c601-ce1-223553643b54": {
    first_name: "Henry",
    last_name: "Ford",
    name: "Henry Ford",
    gender: "Other",
    email: "ford@email.com",
    password: "12345678",
  },
  "0eed54b-228c-423-de3b-4a2ec7346fd5": {
    first_name: "Tia",
    last_name: "Swok",
    name: "Tia Swok",
    gender: "Female",
    email: "tia@email.com",
    password: "12345678",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState: { ...initialState },
  reducers: {
    setUsers: (state, action) => action.payload,
    editUser: (state, action) => {
      const { id } = action.payload;

      state[id] = {
        ...state[id],
        ...action.payload,
      };
    },
    createUser: (state, action) => ({
      ...state,
      [uuid()]: { ...action.payload },
    }),
    deleteUser: () => {
      //     delete user
    },
  },
});

export const {
  createUser,
  deleteUser,
  setUsers,
  editUser,
} = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
