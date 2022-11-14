import TRANSCRIPT_ACTION from "../actionTypes";

import { transcriptInterface } from "../transcript";
export default function transcriptReducer(
  state: transcriptInterface = {
    isLoggerOrReport: true,
    phoneNumber: "",
    isPhoneNumberLoading: false,
    allPhoneNumberList: [],
    totalPages: 0,
    conversationId: "",
    currentSession: {
      accountName: "",
      conversationId: "",
      phoneNo: "",
      sessionId: "",
    },
  },
  action: any
): transcriptInterface {
  switch (action.type) {
    case TRANSCRIPT_ACTION.SET_ALL_PHONE_NUMBER: {
      return {
        ...state,
        allPhoneNumberList: action.payload,
      };
    }
    case TRANSCRIPT_ACTION.SET_CONVERSATION_ID: {
      return {
        ...state,
        conversationId: action.payload,
      };
    }
    case TRANSCRIPT_ACTION.SET_PHONE_NUMBER: {
      return {
        ...state,
        phoneNumber: action.payload,
      };
    }
    case TRANSCRIPT_ACTION.SET_IS_LOGGER_OR_REPORT: {
      return {
        ...state,
        isLoggerOrReport: action.payload,
      };
    }
    case TRANSCRIPT_ACTION.SET_TOTAL_PAGE: {
      return {
        ...state,
        totalPages: action.payload,
      };
    }
    case TRANSCRIPT_ACTION.SET_CURRENT_SESSION: {
      return {
        ...state,
        currentSession: action.payload,
      };
    }
    case TRANSCRIPT_ACTION.SET_PHONE_LOADING: {
      return { ...state, isPhoneNumberLoading: action.payload };
    }
    default:
      return { ...state };
  }
}
