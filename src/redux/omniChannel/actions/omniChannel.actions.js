import actionTypes  from "../actionTypes/omniChannel.actionTypes";

import axios from "axios";

import { OMNICHANNEL  } from "../../../services/ApiRoutes";

export const  selectOmniChannelByNav= (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_CHANNEL_BY_NAV,
      payload: data,
    });
  };
};
export const  storeSedulerSettingDataWhatsApp= (data) => {
    return async function (dispatch) {
       
      dispatch({
        type: actionTypes.SET_SCHEDULERSETTING_WHATSAPP ,
        payload: data,
      });
    };
  };
  export const  getTemplatesWhatsApp= (data) => {
    return async function (dispatch) {
        let url = `${OMNICHANNEL.GET_SELECTED_TEMPLATE}`
        try {
            dispatch({
                type: actionTypes.SET_TEMPLATE_REQUEST,
               
              });
       
            const response = await axios.post(url, data
            );
        
            dispatch({
                type: actionTypes.SET_TEMPLATE_SUCCESS ,
                payload: response?.data?.data,
              });
          
          } catch (err) {
            dispatch({
                type: actionTypes.SET_TEMPLATE_FAILURE ,
                payload: err,
              });
            console.log(err);
          }
       
     
    };
  };
  export const  getTemplatesDropdown= (data) => {
    return async function (dispatch) {
        let url = OMNICHANNEL.GET_TEMPLATE_DROPDOWN_URL
        try {
            const response = await axios.post(url, data
                );
      dispatch({
        type: actionTypes.SET_TEMPLATE_DROPDOWN ,
        payload: response?.data?.data,
      });
          } catch (err) {
           
            console.log(err);
          }
     
    };
  };
  export const  getMindMap= (data) => {
    return async function (dispatch) {
      let url = OMNICHANNEL.GET_MINDMAP 
        try {
          const response = await axios.post(url, data
              );
      dispatch({
      type: actionTypes.SET_MINDMAP,
      payload: response?.data?.data,
      });
        } catch (err) {
         
          console.log(err);
        }
   
  };
  };
  // whatsApp DBC
  export const setDCBdataforwhatsApp = (index, value ,key) => {
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_DCBDATA_WHATSAPP ,
        payload: { index , value,key},
      });
    };
  }
  export const setDCBdataforwhatsAppflowupTime = (index, value ) => {
   
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_DCBDATA_WHATSAPP_FLOWUP,
        payload: { index , value},
      });
    };
  }
  export const setSelectedDispositionDataWP = (data) => {
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_SELECTED_DISPOSITION_DATAWP,
        payload: data,
      });
    };
  };
  export const storeSeparateSelectedDataWP = (data) => {
    console.log(data);
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_SEPARATE_SELECTED_DATAWP,
        payload: data,
      });
    };
  };
  export const setSelectedDispositionDataChildWP = (data) => {
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_SELECTED_DISPOSITION_DATA_CHILDWP,
        payload: data,
      });
    };
  };
  export const shuffledConnectedSuccedingWP = (data) => {
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_SHUFFLED_CONNECTED_SUCCEDING_DATAWP,
        payload: data,
      });
    };
  };
  export const shuffledNotConnectedSuccedingWP = (data) => {
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_SHUFFLED_NOTCONNECTED_SUCCEDING_DATAWP,
        payload: data,
      });
    };
  };
  export const setNumberOfFollowUp = (data) => {
    return async function (dispatch) {
      dispatch({
        type: actionTypes.SET_NUMBER_OF_FOLLOWUP,
        payload: data,
      });
    };
  };
 
