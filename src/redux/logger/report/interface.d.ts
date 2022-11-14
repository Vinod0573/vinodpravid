import actionTypes from "./actionTypes";

//stateInterface
export interface stateInterface {
  audioUrl: string;
  isLoadingReportTable: boolean;
  reportTableDetails: any;
  reportTableError: string;
  tableSortingColumn: Record<string, "asc" | "desc">;
}

//actionInterface
interface reportDataAPIRequest {
  type: actionTypes.REPORT_DATA_API_REQUEST;
}
interface reportDataAPISuccess {
  type: actionTypes.REPORT_DATA_API_SUCCESS;
  payload: Array<{ [key: string]: string }>;
}
interface reportDataAPIFailure {
  type: actionTypes.REPORT_DATA_API_FAILURE;
}
interface setTableSortingColumn {
  type: actionTypes.SET_TABLE_SORTING_COLUMN;
  payload: { columnKey: string; sortingDirection: "asc" | "desc" };
}

export type actionInterface =
  | reportDataAPISuccess
  | reportDataAPIFailure
  | reportDataAPIRequest;
