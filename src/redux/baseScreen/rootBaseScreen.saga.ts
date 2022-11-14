import { all, fork } from "redux-saga/effects";
import * as leftMenuWatcher from "./leftMenu/saga";

export default function* rootBaseScreenSage() {
  yield all([...Object.values(leftMenuWatcher)].map(fork));
}
