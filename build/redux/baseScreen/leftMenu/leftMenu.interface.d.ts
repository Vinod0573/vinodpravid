export declare enum actions {
    SET_MENU_OPTIONS = "SET_MENU_OPTIONS",
    SET_IS_ONLY_ICONS = "SET_IS_ONLY_ICONS",
    SET_LEFT_SIDE_MODULES = "SET_LEFT_SIDE_MODULES",
    SET_HIGHLIGHTED_MODULE = "SET_HIGHLIGHTED_MODULE",
    SET_LEFT_MODULES_TO_VISIBLE_ALL = " SET_LEFT_MODULES_TO_VISIBLE_ALL",
    SET_SUBMODULE_MAPPING_TO_MODULE = "SET_SUBMODULE_MAPPING_TO_MODULE",
    SET_URL_TO_MODULE_MAPPING = "SET_URL_TO_MODULE_MAPPING",
    DEFAULT_SELECTED_MODULE = "DEFAULT_SELECTED_MODULE"
}
export interface stateInterface {
    isOnlyIcons: boolean;
    moduleDetails: Array<any>;
    highlightedModule: string;
    subModuleMapping: Record<string, string>;
    urlToModuleMapping: Record<string, string>;
    defaultSelectedModule: Record<string, string>;
}
export interface setIsOnlyIcons {
    type: actions.SET_IS_ONLY_ICONS;
    payload: boolean;
}
export interface setLeftSideModules {
    type: actions.SET_LEFT_SIDE_MODULES;
    payload: Array<any>;
}
export interface setHighlightedModule {
    type: actions.SET_HIGHLIGHTED_MODULE;
    payload: string;
}
export interface setSubModuleMappingToModule {
    type: actions.SET_SUBMODULE_MAPPING_TO_MODULE;
    payload: Record<string, string>;
}
export interface setUrlToModuleMapping {
    type: actions.SET_URL_TO_MODULE_MAPPING;
    payload: Record<string, string>;
}
export interface setDefaultSelectedModule {
    type: actions.DEFAULT_SELECTED_MODULE;
    payload: Record<string, string>;
}
export declare type actionTypes = setIsOnlyIcons | setLeftSideModules | setHighlightedModule | setSubModuleMappingToModule | setUrlToModuleMapping | setDefaultSelectedModule;
