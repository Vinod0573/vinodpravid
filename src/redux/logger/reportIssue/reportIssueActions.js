import Axios from "axios";

import REPORT_ISSUES_ACTION from "./reportIssueActionTypes";

import { SERVER_URL2, REPORT_ISSUE_URL } from "../../../services/ApiRoutes";

let cancelfetchReportTokenRD;
// to get all filter
export const fetchReportIssue = (conversationId) => {
  const fetchReportIssueUrl = `${SERVER_URL2}${REPORT_ISSUE_URL.FETCH_ISSUE}${conversationId}`;

  return async function (dispatch) {
    if (typeof cancelfetchReportTokenRD != typeof undefined) {
      cancelfetchReportTokenRD.cancel("Operation canceled due to new request.");
    }

    //Save the cancel token for the current request
    cancelfetchReportTokenRD = Axios.CancelToken.source();
    try {
      const response = await Axios.get(fetchReportIssueUrl, {
        cancelToken: cancelfetchReportTokenRD.token,
      });

      dispatch({
        type: REPORT_ISSUES_ACTION.SET_FETCH_REPORT_ISSUES,
        payload: response.data,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
};

let cancelUpdateReportTokenRD;
// to get all filter
export const updateReportIssue = (bodyData) => {
  const updateIssueUrl = `${SERVER_URL2}${REPORT_ISSUE_URL.UPDATE_ISSUE}`;

  return async function (dispatch) {
    if (typeof cancelUpdateReportTokenRD != typeof undefined) {
      cancelUpdateReportTokenRD.cancel(
        "Operation cancelled due to new request."
      );
    }

    //Save the cancel token for the current request
    cancelUpdateReportTokenRD = Axios.CancelToken.source();
    try {
      const response = await Axios.post(updateIssueUrl, bodyData, {
        cancelToken: cancelUpdateReportTokenRD.token,
      });

      dispatch({
        type: REPORT_ISSUES_ACTION.SET_UPDATE_REPORT_ISSUES,
        payload: response.data,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
};

let cancelcreateReportTokenRD;
// to get all filter
export const createReportIssue = (bodyData) => {
  const submitEditUrl = `${SERVER_URL2}${REPORT_ISSUE_URL.CREATE_ISSUE}`;

  return async function (dispatch) {
    if (typeof cancelcreateReportTokenRD != typeof undefined) {
      cancelcreateReportTokenRD.cancel(
        "Operation cancelled due to new request."
      );
    }

    //Save the cancel token for the current request
    cancelcreateReportTokenRD = Axios.CancelToken.source();
    try {
      const response = await Axios.post(submitEditUrl, bodyData, {
        cancelToken: cancelcreateReportTokenRD.token,
      });

      dispatch({
        type: REPORT_ISSUES_ACTION.SET_CREATE_REPORT_ISSUES,
        payload: response.data,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
};

// To set all selected report issue
export const setAllSelectedReportIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_ALL_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set all selected bot issue
export const setBotIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_BOT_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set all selected asr issue
export const setASRIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_ASR_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set all selected nlu issue
export const setNLUIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_NLU_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set all selected CUSTOMER issue
export const setCustomerIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_CUSTOMER_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set all selected others issue
export const setOthersIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_OTHERS_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set  others issue as message
export const setMessageIssueData = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_MESSAGE_REPORT_ISSUES,
      payload: selectedData,
    });
    return selectedData;
  };
};

// To set update issue id
export const setUpdateIssueId = (selectedData) => {
  return function (dispatch) {
    dispatch({
      type: REPORT_ISSUES_ACTION.SET_REPORT_ISSUE_UPDATE_ID,
      payload: selectedData,
    });
    return selectedData;
  };
};
