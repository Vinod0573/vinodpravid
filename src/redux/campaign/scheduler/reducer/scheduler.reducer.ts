import actionTypes  from "../actionTypes/scheduler.actionTypes";
import { stateInterface } from "../interface";

const schedulerReducer  = (
  state: stateInterface = {
   
  },
  action: { payload: any; type: string }
) => {
  switch(action.type){
    case actionTypes.SET_DIALTIME :{
        return{
            ...state,
            dialtimeData:action.payload
        }
    }
    case actionTypes.SET_DISPOSITION_TYPE:{
      return{
        ...state,
        dispositionType:action.payload
    }
    }
    
    case actionTypes.SET_USECASE  :{
      return{
          ...state,
          usecaseList:action.payload
      }
  }
  case actionTypes.SET_SELECTED_USECASE :{
    return{
        ...state,
        selectedUsecase:action.payload
    }
}
case actionTypes.CHECKED_SCHEDULER_DATA:{
  return{
    ...state,
    selectedScheduler:action.payload
}
}
case actionTypes.SET_TIME:{
  return{
    ...state,
    time:action.payload
}
}
case actionTypes.SET_ANALYTICS_CAMPAIGN:{
  return{
    ...state,
     analyticsIdName:action.payload
}
}
    default: {
      return {
        ...state,
      };
    }
  }
};

export default schedulerReducer ;
