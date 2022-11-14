import REPORT_ISSUES_ACTION from "./reportIssueActionTypes";

const reportIssueReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_ISSUES_ACTION.SET_ALL_REPORT_ISSUES: {
      return {
        ...state,
        allSelectedReportIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_BOT_REPORT_ISSUES: {
      return {
        ...state,
        botIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_ASR_REPORT_ISSUES: {
      return {
        ...state,
        ASRIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_NLU_REPORT_ISSUES: {
      return {
        ...state,
        NLUIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_CUSTOMER_REPORT_ISSUES: {
      return {
        ...state,
        customerIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_OTHERS_REPORT_ISSUES: {
      return {
        ...state,
        otherIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_FETCH_REPORT_ISSUES: {
      return {
        ...state,
        fetchedIssueData: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_MESSAGE_REPORT_ISSUES: {
      return {
        ...state,
        reportIssueMessage: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_REPORT_ISSUE_UPDATE_ID: {
      return {
        ...state,
        updateReportIssueId: action.payload,
      };
    }
    case REPORT_ISSUES_ACTION.SET_CREATE_REPORT_ISSUES: {
      return {
        ...state,
        createdReportIssue: action.payload,
      };
    }

    case REPORT_ISSUES_ACTION.SET_UPDATE_REPORT_ISSUES: {
      return {
        ...state,
        updateReportIssueIssueId: action.payload,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default reportIssueReducer;
