import { combineReducers } from "redux";
import { leftMenuReducer } from "./leftMenu";
import baseScreenStateReducer from "./baseScreenState/reducer";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";

const persistLeftMenuConfig = {
  key: "leftMenu",
  storage: storage,
  whitelist: [
    "moduleDetails",
    "isOnlyIcons",
    "subModuleMapping",
    "urlToModuleMapping",
    "defaultSelectedModule",
  ],
};

const rootBaseScreenReducer = combineReducers({
  leftMenu: persistReducer(persistLeftMenuConfig, leftMenuReducer),
  baseScreenState: baseScreenStateReducer,
});

export default rootBaseScreenReducer;
