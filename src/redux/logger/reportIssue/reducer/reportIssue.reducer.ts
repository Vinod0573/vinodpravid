import { newReportIssueState } from "../types";

import NEW_REPORT_ISSUES_ACTION from "../reportIssue.actionTypes";
export default function newReportIssueReducer(
  state: newReportIssueState = { data: [], updateReportIssueId: "" },
  action: any
) {
  switch (action.type) {
    case NEW_REPORT_ISSUES_ACTION.SET_REPORT_ISSUES: {
      return { ...state, data: action.payload };
    }
    case NEW_REPORT_ISSUES_ACTION.SET_EMPTY_ISSUE: {
      return { data: [], updateReportIssueId: "" };
    }
    default: {
      return { ...state };
    }
  }
}
