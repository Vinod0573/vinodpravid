export declare enum actions {
    SET_MENU_OPTIONS = "SET_MENU_OPTIONS",
    SET_IS_ONLY_ICONS = "SET_IS_ONLY_ICONS"
}
export interface optionType {
    name: string;
    greyIcon: any;
    whiteIcon: any;
    isActive: boolean;
    url: string;
    pageName: string;
}
export interface stateInterface {
    menuOptions: Array<optionType>;
    isOnlyIcons: boolean;
    rootPortalScreen: string;
}
export interface setMenuOptions {
    type: actions.SET_MENU_OPTIONS;
    payload: Array<optionType>;
}
export interface setIsOnlyIcons {
    type: actions.SET_IS_ONLY_ICONS;
    payload: boolean;
}
export declare type actionTypes = setIsOnlyIcons | setMenuOptions;
