import { takeLatest } from "redux-saga/effects";
import actionTypes from "../actionTypes";
import {
  apiCall,
} from "./transcript.saga";

export default function* transcriptWatcher(): any {
    yield takeLatest(actionTypes.CALL_API, apiCall);
    //yield takeEvery(actionTypes.SET_ALL_PHONE_NUMBER, setAllPhoneList);
}
