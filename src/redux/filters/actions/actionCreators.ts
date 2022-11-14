import { Dispatch } from "react";
import { FilterActionTypes } from "./actionTypes";

export const getAllFiltersOptionsForAccount = (requestParams: string) => {
  return {
    type: FilterActionTypes.GET_ALL_FILTER_REQUEST,
    payload: requestParams,
  };
};

export const setCalenderData = (calenderData: any) => {
  return {
    type: FilterActionTypes.SET_DATES_FROM_CALENDER,
    payload: calenderData,
  };
};

export const setSelectedFilterOptions = (data: any) => {
  return {
    type: FilterActionTypes.SET_FILTER_OPTIONS_SELECTED_IN_REDUX,
    payload: data,
  };
};
export const setDownloadOptionsAndDownload = (data: any) => {
  return {
    type: FilterActionTypes.SET_DOWNLOAD_OPTIONS_AND_DOWNLOAD,
    payload: data,
  };
};

export const setLastUpdatedTime = (data: any) => {
  return {
    type: FilterActionTypes.SET_LAST_UPDATED_TIME,
    payload: data.time,
  };
};
export const setSelectedFilterType = (data: string) => {
  return {
    type: FilterActionTypes.SET_SELECTED_FILTER_TYPE,
    payload: data,
  };
};

export const setShowColumnCustomizePop = (data: boolean) => {
  return {
    type: FilterActionTypes.SET_SHOW_COLUMN_CUSTOMIZE_POP,
    payload: data,
  };
};
export const toggleShowColumnCustomizePop = () => {
  return {
    type: FilterActionTypes.TOGGLE_SHOW_COLUMN_CUSTOMIZE_POP,
    payload: "CHANGES",
  };
};
export const setShowColumnNameCustomizePop = (data: boolean) => {
  return {
    type: FilterActionTypes.SET_SHOW_COLUMN_NAMECUSTOMIZE_POP,
    payload: data,
  };
};
export const toggleShowColumnNameCustomizePop = () => {
  return {
    type: FilterActionTypes.TOGGLE_SHOW_COLUMN_NAMECUSTOMIZE_POP,
    payload: "CHANGE",
  };
};

export const setReportColumnInDnd = (data: any) => {
  return {
    type: FilterActionTypes.SET_ALL_REPORT_COLUMN_IN_DND,
    payload: data,
  };
};
export const setDefaultOptionsForColumnCustomize = (data: any) => {
  return {
    type: FilterActionTypes.SET_DEFAULT_OPTIONS_REPORT_COLUMN_IN_DND,
    payload: data,
  };
};

export const setShowEditColumnName = (data: boolean) => {
  return {
    type: FilterActionTypes.SET_SHOW_EDIT_COLUMN_NAME,
    payload: data,
  };
};
export const setToggleShowEditColumnName = () => {
  return {
    type: FilterActionTypes.TOGGLE_SHOW_EDIT_COLUMN_NAME,
    payload: "CHANGE",
  };
};

export const setFilterHasChanged = () => {
  return {
    type: FilterActionTypes.SET_HAS_CHANGE_FILTER,
    payload: "OK",
  };
};

export const setKpiEditedOption = (data: any) => {
  return {
    type: FilterActionTypes.SET_KPI_EDITED_OPTIONS,
    payload: data,
  };
};

export const setDownloadViewAll = (data: string) => {
  return {
    type: FilterActionTypes.SET_DOWNLOAD_VIEW_ALL,
    payload: data,
  };
};

export const setShowRightSideBar=(data:boolean)=>{
  return {
    type:FilterActionTypes.SET_SHOW_RIGHTSIDE_BAR,
    payload:data
  }
}
export const toggleShowRightSideBar=()=>{
  return {
    type:FilterActionTypes.TOGGLE_SHOW_RIGHTSIDE_BAR,
    payload:"CHANGE"
  }
}
export const getAllReportCsvData = (bodyData:any,dis:any) => {

   return {
    type:FilterActionTypes.DIRECT_DOWNLOAD_REPORT_REQUEST,
    payload:bodyData,
    dispatch:dis
   }
  
}
export const refreshFilters=()=>{
  return {
    type:FilterActionTypes.REFRESH_FILTER_OPTIONS,
    payload :"REFERSH"
  }
}
export const toggleRefresh=()=>{
  return {
    type:FilterActionTypes.TOGGLE_REFRESH,
    payload:"CHANGE"
  }
}
export const refreshApi=(data:any)=>{
  return {
  type:FilterActionTypes.REFRESH_PAGE_TIME_API_REQUEST,
  payload:data
  }
}
