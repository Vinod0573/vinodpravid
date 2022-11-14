import { Reducer } from "redux";
import actionType from "../actionTypes";
import { stateInterface, actionInterface } from "../interface";

const initialState: stateInterface = {
  currentPage: "Report",
  summaryData: [],
  summaryLoading: false,
  summaryError: "",
  transcriptData: [],
  transcriptLoading: false,
  transcriptError: "",
  feedbackPostLoading: false,
  feedbackPostError: "",
  feedbackHistory: { data: [], isLoading: false, error: "" },
  issue: { data: [], isLoading: false, error: "" },
  feedbackCalender: {
    startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  },
};

const loggerStateReducer: Reducer<stateInterface, actionInterface> = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case actionType.SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.payload };
    }
    case actionType.SUMMARY_GET_API_REQUEST: {
      return {
        ...state,
        summaryData: [],
        summaryLoading: true,
        summaryError: "",
      };
    }
    case actionType.SUMMARY_GET_API_SUCCESS: {
      return { ...state, summaryData: action.payload, summaryLoading: false };
    }
    case actionType.SUMMARY_GET_API_FAILURE: {
      return {
        ...state,
        summaryLoading: false,
        summaryError: action.payload,
      };
    }
    case actionType.TRANSCRIPT_GET_API_REQUEST: {
      return {
        ...state,
        transcriptData: [],
        transcriptLoading: true,
        transcriptError: "",
      };
    }
    case actionType.TRANSCRIPT_GET_API_SUCCESS: {
      return {
        ...state,
        transcriptData: action.payload,
        transcriptLoading: false,
      };
    }
    case actionType.TRANSCRIPT_GET_API_FAILURE: {
      return {
        ...state,
        transcriptError: action.payload,
        transcriptLoading: false,
      };
    }
    case actionType.FEEDBACK_POST_API_REQUEST: {
      return { ...state, feedbackPostLoading: true, feedbackPostError: "" };
    }
    case actionType.FEEDBACK_POST_API_SUCCESS: {
      return { ...state, feedbackPostLoading: false };
    }
    case actionType.FEEDBACK_POST_API_FAILURE: {
      return {
        ...state,
        feedbackPostError: action.payload,
        feedbackPostLoading: false,
      };
    }
    case actionType.FEEDBACK_HISTORY_API_REQUEST: {
      return {
        ...state,
        feedbackHistory: {
          ...state.feedbackHistory,
          data: [],
          isLoading: true,
          error: "",
        },
      };
    }
    case actionType.FEEDBACK_HISTORY_API_SUCCESS: {
      return {
        ...state,
        feedbackHistory: {
          ...state.feedbackHistory,
          data: action.payload,
          isLoading: false,
        },
      };
    }
    case actionType.FEEDBACK_HISTORY_API_FAILURE: {
      return {
        ...state,
        feedbackHistory: {
          ...state.feedbackHistory,
          isLoading: true,
          error: action.payload,
        },
      };
    }
    case actionType.SET_FEEDBACK_HISTORY_TABLE_DATA: {
      const data = { ...state.feedbackHistory.data, results: action.payload };
      return {
        ...state,
        feedbackHistory: {
          ...state.feedbackHistory,
          data: data,
        },
      };
    }
    case actionType.SET_FEEDBACK_CALENDER_DATA: {
      return { ...state, feedbackCalender: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default loggerStateReducer;
