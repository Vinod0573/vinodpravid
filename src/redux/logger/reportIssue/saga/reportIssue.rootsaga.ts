import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchReportIssueWatcher,
  createReportIssue,
  noIssueWatcher,
  updateReportIssueWatcher,
  updateNoIssueWatcher,
} from "./reportIssue.saga";
import NEW_REPORT_ISSUES_ACTION from "../reportIssue.actionTypes";
export default function* NewReportIssueRootSaga(): any {
  yield takeLatest(
    NEW_REPORT_ISSUES_ACTION.FETCH_REPORT_ISSUES,
    fetchReportIssueWatcher
  );
  yield takeEvery(
    NEW_REPORT_ISSUES_ACTION.CREATE_REPORT_ISSUES_API,
    createReportIssue
  );
  yield takeEvery(NEW_REPORT_ISSUES_ACTION.SET_NO_ISSUE, noIssueWatcher);
  yield takeEvery(
    NEW_REPORT_ISSUES_ACTION.UPDATE_REPORT_ISSUE,
    updateReportIssueWatcher
  );
  yield takeEvery(
    NEW_REPORT_ISSUES_ACTION.UPDATE_NO_ISSUE,
    updateNoIssueWatcher
  );
}
