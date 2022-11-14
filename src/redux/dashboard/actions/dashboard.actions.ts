import actionTypes from "../actionTypes";

export const setSelectedSourceTab = (payload: string) => {
  return {
    type: actionTypes.SET_SELECTED_SOURCE_TAB,
    payload: payload,
  };
};

export const setSelectedChannelTab = (payload: string) => {
  return {
    type: actionTypes.SET_SELECTED_CHANNEL_TAB,
    payload: payload,
  };
};

export const setSelectedWhatsAppChannelTab = (payload: string) => {
  return {
    type: actionTypes.SET_SELECTED_WHATSAPP_CHANNEL_TAB,
    payload: payload,
  };
};

export const setSelectedSubmoduleTab = (payload: string) => {
  return {
    type: actionTypes.SET_SELECTED_SUBMODULE_TAB,
    payload: payload,
  };
};

export const setSubHeaderTabs = (
  channelTab: string,
  subChannelTab: string,
  subModuleTab: string
) => {
  return {
    type: actionTypes.SET_SUBHEADER_TAB,
    payload: { channelTab, subChannelTab, subModuleTab },
  };
};
