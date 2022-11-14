import { all, fork } from "redux-saga/effects";
import * as mathFunctionWatcher from "./reduxSagaExample/sagas";
import * as filterWatcher from "./filters/saga";
import * as rootLoggerWatcher from "./logger/rootLogger.saga";
import * as allClientRootSaga from "./allClient/allClient.RootSaga";
import * as analyticsWatcher from "./analytics/saga";
import * as rootBaseScreenSaga from "./baseScreen/rootBaseScreen.saga";
import * as loginSagas from "../redux/onboarding/login/sagas/index";
export default function* rootSaga() {
  yield all([...Object.values(mathFunctionWatcher)].map(fork));
  yield all([...Object.values(filterWatcher)].map(fork));
  yield all([...Object.values(rootLoggerWatcher)].map(fork));
  yield all([...Object.values(allClientRootSaga)].map(fork));
  yield all([...Object.values(analyticsWatcher)].map(fork));
  yield all([...Object.values(rootBaseScreenSaga)].map(fork));
  yield all([...Object.values(loginSagas )].map(fork));
}
