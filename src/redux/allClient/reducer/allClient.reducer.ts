import { allClientState } from "../types";

import AllClientActionTypes from "../actionTypes/allClient.actionTypes";
const allClientReducer = (
  state: allClientState = {
    allClientList: [],
    currentSelectedClient: [],
    isLoading: false,
  },
  action: { type: any; payload: any[] }
) => {
  switch (action.type) {
    case AllClientActionTypes.SET_ALL_CLIENT: {
      const sortedClientList = action.payload.sort((a: any, b: any) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        else return 0;
      });
      return { ...state, allClientList: action.payload };
    }
    case AllClientActionTypes.SET_CURRENT_CLIENT: {
      return { ...state, currentSelectedClient: action.payload };
    }
    case AllClientActionTypes.SET_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
export default allClientReducer;
