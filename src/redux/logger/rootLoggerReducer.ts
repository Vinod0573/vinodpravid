import { combineReducers } from "redux";
import transcriptReducer from "./transcript/reducer/transcript.reducer";
import loggerStateReducer from "./loggerState/reducer";
import reportReducer from "./report/reducer";
import reportIssueReducer from "./reportIssue/reportIssueReducer";
import newReportIssueReducer from "./reportIssue/reducer/reportIssue.reducer";
const rootLoggerReducer = combineReducers({
  loggerState: loggerStateReducer,
  transcriptReducer,
  report: reportReducer,
  reportIssue: reportIssueReducer,
  newReportIssueReducer,
});

export default rootLoggerReducer;
