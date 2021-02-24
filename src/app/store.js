import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";

export default configureStore({
  reducer: { users: usersReducer, currentUser: currentUserReducer },
});
