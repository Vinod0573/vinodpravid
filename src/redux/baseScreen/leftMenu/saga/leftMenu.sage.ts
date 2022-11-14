import { put } from "redux-saga/effects";
import { actions as actionName } from "../leftMenu.interface";

export function* setLeftModulesToVisibleAllWorker(action: any) {
  const modules = JSON.parse(JSON.stringify(action.payload));
  modules.forEach((item: any) => {
    item.shouldFrontEndShow = true;
  });
  yield put({ type: actionName.SET_LEFT_SIDE_MODULES, payload: modules });
}
