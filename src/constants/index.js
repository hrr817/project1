// for gender
export const options = [
  { key: "m", text: "Male", value: "Male" },
  { key: "f", text: "Female", value: "Female" },
  { key: "o", text: "Other", value: "Other" },
];

export const actionType = {
  FETCH_OTHER_USERS: "otherUsers/fetchUsersList",
  FETCH_OTHER_USERS_SUCCEED: "otherUsers/fetchUsersListSucceed",
  FETCH_OTHER_USERS_FAILED: "otherUsers/fetchUsersListFailed",
};
