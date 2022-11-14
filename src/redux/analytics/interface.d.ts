import actionTypes from "./actionTypes";

//stateInterface
export interface stateInterface {
  analyticsChartDetails: any,
  isLoadingAnalyticsChart: boolean,
  analyticsChartError: string,
  isExpand:boolean,
  expandedChart:[],
  isSort: boolean,
  sortedChart: string,
  analyticsChartDownloadCsvError:"",
  analyticsChartDownloadCsvData:{},
  viewMoreChart:"",
  isViewMore:false
}

//actionInterface
interface analyticsDataAPIRequest {
  type: actionTypes.ANALYTICS_API_DATA_REQUEST;
}
interface analyticsDataAPISuccess {
  type: actionTypes.ANALYTICS_API_DATA_SUCCESS;
  payload: Array<{ [key: string]: string }>;
}
interface analyticsDataAPIFailure {
  type: actionTypes.ANALYTICS_API_DATA_FAILURE;
}

interface analyticsDownloadCsvRequest {
  type: actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_API_REQUEST;
}
interface analyticsDownloadCsvSuccess {
  type: actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_SUCCESS;
  payload: Array<{ [key: string]: string }>;
}
interface analyticsDownloadCsvFailure {
  type: actionTypes.ANALYTICS_CHARTS_DOWNLOAD_CSV_FAILURE;
}


export type actionInterface =
  | analyticsDataAPIRequest
  | analyticsDataAPISuccess
  | analyticsDataAPIFailure
  | analyticsDownloadCsvRequest
  | analyticsDownloadCsvSuccess
  | analyticsDownloadCsvFailure;
