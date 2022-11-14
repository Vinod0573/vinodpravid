import NEW_REPORT_ISSUES_ACTION from "../reportIssue.actionTypes";

export function fetchReportIssueNew(conversationId: string) {
  return {
    type: NEW_REPORT_ISSUES_ACTION.FETCH_REPORT_ISSUES,
    payload: conversationId,
  };
}
export function setEmptyIssue() {
  return {
    type: NEW_REPORT_ISSUES_ACTION.SET_EMPTY_ISSUE,
  };
}
export function createReportIssue(bodydata: any) {
  return {
    type: NEW_REPORT_ISSUES_ACTION.CREATE_REPORT_ISSUES_API,
    payload: bodydata,
  };
}
export function updateReportIssue(data: {
  bodyData: any;
  conversationId: string;
}) {
  return {
    type: NEW_REPORT_ISSUES_ACTION.UPDATE_REPORT_ISSUE,
    payload: data,
  };
}
export function setNoIssueInSummary(data: {
  summaryId: string;
  conversationId: string;
}) {
  return {
    type: NEW_REPORT_ISSUES_ACTION.SET_NO_ISSUE,
    payload: data,
  };
}
export function updateNoIssue(data: {
  summaryId: string;
  conversationId: string;
  issueId: string;
  assignees: any;
}) {
  return {
    type: NEW_REPORT_ISSUES_ACTION.UPDATE_NO_ISSUE,
    payload: data,
  };
}
