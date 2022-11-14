import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import {
  DASHBOARD_URL,
  SERVER_URL2,
  ANALYTICS_URL,
  config
} from "../../../services/ApiRoutes";
import actionTypes from "../actionTypes";
import { downloadCsvFile } from "../../../utils/downloadCsvFile";
import axios from "axios";

let cancelTokenRD: any;
export function* getAnalyticsDataAPIWorker(action: any): any {
  if (typeof cancelTokenRD != typeof undefined) {
    cancelTokenRD.cancel("Operation canceled due to new request.");
  }
  cancelTokenRD = axios.CancelToken.source();

  try {
    const res = yield call(
      config.POST_WITH_CANCEL_TOKEN,
      `${DASHBOARD_URL}`,
      action.payload.bodyData,
      cancelTokenRD
    );
    yield put({
      type: actionTypes.ANALYTICS_API_DATA_SUCCESS,
      payload: res.data.data,
    });
    
  } catch (error) {
    console.error(error);
    yield put({ type: actionTypes.ANALYTICS_API_DATA_FAILURE, payload: error });
  }
}

export function* getAnalyticsChartDownloadCsvAPIWorker(action: any): any {
  try {
    const res = yield call(
      config.POST,
      `${SERVER_URL2}${ANALYTICS_URL.DOWNLOAD_CSV}`,
      action.payload.bodyData
    );
    yield put({
      type: actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_SUCCESS,
      payload: res.data,
    });
    
    downloadCsvFile(res.data,action.payload?.bodyData ? action.payload?.bodyData?.kpiDetails?.chartTitle:"Download")
  } catch (error) {
    console.error(error);
    yield put({ type: actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_FAILURE, payload: error });
  }
}

