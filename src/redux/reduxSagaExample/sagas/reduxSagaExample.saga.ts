import { put, call } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import { config, DUMMYAPI } from "../../../services/ApiRoutes";

export function* additionWorker() {
  const result = 2 + 2;
  yield put({
    type: actionTypes.RESULT,
    data: result,
  });
}

export function* substractionWorker() {
  const result = 2 - 1;
  yield put({
    type: actionTypes.RESULT,
    data: result,
  });
}

export function* restAPICallWorker(): any {
  try {
    const response = yield call(config.GET, DUMMYAPI.GET_DUMMY_RESPONSE);
    
    yield put({
      type: actionTypes.API_SUCCESS,
      response: response,
    });
  } catch (error) {
    yield put({
      type: actionTypes.API_FAILURE,
      error: error,
    });
  }
}
