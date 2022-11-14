import { put, call } from "redux-saga/effects";
import { FilterActionTypes } from "../actions/actionTypes";
import {
  config,
  CONVERSATION_URL,
  FILTER_URL,
  LAST_UPDATED_URL,
} from "../../../services/ApiRoutes";
import { downloadCsvFile } from "../../../utils/downloadCsvFile";
import { SERVER_URL2, CALL_REPORT_URL } from "../../../services/ApiRoutes";
import axios from "axios";
import moment from "moment";
import { downloadFromLink } from "../../../utils/downloadCsvFile";
export function* getAllFilterOptionsWorker(data: any): any {
  try {
    const response = yield call(config.GET, `${FILTER_URL}${data.payload}`);
    yield put({
      type: FilterActionTypes.GET_ALL_FILTER_SUCCESS,
      response: response.data,
    });
  } catch (err) {
    yield put({
      type: FilterActionTypes.GET_ALL_FILTER_FAILURE,
      error: err,
    });
  }
}
export function* setSelectedFilterOptionsWorker(data: any): any {
  yield put({
    type: FilterActionTypes.PUT_FILTER_OPTIONS_SELECTED_IN_REDUX,
    payload: data.payload,
  });
}

export function* downloadCsv(data: any): any {
  const transcriptDownloadUrl = `https://${process.env.REACT_APP_SERVER_URL2}${CONVERSATION_URL.DOWNLOAD_CSV_TRANSCRIPT}`;
  try {
    const res = yield call(config.POST, transcriptDownloadUrl, data.payload);

    downloadCsvFile(res.data, "Transcript");
  } catch (err) {
    console.error(err);
  }
}
// function  *gen(){
//   yield  put({
//     type:FilterActionTypes.DIRECT_DOWNLOAD_REPORT_SUCCESS,
//     paylaod:"OK"
//    })
// }
export function* downloadCsvForReport(data: any): any {
  const reportDownlaodUrl = `${SERVER_URL2}${CALL_REPORT_URL.FILTER_CSV_URL}`;
  try {
    const res = yield call(config.POST, reportDownlaodUrl, data.payload);
    const sessionIdOfReport = res.data.sessionInfo.sessionId;
    const successLinkCheckerUrl = `${SERVER_URL2}${CALL_REPORT_URL.STATUS_CSV_FILE}${sessionIdOfReport}`;
    let startIntervalChecker: any = "";
    const stopIntervalChecker = () => {
      clearInterval(startIntervalChecker);
    };

    let resOfSuccessLink: any = "";
    const successLinkChecker = async () => {
      resOfSuccessLink = await axios.get(successLinkCheckerUrl);
      if (resOfSuccessLink?.data?.data?.sessionInfo?.status === "completed") {
        stopIntervalChecker();
        downloadFromLink(resOfSuccessLink?.data?.data?.sessionInfo?.link);
        data.dispatch({
          type: FilterActionTypes.DIRECT_DOWNLOAD_REPORT_SUCCESS,
          paylaod: "OK",
        });
        // console.log("download complete nithin", resOfSuccessLink);
      }
    };
    successLinkChecker()

    startIntervalChecker = setInterval(successLinkChecker, 6000);
  } catch (err) {
    console.log(err);
    yield put({
      type: FilterActionTypes.DIRECT_DOWNLOAD_REPORT_FAILURE,
      paylaod: "FAILED",
    });
  }
}

export function* updateLastUpdateWorker(data: any): any {
  try {
    const response: any = yield call(
      config.GET,
      `${LAST_UPDATED_URL}${data.payload}`
    );
    const date = new Date(response.data?.data[0]?.information?.created_at);
    yield put({
      type: FilterActionTypes.REFRESH_PAGE_TIME_API_SUCCESS,
      payload: date,
    });
  } catch (err) {
    console.error(err);
  }
}
// export function *setCalenderDataWorker(calenderData:any):any{

//   yield put({
//     type: FilterActionTypes.SET_DATES_FROM_CALENDER,
//     payload:calenderData

//   });
// }
