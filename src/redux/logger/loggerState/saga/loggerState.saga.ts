import {
  config,
  CONVERSATION_URL,
  SERVER_URL2,
  EDITING_URL,
  REPORT_ISSUE_URL,
} from "../../../../services/ApiRoutes";
import { put, call } from "redux-saga/effects";
import actionTypes from "../../loggerState/actionTypes";
import { toast } from "react-toastify";
import { downloadCsvFile } from "../../../../utils/downloadCsvFile";

export function* getSummaryApi(action: any): any {
  try {
    if (action.payload) {
      const result = yield call(
        config.GET_WITH_PARAMS,
        `${SERVER_URL2}${CONVERSATION_URL.SUMMARY_URL}`,
        {
          conversationId: action.payload,
        }
      );
      yield put({
        type: actionTypes.SUMMARY_GET_API_SUCCESS,
        payload: result.data.data,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: actionTypes.SUMMARY_GET_API_FAILURE, payload: error });
  }
}

export function* getMessagesApi(data: any): any {
  try {
    const id = data.data; // this is the id for  call summary inside here to fetch
    if (id !== "") {
      const url = `${SERVER_URL2}${CONVERSATION_URL.MESSAGE_URL}`;
      const result = yield call(config.GET_WITH_PARAMS, url, {
        conversationId: id,
      });
      // console.log(result, "messages");
      yield put({
        type: actionTypes.TRANSCRIPT_GET_API_SUCCESS,
        payload: result.data.data,
      });
    }
    yield put({
      type: actionTypes.TRANSCRIPT_GET_API_FAILURE,
      payload: "no id",
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: actionTypes.TRANSCRIPT_GET_API_FAILURE,
      payload: error,
    });
  }
}

export function* feedbackPostAPIWorker(action: any): any {
  try {
    const res = yield call(
      config.POST_WITH_HEADER,
      `${SERVER_URL2}${EDITING_URL.UPDATE_FEEDBACK}`,
      action.payload.data,
      action.payload.headers
    );

    if (res.request.statusText === "OK") {
      yield put({ type: actionTypes.FEEDBACK_POST_API_SUCCESS });
      toast.success("Feedback Submitted successfully");
    }
  } catch (error) {
    yield put({ type: actionTypes.FEEDBACK_POST_API_FAILURE, payload: error });
    toast.error("Feedback Submission Failed");
  }
}

export function* feedbackHistoryPostAPIWorker(action: any): any {
  try {
    const res = yield call(
      config.POST,
      `${SERVER_URL2}${EDITING_URL.FEEDBACK_HISTORY}`,
      action.payload
    );
    yield put({
      type: actionTypes.FEEDBACK_HISTORY_API_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: actionTypes.FEEDBACK_HISTORY_API_FAILURE,
      payload: error,
    });
  }
}

export function* issueHistoryPostAPIWorker(action: any): any {
  try {
    const url = SERVER_URL2 + REPORT_ISSUE_URL.FETCH_ALL_ISSUE;
    const res = yield call(config.POST, url, action.payload);
    console.log("nithin n report issue", res);
    yield put({
      type: actionTypes.FEEDBACK_HISTORY_API_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.error(error);

    yield put({
      type: actionTypes.FEEDBACK_HISTORY_API_FAILURE,
      payload: error,
    });
  }
}
export function* portalTranscriptDownloadCsvWorker(action: any): any {
  try {
    const res = yield call(
      config.POST,
      `https://${process.env.REACT_APP_SERVER_URL2}${CONVERSATION_URL.DOWNLOAD_CSV_TRANSCRIPT}`,
      action.payload
    );

    downloadCsvFile(res.data, "Transcript");
  } catch (err) {
    console.error(err);
  }
}

export function* feedbackHistoryDownloadCsvWorker(action: any): any {
  try {
    const res = yield call(
      config.POST,
      `https://${process.env.REACT_APP_SERVER_URL2}${EDITING_URL.FEEDBACK_HISTORY_DOWNLOAD_CSV}`,
      action.payload
    );

    downloadCsvFile(res.data, "Feedback History");
  } catch (err) {
    console.error(err);
  }
}
export function* reportIssueDownloadWorker(action: any): any {
  try {
    const res = yield call(
      config.POST,
      `https://${process.env.REACT_APP_SERVER_URL2}${REPORT_ISSUE_URL.REPORT_ISSUE_DOWNLOAD_CSV}`,
      action.payload
    );

    downloadCsvFile(res.data, "Report Issue Summary");
  } catch (err) {
    console.error(err);
  }
}
