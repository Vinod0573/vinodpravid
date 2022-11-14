import actionTypes from "../actionTypes/login.actionTypes";

export const setLoggedInUserInfo = (value) => {
  // console.log("logg", value);
  return {
    type: actionTypes.SET_LOGGEDIN_USER_INFO,
    payload: value,
  };
};

export const setIsPageType = (value) => {
  return {
    type: actionTypes.SET_PAGE_TYPE,
    payload: value,
  };
};

export const setIsActivePageType = (value) => {
  return {
    type: actionTypes.SET_ACTIVE_PAGE_TYPE,
    payload: value,
  };
};

export const doLogin = (value) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    payload: value,
  };
};

export const updateSchemaRequest = (data) => {
  return {
    type: actionTypes.SET_SCHEMA_UPDATE_REQUEST,
    payload: data,
  };
};
export const directlyUpdateSchema = (data) => {
  return {
    type: actionTypes.SET_SCHEMA_UPDATE_SUCCESS,
    payload: data,
  };
};

export const userLogoutAction = (data) => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};
export const getrequestFeature = (data) => {
  return {
    type: actionTypes.SET_REQUEST_FEATURE_API_REQUEST,
    payload: data,
  };
};
