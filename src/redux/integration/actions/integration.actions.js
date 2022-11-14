import actionTypes  from "../actionTypes/integration.actionTypes";

export function setJobNameRedux(data, payload) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_JOBNAME_TYPE,
      payload: payload
    })
  }
}
export function setconnectorObject(data, payload) {
  return function (dispatch) {
    dispatch({
      type: data,
      payload: payload
    })
  }
}
export function setConnectorSaarthiObjectData(data, payload) {
  return function (dispatch) {
    dispatch({
      type: data,
      payload: payload
    })
  }
}
export function setSelectedTab(data, payload) {
  return function (dispatch) {
    dispatch({
      type: data,
      payload: payload
    })
  }
}
export function setPageNo(payload) {
  return function (dispatch) {
    dispatch({
      type: action.actionTypes.SET_PAGE_NO_WHATSAPP,
      payload: payload
    })
  }
}