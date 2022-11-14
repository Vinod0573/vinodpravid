import { takeLatest, takeEvery } from "redux-saga/effects";
import actionTypes from "../actionTypes/login.actionTypes";
import {schemaUpdateWorker,requestFeatureWorker} from "./login.saga"


export default function* loginSagas() {
//  yield takeLatest(actionTypes.LOGIN_REQUEST, loginWorker);
  yield takeLatest(actionTypes.SET_SCHEMA_UPDATE_REQUEST,schemaUpdateWorker);
  yield takeLatest(actionTypes.SET_REQUEST_FEATURE_API_REQUEST,requestFeatureWorker)
}
