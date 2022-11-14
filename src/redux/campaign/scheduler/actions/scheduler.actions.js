import actionTypes  from "../actionTypes/scheduler.actionTypes";

import { SCHEDULERSECTION } from '../../../../services/ApiRoutes';
import axios from "axios";

export const storeSelectedDialTime = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_DIALTIME,
      payload: data,
    });
  };
};

export const dispositionType=(data)=>{
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_DISPOSITION_TYPE,
      payload: data,
    });
  };
}
  export const storeUsecase = (data) => {
    return async function(dispatch){
      dispatch({
        type:actionTypes.SET_USECASE ,
        payload: data
      })
    }
  }
  export const storeSelectedUsecase = (data) => {
    return async function(dispatch){
      dispatch({
        type:actionTypes.SET_SELECTED_USECASE,
        payload: data
      })
    }
  }

export const submitDataList = (data,tokenZx,history) => {
 
  return  async function (dispatch) {
   try {
     const res =  await axios.post(SCHEDULERSECTION.SAVE_SCHEDULER_DATA,data,{headers:{"x-access-token":tokenZx}});
  
     return res
   } catch (e) {
     console.log(e);
   }
 };
};

export const CheckedData=(data)=>{
  return async function(dispatch){
    dispatch({
      type:actionTypes.CHECKED_SCHEDULER_DATA,
      payload: data
    })
  }
}
export const storeTime = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_TIME,
      payload: data,
    });
  };
};
export const storeDataForAnalytics = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_ANALYTICS_CAMPAIGN,
      payload: data,
    });
  };
};

