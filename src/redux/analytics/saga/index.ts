import { takeEvery, takeLatest } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import {
  getAnalyticsDataAPIWorker,
  getAnalyticsChartDownloadCsvAPIWorker,
} from "./analytics.saga";

export default function* analyticsWatcher(): any {
  yield takeLatest(
    actionTypes.ANALYTICS_API_DATA_REQUEST,
    getAnalyticsDataAPIWorker
  );
  yield takeEvery(
    actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_API_REQUEST,
    getAnalyticsChartDownloadCsvAPIWorker
  );
}
