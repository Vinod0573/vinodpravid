import { takeLatest } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import {
  getSummaryApi,
  getMessagesApi,
  feedbackPostAPIWorker,
  feedbackHistoryPostAPIWorker,
  issueHistoryPostAPIWorker,
  feedbackHistoryDownloadCsvWorker,
  portalTranscriptDownloadCsvWorker,
  reportIssueDownloadWorker,
} from "./loggerState.saga";

export default function* loggerStateWatcher(): any {
  yield takeLatest(actionTypes.SUMMARY_GET_API_REQUEST, getSummaryApi);
  yield takeLatest(actionTypes.TRANSCRIPT_GET_API_REQUEST, getMessagesApi);
  yield takeLatest(
    actionTypes.FEEDBACK_POST_API_REQUEST,
    feedbackPostAPIWorker
  );
  yield takeLatest(
    actionTypes.FEEDBACK_HISTORY_API_REQUEST,
    feedbackHistoryPostAPIWorker
  );
  yield takeLatest(
    actionTypes.REPORT_ISSUE_API_REQUEST,
    issueHistoryPostAPIWorker
  );
  yield takeLatest(
    actionTypes.PORTAL_TRANSCRIPT_DOWNLOAD_CSV,
    portalTranscriptDownloadCsvWorker
  );
  yield takeLatest(
    actionTypes.FEEDBACK_HISTORY_DOWNLOAD_CSV,
    feedbackHistoryDownloadCsvWorker
  );
  yield takeLatest(
    actionTypes.REPORT_ISSUE_DOWNLOAD_CSV,
    reportIssueDownloadWorker
  );
}
