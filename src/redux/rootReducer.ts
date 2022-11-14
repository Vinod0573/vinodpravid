import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import loginReducer from "./onboarding/login/reducer";
import rootLoggerReducer from "./logger";
import rootBaseScreenReducer from "./baseScreen";
import integartionReducers from "./integration/reducer";
import breadcrumReducer from "./breadcrum/reducer";
import dashboardReducer from "./dashboard/reducer";
import mathFunctionReducer from "./reduxSagaExample/reducers";
import razorpayReducer from "./razorpay/reducer";
import filterReducer from "./filter/reducer";
import demoReducer from "./demo/reducer";
import operationReducer from "./adminView/operation/reducer";
import filterReducers from "./filters/reducer/filterReducer";
import campaignReducer from "./campaign/reducer";
import omniChannelReducer from "./omniChannel/reducer";
import schedulerReducer from "./campaign/scheduler/reducer";
import analyticsReducer from "./analytics/reducer";
import allClientReducer from "./allClient/allClient.RootReducer";
import campaignTestingInfoReducer from "./campaignTestingInfo/reducer";

const persistLoginConfig = {
  key: "login",
  storage: storage,
  whitelist: ["userLoginInfo", "isActivePageType"],
};
const persistBreadcrumConfig = {
  key: "breadcrum",
  storage: storage,
  whitelist: ["breadcrumName", "diallerTimeData", "callingCondition"],
};

const topLevelReducer = combineReducers({
  loginReducer: persistReducer(persistLoginConfig, loginReducer),
  integartionReducers,
  baseScreen: rootBaseScreenReducer,
  loggerReducer: rootLoggerReducer,
  mathFunctionReducer,
  breadcrumReducer: persistReducer(persistBreadcrumConfig, breadcrumReducer),
  razorpayReducer,
  filterReducer,
  demoReducer,
  allClientReducer,
  operationReducer,
  dashboardReducer,
  filterReducers,
  campaignReducer,
  omniChannelReducer,
  schedulerReducer,
  campaignTestingInfoReducer,
  analyticsReducer,
});

const rootReducers = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    return topLevelReducer(undefined, action);
  }
  return topLevelReducer(state, action);
};

export default rootReducers;
