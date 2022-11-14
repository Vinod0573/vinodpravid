import actionTypes  from "../actionTypes/operation.actionTypes";
import { stateInterface } from "../interface";

const breadcrumReducer = (
  state: stateInterface = {
    allOperatedData: [],
    downloadData : []
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_OPERATED_DATA:{
      return{
          ...state,
          allOperatedData: action.payload
      };
  }
  case actionTypes.GET_ALL_OPERATED_DOWNLOAD:{
      return{
          ...state,
          downloadData: action.payload
      };
  }

  default: {
      return{
          ...state
      };
  }
  }
} ;

export default breadcrumReducer;
