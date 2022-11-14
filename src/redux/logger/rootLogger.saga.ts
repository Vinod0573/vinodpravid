import { all, fork } from "redux-saga/effects";
import * as transcriptWatcher from "./transcript/saga";
import * as reportWatcher from "./report/saga";
import * as loggerStateWatcher from "./loggerState/saga";
import * as NewReportIssueWatcher from "./reportIssue/saga/reportIssue.rootsaga";
export default function* rootLoggerSaga() {
  yield all([...Object.values(transcriptWatcher)].map(fork));
  yield all([...Object.values(reportWatcher)].map(fork));
  yield all([...Object.values(loggerStateWatcher)].map(fork));
  yield all([...Object.values(NewReportIssueWatcher)].map(fork));
}
