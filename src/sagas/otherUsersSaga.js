import { takeLatest, call, put, select } from "redux-saga/effects";
import { actionType } from "../constants";
import axios from "axios";

const PER_PAGE = 3;
const API_ENDPOINT = `https://reqres.in/api/users?per_page=${PER_PAGE}&page=`;

function* fetchOtherUsers({ payload }) {
  const {
    otherUsers: { reachedEnd },
  } = yield select();

  if (!reachedEnd) {
    yield console.log("fetching... page: " + payload);
    try {
      const { data } = yield call(axios.get, API_ENDPOINT + payload);
      yield put({ type: actionType.FETCH_OTHER_USERS_SUCCEED, payload: data });
      console.log("fetching successful.");
    } catch (err) {
      yield put({ type: actionType.FETCH_OTHER_USERS_FAILED, payload: err });
      console.log("fetching failed.");
    }
  } else {
    console.log("no more data to fetch");
  }
}

export default function* otherUsersSaga() {
  yield takeLatest(actionType.FETCH_OTHER_USERS, fetchOtherUsers);
}
