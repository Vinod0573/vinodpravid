import { takeLatest } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import {
  getReportDataAPIWorker,
  sortReportTableDataWatcher,
} from "./report.saga";

export default function* reportWatcher(): any {
  yield takeLatest(actionTypes.REPORT_DATA_API_REQUEST, getReportDataAPIWorker);
  yield takeLatest(
    actionTypes.SORT_REPORT_TABLE_DATA,
    sortReportTableDataWatcher
  );
}
