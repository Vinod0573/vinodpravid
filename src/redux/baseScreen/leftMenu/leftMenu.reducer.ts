import { Reducer } from "redux";
import { stateInterface, actionTypes, actions } from "./leftMenu.interface";

const initialState: stateInterface = {
  moduleDetails: [],
  highlightedModule: "",
  isOnlyIcons: false,
  subModuleMapping: {},
  urlToModuleMapping: {},
  defaultSelectedModule: {},
};

const leftMenuReducer: Reducer<stateInterface, actionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actions.SET_IS_ONLY_ICONS: {
      return { ...state, isOnlyIcons: action.payload };
    }
    case actions.SET_LEFT_SIDE_MODULES: {
      return { ...state, moduleDetails: action.payload };
    }
    case actions.SET_HIGHLIGHTED_MODULE: {
      return { ...state, highlightedModule: action.payload };
    }
    case actions.SET_SUBMODULE_MAPPING_TO_MODULE: {
      return { ...state, subModuleMapping: action.payload };
    }
    case actions.SET_URL_TO_MODULE_MAPPING: {
      return { ...state, urlToModuleMapping: action.payload };
    }
    case actions.DEFAULT_SELECTED_MODULE: {
      return { ...state, defaultSelectedModule: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default leftMenuReducer;
