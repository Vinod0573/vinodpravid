import actionType from "../actionTypes";

const mathOperationIntitialState = {
  isLoading: false,
    result: "",
  API_Response:''
};

export default function mathOperationReducers(
  initialstate = mathOperationIntitialState,
  action: any
) {
  switch (action.type) {
    case actionType.RESULT:
      return { ...initialstate,result: action.data,};

    case actionType.SUBSTRATION:
      return { ...initialstate,result: action.data,};

    case actionType.API_REQUEST:
          return { ...initialstate, isLoading: true};
      
    case actionType.API_SUCCESS:
      return {...initialstate,isLoading: false,API_Response: action.response};

    case actionType.API_FAILURE:
      return {...initialstate,isLoading: false,API_Response: action.error};

    default:
      return initialstate;
  }
}
