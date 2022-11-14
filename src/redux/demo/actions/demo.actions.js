import { actionChannel } from "redux-saga/effects";
import actionTypes  from "../actionTypes/demo.actionTypes";

export function setDemoAgentConfigurationData(payload) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_DEMO_AGENTCONFIGURATION_DATA,
      payload: payload
    })
  }
}
export function setDemoPage( payload) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_DEMO_PAGE,
      payload: payload
    })
  }
}
export function setPhoneNumberdemo(payload) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_PHONE_NUMBER_TYPE,
      payload: payload
    })
  }
}