import { call, put } from "redux-saga/effects";
import {
  SERVER_URL2,
  REPORT_ISSUE_URL,
  CONVERSATION_URL,
  config,
} from "../../../../services/ApiRoutes";

import NEW_REPORT_ISSUES_ACTION from "../reportIssue.actionTypes";
import actionTypes from "../../loggerState/actionTypes";
export function* fetchReportIssueWatcher(data: any): any {
  //url to fetch Report issues
  const fetchReportIssueUrl = `${SERVER_URL2}${REPORT_ISSUE_URL.FETCH_ISSUE}${data.payload}`;

  try {
    const response = yield call(config.GET, fetchReportIssueUrl);
    console.log("Nithin n", response);
    yield put({
      type: NEW_REPORT_ISSUES_ACTION.SET_REPORT_ISSUES,
      payload: response.data.data,
    });
  } catch (error) {
    yield put({
      type: NEW_REPORT_ISSUES_ACTION.SET_EMPTY_ISSUE,
    });
    console.error(error);
  }
}
export function* createReportIssue(data: any): any {
  const createIssueUrl = SERVER_URL2 + REPORT_ISSUE_URL.CREATE_ISSUE;
  try {
    // yield console.log(data, "nithin .");
    const response: any = yield call(
      config.POST,
      createIssueUrl,
      data.payload.bodyData
    );
    yield put({
      type: NEW_REPORT_ISSUES_ACTION.SET_REPORT_ISSUES,
      payload: response.data,
    });
    yield call(config.POST, SERVER_URL2 + CONVERSATION_URL.UPDATE_SUMMARY, {
      id: data.payload.summaryId,
      status: "issue",
    });
    yield put({
      type: actionTypes.SUMMARY_GET_API_REQUEST,
      payload: data.payload.bodyData.conversationId,
    });
  } catch (error) {
    console.error(error);
  }
}
export function* noIssueWatcher(data: any): any {
  try {
    yield call(config.POST, SERVER_URL2 + CONVERSATION_URL.UPDATE_SUMMARY, {
      id: data.payload.summaryId,
      status: "no issue",
    });
    yield put({
      type: actionTypes.SUMMARY_GET_API_REQUEST,
      payload: data.payload.conversationId,
    });
  } catch (error) {
    console.error(error);
  }
}
export function* updateReportIssueWatcher(data: any): any {
  try {
    const url = SERVER_URL2 + REPORT_ISSUE_URL.UPDATE_ISSUE;
    yield call(config.POST, url, data.payload.bodyData);
    yield put({
      type: actionTypes.SUMMARY_GET_API_REQUEST,
      payload: data.payload.conversationId,
    });
  } catch (error) {
    console.error(error);
  }
}
export function* updateNoIssueWatcher(data: any): any {
  try {
    const url = SERVER_URL2 + REPORT_ISSUE_URL.UPDATE_ISSUE;
    yield call(config.POST, url, {
      assignees: data.payload.assignees,
      id: data.payload.issueId,
      issue: {},
    });
    yield call(config.POST, SERVER_URL2 + CONVERSATION_URL.UPDATE_SUMMARY, {
      id: data.payload.summaryId,
      status: "no issue",
    });
    yield put({
      type: actionTypes.SUMMARY_GET_API_REQUEST,
      payload: data.payload.conversationId,
    });
  } catch (error) {
    console.log(error);
  }
}
