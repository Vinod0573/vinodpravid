import AllClientActionTypes from "../actionTypes/allClient.actionTypes";
import {
  SERVER_URL,
  ONBOARDING_URL,
  config,
} from "../../../services/ApiRoutes";
import { call, put } from "redux-saga/effects";

export function* setAllClient(data: any): any {
  yield put({ type: AllClientActionTypes.SET_ALL_CLIENT, payload: data });
}
export function* setCurrentClient(data: any) {
  yield put({
    type: AllClientActionTypes.SET_CURRENT_CLIENT,
    payload: data.payload,
  });
}
export function* getAllClientListSaga(): any {
  yield put({ type: AllClientActionTypes.SET_LOADING, payload: true });
  try {
    const allClientUrl = `${SERVER_URL}${ONBOARDING_URL.ALL_CLIENT_INFO}`;
    // console.log("allccccc");
    const response = yield call(config.GET, allClientUrl);
    //console.log(response.data.data, "allClient nithin");
    yield call(setAllClient, response.data.data);
  } catch (error) {
    console.error(error);
  }
  yield put({ type: AllClientActionTypes.SET_LOADING, payload: false });
}
