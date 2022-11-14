import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import moment from "moment";
import {
  SERVER_URL2,
  CALL_REPORT_URL,
  config,
} from "../../../../services/ApiRoutes";
import { getValueByReferenceKey } from "../../../../utils/getValueByReferenceKey";
import actionTypes from "../actionTypes";
import axios from "axios";

let cancelTokenRD: any;
export function* getReportDataAPIWorker(action: any): any {
  if (typeof cancelTokenRD != typeof undefined) {
    cancelTokenRD.cancel("Operation canceled due to new request.");
  }
  cancelTokenRD = axios.CancelToken.source();

  try {
    const res = yield call(
      config.POST_WITH_CANCEL_TOKEN,
      `${SERVER_URL2}${CALL_REPORT_URL.FILTER_URL}`,
      action.payload.bodyData,
      cancelTokenRD
    );
    // console.log(res);
    yield put({
      type: actionTypes.REPORT_DATA_API_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);
    yield put({ type: actionTypes.REPORT_DATA_API_FAILURE, payload: error });
  }
}

export function* sortReportTableDataWatcher({ payload }: any): any {
  const key = Object.keys(payload.tableSortingColumn)[0];
  const newData = [...payload.tableData];
  if (key === "time") {
    if (payload.tableSortingColumn[key] === "asc") {
      newData.sort(
        (a, b) =>
          new Date("1970/01/01 " + getValueByReferenceKey(a, key)).getTime() -
          new Date("1970/01/01 " + getValueByReferenceKey(b, key)).getTime()
      );
    } else {
      newData.sort(
        (a, b) =>
          new Date("1970/01/01 " + getValueByReferenceKey(b, key)).getTime() -
          new Date("1970/01/01 " + getValueByReferenceKey(a, key)).getTime()
      );
    }
  }

  // general case
  else if (key) {
    if (payload.tableSortingColumn[key] === "asc") {
      newData.sort((a, b) =>
        getValueByReferenceKey(a, key)?.localeCompare(
          getValueByReferenceKey(b, key)
        )
      );
    } else {
      newData.sort((a, b) =>
        getValueByReferenceKey(b, key)?.localeCompare(
          getValueByReferenceKey(a, key)
        )
      );
    }
  }
  yield put({ type: actionTypes.SET_REPORT_TABLE_DATA, payload: newData });
}
