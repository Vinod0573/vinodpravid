import { AppDispatch } from "../../rootStore";
import { actions as actionName } from "./leftMenu.interface";
export declare const setIsOnlyIcons: (dispatch: AppDispatch, value: boolean) => void;
export declare const setLeftSideModuleDetails: (moduleDetails: Array<any>) => {
    type: actionName;
    payload: any[];
};
export declare const setHighlightedModule: (moduleName: string) => {
    type: actionName;
    payload: string;
};
export declare const setLeftModulesToVisibleAll: (modules: Array<any>) => {
    type: actionName;
    payload: any[];
};
export declare const setSubModuleMappingToModule: (mapping: Record<string, string>) => {
    type: actionName;
    payload: Record<string, string>;
};
export declare const setUrlToModuleMapping: (mapping: Record<string, string>) => {
    type: actionName;
    payload: Record<string, string>;
};
export declare const setDefaultSelectedModule: (defaultSelected: Record<string, string>) => {
    type: actionName;
    payload: Record<string, string>;
};
