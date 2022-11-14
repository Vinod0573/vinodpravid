import actionTypes from "../actionTypes";

export const setRootPortalScreen = (screenName: string) => {
  return { type: actionTypes.SET_ROOT_PORTAL, payload: screenName };
};

export const setConversationIdSummaryPortal = (id: string) => {
  return { type: actionTypes.SET_CONVERSATION_ID_SUMMARY_PORTAL, payload: id };
};
