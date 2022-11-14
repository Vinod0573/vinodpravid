import { createReducer } from "@reduxjs/toolkit";
import actionTypes from "../actionTypes/login.actionTypes";
import { stateInterface } from "../interface";
import { schema } from "../../../../components/moduleComponents/onBoarding//login/loginField/schema";

const loginReducer = (state: stateInterface = {userLoginInfo: "",isActivePageType: "",isPageType: "",isSchemaUpdating:false, isSuccess:false},action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.SET_LOGGEDIN_USER_INFO: {
      return {
        ...state,
        userLoginInfo: action.payload,
      };
    }

    case actionTypes.SET_PAGE_TYPE: {
      return {
        ...state,
        isPageType: action.payload,
      };
    }

    case actionTypes.SET_ACTIVE_PAGE_TYPE: {
      return {
        ...state,
        isActivePageType: action.payload,
      };
    }
    
 case actionTypes.SET_SCHEMA_UPDATE_REQUEST :{
  return {
    ...state,
    isSchemaUpdating:true,
    
  }
 }
 case actionTypes.SET_SCHEMA_UPDATE_SUCCESS:{
  //console.log(action.payload,"FROM REDUCER");
  return {
    ...state,
    isSchemaUpdating:false,
    userLoginInfo:{...state.userLoginInfo,schema:action.payload}
  }
 }
 case actionTypes.SET_SCHEMA_UPDATE_FAILURE:{
   return {...state,
    error:action.payload,
    isSchemaUdating:false}
 }

 case actionTypes.SET_REQUEST_FEATURE_API_REQUEST :{
  return {
    ...state,
    isRequestFeature: action.payload,
    isSuccess:false
    
  }
 }
 case actionTypes.SET_REQUEST_FEATURE_SUCCESS:{
  return {
    ...state,
    isRequestFeatureSuccess: action.payload,
    isSuccess:true
  }
 }
 case actionTypes.SET_REQUEST_FEATURE_FAILURE:{
   return {
     ...state,
    isRequestFeatureFailure: action.payload,
    isSuccess:false
  }
 }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default loginReducer;
