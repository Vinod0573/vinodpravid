import { takeEvery, takeLatest } from "redux-saga/effects";
import { FilterActionTypes } from "../actions/actionTypes";
import { downloadCsv, getAllFilterOptionsWorker, setSelectedFilterOptionsWorker,updateLastUpdateWorker } from "./sagaFuns";
import { downloadCsvForReport } from "./sagaFuns";
export default function* filterWatcher() {
yield takeLatest(FilterActionTypes.GET_ALL_FILTER_REQUEST, getAllFilterOptionsWorker);
yield takeEvery(FilterActionTypes.SET_FILTER_OPTIONS_SELECTED_IN_REDUX,setSelectedFilterOptionsWorker);
yield takeLatest(FilterActionTypes.SET_DOWNLOAD_OPTIONS_AND_DOWNLOAD,downloadCsv);
yield takeLatest(FilterActionTypes.DIRECT_DOWNLOAD_REPORT_REQUEST,downloadCsvForReport);
yield takeLatest (FilterActionTypes.REFRESH_PAGE_TIME_API_REQUEST,updateLastUpdateWorker)
}
