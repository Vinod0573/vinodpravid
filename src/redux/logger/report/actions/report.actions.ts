import actionTypes from "../actionTypes";

export const getLoggerReportDataAPI = (bodyData: any) => {
  return {
    type: actionTypes.REPORT_DATA_API_REQUEST,
    payload: { bodyData },
  };
};

export const setTableSortingColumn = (
  columnKey: string,
  sortingDirection: "asc" | "desc"
) => {
  return {
    type: actionTypes.SET_TABLE_SORTING_COLUMN,
    payload: { columnKey, sortingDirection },
  };
};

// export const setReportTableData = (tableData: Array<any>) => {
//   return {
//     type: actionTypes.SET_REPORT_TABLE_DATA,
//     payload: tableData,
//   };
// };

export const sortReportTableData = (
  tableData: Array<any>,
  tableSortingColumn: Record<string, "asc" | "desc">
) => {
  return {
    type: actionTypes.SORT_REPORT_TABLE_DATA,
    payload: { tableData, tableSortingColumn },
  };
};
