import actionTypes  from "../actionTypes/integration.actionTypes";
import { stateInterface } from "../interface";

const integartionReducer = (
  state: stateInterface = {
    jobName: "",
    selectedTab: "",
    pageNo : ""
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.SET_JOBNAME_TYPE:{
      return {
        ...state,
        jobName:action.payload
      }
    }
    case actionTypes.SET_SELECTED_TAB:{
      return{
        ...state,
        selectedTab: action.payload
      }
    }
    case actionTypes.SET_PAGE_NO_WHATSAPP:{
      return {
        ...state,
        pageNo:action.payload
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default integartionReducer;
