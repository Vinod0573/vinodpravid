import { allClientState } from "../types";
declare const allClientReducer: (state: allClientState | undefined, action: {
    type: any;
    payload: any[];
}) => {
    allClientList: any[];
    currentSelectedClient: [];
    isLoading: boolean;
} | {
    currentSelectedClient: any[];
    allClientList: [];
    isLoading: boolean;
} | {
    isLoading: any[];
    allClientList: [];
    currentSelectedClient: [];
};
export default allClientReducer;
