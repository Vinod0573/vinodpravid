import actionTypes  from "../actionTypes/demo.actionTypes";
import { stateInterface } from "../interface";

const demoReducer = (
  state: stateInterface = {
    demoAgentConfigurationData: "",
    demopage : "",
    phoneNumber :""
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.SET_DEMO_AGENTCONFIGURATION_DATA:{
      return {
        ...state,
        demoAgentConfigurationData:action.payload
      }
    }
    case actionTypes.SET_DEMO_PAGE:{
      return {
        ...state,
        demopage:action.payload
      }
    }
    case actionTypes.SET_PHONE_NUMBER_TYPE:{
      return {
        ...state,
        phoneNumber:action.payload
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default demoReducer;
