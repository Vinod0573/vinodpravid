import { takeLatest, takeEvery } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import {
  additionWorker,
  substractionWorker,
  restAPICallWorker,
} from "./reduxSagaExample.saga";

export default function* mathFunctionWatcher() {
  yield takeEvery(actionTypes.ADDITION, additionWorker);
  yield takeEvery(actionTypes.SUBSTRATION, substractionWorker);
  yield takeLatest(actionTypes.API_REQUEST, restAPICallWorker);
}
