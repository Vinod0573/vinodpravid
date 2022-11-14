import { Reducer } from "redux";
import actionType from "../actionTypes";
import { stateInterface, actionInterface } from "../interface";

const initialState: stateInterface = {
  audioUrl: "",
  reportTableDetails: {},
  isLoadingReportTable: false,
  reportTableError: "",
  tableSortingColumn: {},
};

const reportReducer: Reducer<stateInterface> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionType.REPORT_DATA_API_REQUEST: {
      return { ...state, isLoadingReportTable: true, reportTableDetails: {} };
    }
    case actionType.REPORT_DATA_API_SUCCESS: {
      return {
        ...state,
        reportTableDetails: action.payload,
        isLoadingReportTable: false,
      };
    }
    case actionType.REPORT_DATA_API_FAILURE: {
      return {
        ...state,
        isLoadingReportTable: false,
        reportTableError: action.payload,
      };
    }
    case actionType.SET_TABLE_SORTING_COLUMN: {
      return {
        ...state,
        tableSortingColumn: {
          [action.payload.columnKey]: action.payload.sortingDirection,
        },
      };
    }
    case actionType.SET_REPORT_TABLE_DATA: {
      return {
        ...state,
        reportTableDetails: {
          ...state.reportTableDetails,
          results: action.payload,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default reportReducer;
