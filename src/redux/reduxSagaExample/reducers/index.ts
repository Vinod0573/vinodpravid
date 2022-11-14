import { combineReducers } from "redux";
import mathsOperation from "../reducers/reduxSagaExample.reducer";

const mathFunctionReducer = combineReducers({
  mathsOperation,
});

export default mathFunctionReducer;
