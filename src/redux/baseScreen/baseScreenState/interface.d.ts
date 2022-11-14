import actionTypes from "./actionTypes";
//stateInterface
export interface stateInterface {
  rootPortalScreen: string;
  conversationIdSummaryPortal: string;
}

//actionInterface
interface setRootPortal {
  type: actionTypes.SET_ROOT_PORTAL;
  payload: string;
}
interface setConversationIdSummaryPortal {
  type: actionTypes.SET_CONVERSATION_ID_SUMMARY_PORTAL;
  payload: string;
}

export type actionInterface = setRootPortal | setConversationIdSummaryPortal;
