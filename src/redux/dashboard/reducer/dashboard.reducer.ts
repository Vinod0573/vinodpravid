import actionTypes from "../actionTypes";
import { stateInterface } from "../interface";

const dashboardReducer = (
  state: stateInterface = {},
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SOURCE_TAB:
      return {
        ...state,
        sourceTab: action.payload,
      };

    case actionTypes.SET_SELECTED_CHANNEL_TAB:
      return {
        ...state,
        channelTab: action.payload,
      };

    case actionTypes.SET_SELECTED_WHATSAPP_CHANNEL_TAB:
      return {
        ...state,
        whatsappChannelTab: action.payload,
      };

    case actionTypes.SET_SELECTED_SUBMODULE_TAB:
      return {
        ...state,
        subModuleTab: action.payload,
      };
    case actionTypes.SET_SUBHEADER_TAB: {
      return {
        ...state,
        channelTab: action.payload.channelTab,
        whatsappChannelTab: action.payload.subChannelTab,
        subModuleTab: action.payload.subModuleTab,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default dashboardReducer;
