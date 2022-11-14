import actionTypes from "./actionTypes";

// stateInterface
export interface stateInterface {
  currentPage: string;
  summaryData: any;
  summaryLoading: boolean;
  summaryError: any;
  transcriptData: any;
  transcriptLoading: boolean;
  transcriptError: any;
  feedbackPostLoading: boolean;
  feedbackPostError: any;
  feedbackHistory: { data: Array<any>; isLoading: boolean; error: any };
  issue: { data: any[]; isLoading: boolean; error: any };
  feedbackCalender: { startDate: Date; endDate: Date };
}

// actionInterface
export interface setCurrentPage {
  type: actionTypes.LOGGER_TOGGLE_CLICK;
  payload: string;
}

export type actionInterface = setCurrentPage;
