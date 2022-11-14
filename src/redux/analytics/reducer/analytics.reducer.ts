import { Reducer } from "redux";
import actionType from "../actionTypes";
import { stateInterface, actionInterface } from "../interface";

const initialState: stateInterface = {
  analyticsChartDetails: {},
  isLoadingAnalyticsChart: false,
  analyticsChartError: "",
  isExpand: false,
  expandedChart: [],
  isSort: false,
  sortedChart: "",
  analyticsChartDownloadCsvError:"",
  analyticsChartDownloadCsvData:{},
  viewMoreChart:"",
  isViewMore:false


};

const analyticsReducer: Reducer<stateInterface> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionType.ANALYTICS_API_DATA_REQUEST: {
      return {
        ...state,
        isLoadingAnalyticsChart: true,
      };
    }
    case actionType.ANALYTICS_API_DATA_SUCCESS: {
      return {
        ...state,
        isLoadingAnalyticsChart: false,
        analyticsChartDetails: action.payload,
      };
    }
    case actionType.ANALYTICS_API_DATA_FAILURE: {
      return {
        ...state,
        isLoadingAnalyticsChart: false,
        analyticsChartError: action.payload,
      };
    }

    case actionType.SET_EXPAND_CHART:
      return {
        ...state,
        isExpand: action.payload.isExpand,
        expandedChart: action.payload.expandedChart,
      };

    case actionType.SET_SORT_CHART:
      return {
        ...state,
        isSort: action.payload.isSort,
        sortedChart: action.payload.sortedChart,
      };

    case actionType.ANALYTICS_CHARTS_DOWNLOAD_CSV_API_REQUEST:
      return {
        ...state,
      };

    case actionType.ANALYTICS_CHARTS_DOWNLOAD_CSV_SUCCESS: {
        return {
          ...state,
          analyticsChartDownloadCsvData: action.payload,
        };
      }

    case actionType.ANALYTICS_CHARTS_DOWNLOAD_CSV_FAILURE: {
        return {
          ...state,
          analyticsChartDownloadCsvError: action.payload,
        };
      }

    case actionType.SET_VIEW_MORE:
        return {
          ...state,
          isViewMore: action.payload.isViewMore,
          viewMoreChart: action.payload.viewMoreChart,
        };

    default: {
      return { ...state };
    }
  }
};

export default analyticsReducer;
