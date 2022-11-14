import actionTypes  from "../actionTypes/breadcrum.actionTypes";
import { stateInterface } from "../interface";


const breadcrumReducer = (
  state: stateInterface = {
    selectedTab: ""
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_TAB: {
      return {
        ...state,
        selectedTab : action.payload,
      };
    }
    case "SET_TAB":{
      return {
        ...state,
        tabName:action.payload
      }
    }
    case actionTypes.SET_BREADCRUM :{
      return{
          ...state,
          breadcrumName:action.payload
      }
  }
 
  case actionTypes.GET_SCHEDULER_DATA:{
    return{
      ...state,
      schedulerData: action.payload
    }
  }
  case actionTypes.SET_DIAL_DATA:{
    return{
      ...state,
      diallerTimeData: action.payload
    }
  }
  case actionTypes.SET_CALLING_DATA:{
    return{
      ...state,
      callingCondition: action.payload
    }
  }
  case actionTypes.SET_DISPOSITION_DATA :{
    return{
      ...state,
      dispositionBasedCalling: action.payload
    }
  }
  case actionTypes.SET_SHUFFLED_DATA:{
    return{
      ...state,
      shuffledCallingConditionData: action.payload
    }
  }
  case actionTypes.SET_SHUFFLED_DISPOSITION_DATA:{
    return{
      ...state,
      shuffledDispositionData: action.payload
    }
  }
  case actionTypes.SET_SHUFFLED_CONNECTED_DISPOSITION_DATA:{
    return{
      ...state,
      shuffledConnectedDispositionData: action.payload
    }
  }
  case actionTypes.SET_SHUFFLED_CONNECTED_SUCCEDING_DATA:{
    return{
      ...state,
      shuffledConnectedSucceding: action.payload
    }
  }
  case actionTypes.SET_SHUFFLED_NOTCONNECTED_SUCCEDING_DATA:{
    return{
      ...state,
      shuffledNotConnectedSucceding: action.payload
    }
  }

  case actionTypes.SET_SELECTED_DISPOSITION_DATA:{
    return{
      ...state,
      selectedDispositionData: action.payload
    }
  }

  case actionTypes.SET_SELECTED_DISPOSITION_DATA_PARENT:{
    return{
      ...state,
      selectedDispositionDataParent: action.payload
    }
  }

  case actionTypes.SET_SELECTED_DISPOSITION_DATA_CHILD:{
    return{
      ...state,
      selectedDispositionDataChild: action.payload
    }
  }
  case actionTypes.SET_SELECTED_CALLING_DATA:{
    return{
      ...state,
      selectedCallingData: action.payload
    }
  }
  case actionTypes.SET_STATIC_DISPOSITION_DATA:{
    return{
      ...state,
      staticDispositionData: action.payload
    }
  }
  case actionTypes.SET_SEPARATE_SELECTED_DATA:{
    return{
      ...state,
      separateDispositionData: action.payload
    }
  }
  case actionTypes.SET_UPDATE_DATA:{
    return{
      ...state,
      updateData: action.payload
    }
  }
  case actionTypes.SET_SHOW_CALLING_LIST:{
    return{
      ...state,
      goToCallingList: action.payload
    }
  }
  case actionTypes.SET_CALLING_DAY:{
    return{
      ...state,
      callingDay: action.payload
    }
  }
  case actionTypes.SET_SELECTED_DATA_RETRY_TIME:{
    return{
      ...state,
      retryTime:action.payload
    }
  }
  case actionTypes.SET_SAME_BTN:{
    return{
      ...state,
      selectsamedaybtn:action.payload
    }
  }
  case actionTypes.SET_EMI_VALUE:{
    return{
      ...state,
      selectedEMIOrder:action.payload
    }
  }
  case actionTypes.SET_BREADCRUM_DATA:{
    return{
      ...state,
      breadCrumData:action.payload
    }
  }
  case actionTypes.SET_PHASE:{
    return {
      ...state,
      selectedPhase:action.payload
  }
  }

  case actionTypes.SET_API_CSV_LIST:{
    return{
      ...state,
      csvList:action.payload
    }
  }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default breadcrumReducer;
