import { takeLatest } from "redux-saga/effects";
import { setLeftModulesToVisibleAllWorker } from "./leftMenu.sage";
import { actions as actionName } from "../leftMenu.interface";

export default function* leftMenuWatcher() {
  yield takeLatest(
    actionName.SET_LEFT_MODULES_TO_VISIBLE_ALL,
    setLeftModulesToVisibleAllWorker
  );
}
