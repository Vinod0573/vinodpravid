import { all, fork } from "redux-saga/effects";
import * as allClientWatcherSaga from "./saga/index";

export default function* allClientRootSaga() {
  yield all([...Object.values(allClientWatcherSaga)].map(fork));
}
