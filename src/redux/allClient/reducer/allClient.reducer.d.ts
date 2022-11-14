import { allClientState } from "../types";
declare const allClientReducer: (state: allClientState | undefined, action: {
    type: any;
    payload: any;
}) => {
    allClientList: any;
    currentSelectedClient: [];
} | {
    currentSelectedClient: any;
    allClientList: [];
};
export default allClientReducer;
