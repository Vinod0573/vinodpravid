import actionTypes from "../actionTypes";

export const setCurrentPage = (currentPage: string) => {
  return { type: actionTypes.SET_CURRENT_PAGE, payload: currentPage };
};

export const getSummaryByAPI = (data: string) => {
  return {
    type: actionTypes.SUMMARY_GET_API_REQUEST,
    payload: data,
  };
};

export const getMessages = (data: any) => {
  return {
    type: actionTypes.TRANSCRIPT_GET_API_REQUEST,
    data,
  };
};

export const feedbackPostAPI = (data: any, headers: any) => {
  return {
    type: actionTypes.FEEDBACK_POST_API_REQUEST,
    payload: { data, headers },
  };
};

export const feedbackHistoryPostAPI = (bodyData: any) => {
  return {
    type: actionTypes.FEEDBACK_HISTORY_API_REQUEST,
    payload: bodyData,
  };
};
export const setFeedbackHistoryTableData = (tableData: any) => {
  return {
    type: actionTypes.SET_FEEDBACK_HISTORY_TABLE_DATA,
    payload: tableData,
  };
};

export const setFeedbackCalender = (calenderData: {
  startDate: Date;
  endDate: Date;
}) => {
  return {
    type: actionTypes.SET_FEEDBACK_CALENDER_DATA,
    payload: calenderData,
  };
};
export const reportIssueHistory = (data: any) => {
  return {
    type: actionTypes.REPORT_ISSUE_API_REQUEST,
    payload: data,
  };
};

export const portalTranscriptDownloadCSV = (bodyData: any) => {
  return {
    type: actionTypes.PORTAL_TRANSCRIPT_DOWNLOAD_CSV,
    payload: bodyData,
  };
};
export const feedbackHistoryDownload = (bodyData: any) => {
  return {
    type: actionTypes.FEEDBACK_HISTORY_DOWNLOAD_CSV,
    payload: bodyData,
  };
};
export const reportIssueDownload = (bodyData: any) => {
  return {
    type: actionTypes.REPORT_ISSUE_DOWNLOAD_CSV,
  };
};
