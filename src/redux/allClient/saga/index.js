import { takeLatest } from "redux-saga/effects";
import { getAllClientListSaga, setCurrentClient } from "./allClient.saga";
import AllClientActionTypes from "../actionTypes/allClient.actionTypes";

export default function* allClientWatcherSaga() {
  yield takeLatest(AllClientActionTypes.GET_ALL_CLIENT, getAllClientListSaga);
  yield takeLatest(
    AllClientActionTypes.SET_CURRENT_CLIENT_SAGA,
    setCurrentClient
  );
}
