import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import otherUsersSaga from "../sagas/otherUsersSaga";
import usersReducer from "../features/users/usersSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import otherUsersReducer from "../features/otherUsers/otherUsersSlice";

const sagaMIddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    otherUsers: otherUsersReducer,
  },
  middleware: [sagaMIddleware],
});

sagaMIddleware.run(otherUsersSaga);
