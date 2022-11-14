import { AppDispatch } from "../../rootStore";
import { actions as actionName } from "./leftMenu.interface";

export const setIsOnlyIcons = (dispatch: AppDispatch, value: boolean) => {
  dispatch({ type: actionName.SET_IS_ONLY_ICONS, payload: value });
};

export const setLeftSideModuleDetails = (moduleDetails: Array<any>) => {
  return { type: actionName.SET_LEFT_SIDE_MODULES, payload: moduleDetails };
};

export const setHighlightedModule = (moduleName: string) => {
  return { type: actionName.SET_HIGHLIGHTED_MODULE, payload: moduleName };
};

export const setLeftModulesToVisibleAll = (modules: Array<any>) => {
  return { type: actionName.SET_LEFT_MODULES_TO_VISIBLE_ALL, payload: modules };
};

export const setSubModuleMappingToModule = (
  mapping: Record<string, string>
) => {
  return { type: actionName.SET_SUBMODULE_MAPPING_TO_MODULE, payload: mapping };
};

export const setUrlToModuleMapping = (mapping: Record<string, string>) => {
  return { type: actionName.SET_URL_TO_MODULE_MAPPING, payload: mapping };
};

export const setDefaultSelectedModule = (
  defaultSelected: Record<string, string>
) => {
  return { type: actionName.DEFAULT_SELECTED_MODULE, payload: defaultSelected };
};
