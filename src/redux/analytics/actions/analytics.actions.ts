import actionTypes from "../actionTypes";

export const getAnalyticsAPIData = (bodyData: any) => {
  return {
    type: actionTypes.ANALYTICS_API_DATA_REQUEST,
    payload: { bodyData },
  };
};

export const getExpandedChart = (
  isExpand: boolean,
  expandedChart: any
  ) => {
  return {
    type: actionTypes.SET_EXPAND_CHART,
    payload: {isExpand, expandedChart},
  };
};

export const getSortedChart = (
  isSort: boolean,
  sortedChart: string
  ) => {
  return {
    type: actionTypes.SET_SORT_CHART,
    payload: {isSort, sortedChart},
  };
};

export const getAnalyticsChartDownloadCSV = (bodyData: any) => {
  return {
    type: actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_API_REQUEST,
    payload: { bodyData },
  };
};

export const getViewMore = (
  isViewMore: boolean,
  viewMoreChart: any
  ) => {
  return {
    type: actionTypes.SET_VIEW_MORE,
    payload: {isViewMore, viewMoreChart},
  };
};