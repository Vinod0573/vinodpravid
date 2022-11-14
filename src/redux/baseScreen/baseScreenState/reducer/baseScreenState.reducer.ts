import { Reducer } from "redux";
import actionType from "../actionTypes";
import { stateInterface, actionInterface } from "../interface";

const initialState: stateInterface = {
  rootPortalScreen: "",
  conversationIdSummaryPortal: "",
};

const baseScreenStateReducer: Reducer<stateInterface, actionInterface> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionType.SET_ROOT_PORTAL: {
      return { ...state, rootPortalScreen: action.payload };
    }
    case actionType.SET_CONVERSATION_ID_SUMMARY_PORTAL: {
      return { ...state, conversationIdSummaryPortal: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default baseScreenStateReducer;
