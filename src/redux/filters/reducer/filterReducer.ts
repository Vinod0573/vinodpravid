import { FilterActionTypes } from "../actions/actionTypes";


const filterInitialState = {
  isLoading: false,
  error: "",
  filterOptions: {},
  selectedFilterOptions: {},
  calenderData: {
    startDate: new Date(),
    endDate: new Date(),
    formatedStartDate: "",
    formatedEndDate: "",
  },

  lastUpdated: new Date(),
  selectedFilterType: "",
  showColumnCustomizePopup: false,
  showColumnNameCustomizePop: false,
  allSelectedReportingColumn: [],
  showEditColumnName: false,
  defaultOptionsColumn:[],
  hasFilterChanged: true,
  downloadViewAll: "InActive",
  kpiEditedOptions:{Charts:[],Cards:[]},
  showRightSidePop:false,
  isReportDownloading:false,
  refreshPage:false,
  lastUpdatedTime:""
};
// const createDynamic = (initial: any, newStuff: any) => {
//   const x = { ...initial };
//   x.selectedFilterOptions[newStuff.type] = newStuff.options;
//   return { ...x };
// };

export default function filterReducers(
  initialstate:any = filterInitialState,
  action: any
) {
  switch (action.type) {
    case FilterActionTypes.GET_ALL_FILTER_REQUEST:
      return { ...initialstate, isLoading: true };
    case FilterActionTypes.GET_ALL_FILTER_SUCCESS:
      return {
        ...initialstate,
        isLoading: false,
        filterOptions: action.response,
      };
    case FilterActionTypes.GET_ALL_FILTER_FAILURE:
      return { ...initialstate, isLoading: false, error: action.error };
    case FilterActionTypes.SET_DATES_FROM_CALENDER:
      return {
        ...initialstate,
        calenderData: action.payload,
      };
    case FilterActionTypes.PUT_FILTER_OPTIONS_SELECTED_IN_REDUX: {
      const filterOptions=JSON.parse(JSON.stringify(initialstate.selectedFilterOptions))
      filterOptions[action.payload.type] = action.payload.options;
      if(action.payload.options.length===0){
        delete filterOptions[action.payload.type]
      }
      return { ...initialstate, selectedFilterOptions :filterOptions};
    }
    case FilterActionTypes.REFRESH_FILTER_OPTIONS:{
        
      Object.keys(initialstate.selectedFilterOptions).forEach((e:any)=>{
        delete initialstate.selectedFilterOptions[e];
      })
      return {
        ...initialstate
      }
    }
    case FilterActionTypes.SET_LAST_UPDATED_TIME:
      return {
        ...initialstate,
        lastUpdated: action.payload,
      };
    case FilterActionTypes.SET_SELECTED_FILTER_TYPE:
      return {
        ...initialstate,
        selectedFilterType: action.payload,
      };
    case FilterActionTypes.SET_SHOW_COLUMN_CUSTOMIZE_POP:
      return { ...initialstate, showColumnCustomizePopup: action.payload };
    case FilterActionTypes.TOGGLE_SHOW_COLUMN_CUSTOMIZE_POP:
      return {
        ...initialstate,
        showColumnCustomizePopup: !initialstate.showColumnCustomizePopup,
      };
    case FilterActionTypes.TOGGLE_SHOW_COLUMN_NAMECUSTOMIZE_POP:
      return {
        ...initialstate,
        showColumnNameCustomizePop: !initialstate.showColumnNameCustomizePop,
      };
    case FilterActionTypes.SET_SHOW_COLUMN_NAMECUSTOMIZE_POP:
      return {
        ...initialstate,
        showColumnNameCustomizePop: action.payload,
      };
    case FilterActionTypes.SET_ALL_REPORT_COLUMN_IN_DND:
      return {
        ...initialstate,
        allSelectedReportingColumn: action.payload,
      };
    case FilterActionTypes.SET_DOWNLOAD_VIEW_ALL:
      return {
        ...initialstate,
        downloadViewAll: action.payload,
      };
    case FilterActionTypes.SET_SHOW_EDIT_COLUMN_NAME:
      return {
        ...initialstate,
        showEditColumnName: action.payload,
      };
    case FilterActionTypes.TOGGLE_SHOW_EDIT_COLUMN_NAME:
      return {
        ...initialstate,
        showEditColumnName: !initialstate.showEditColumnName,
      };
    case FilterActionTypes.SET_HAS_CHANGE_FILTER:
      return {
        ...initialstate,
        hasFilterChanged: !initialstate.hasFilterChanged,
      };

      case FilterActionTypes.SET_KPI_EDITED_OPTIONS:{
        const filterOptions = JSON.parse(
          JSON.stringify(initialstate.kpiEditedOptions)
        );
  
        filterOptions[action.payload.type] = action.payload.options;
  
        return { ...initialstate, kpiEditedOptions: filterOptions };
      }
      case FilterActionTypes.SET_SHOW_RIGHTSIDE_BAR:return{
        ...initialstate,
        showRightSidePop:action.payload
      }
      case FilterActionTypes.TOGGLE_SHOW_RIGHTSIDE_BAR:
        return {
          ...initialstate,
          showRightSidePop:!initialstate.showRightSidePop
        }
        case FilterActionTypes.DIRECT_DOWNLOAD_REPORT_REQUEST: return {
          ...initialstate,
          isReportDownloading:true
        }
        case FilterActionTypes.DIRECT_DOWNLOAD_REPORT_SUCCESS: return {
          ...initialstate,
          isReportDownloading:false
        }
        case FilterActionTypes.DIRECT_DOWNLOAD_REPORT_FAILURE: return {
          ...initialstate,
          isReportDownloading:false
        }
       case FilterActionTypes.TOGGLE_REFRESH:
        return {
          ...initialstate,
          refreshPage:!initialstate.refreshPage
        }
       case FilterActionTypes.REFRESH_PAGE_TIME_API_SUCCESS:
        return {
          ...initialstate,
          lastUpdatedTime:action.payload
       } 

    default:
      return { ...initialstate };
  }
}
