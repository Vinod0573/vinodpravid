import { debounce } from "lodash";
import AllClientActionTypes from "../actionTypes/allClient.actionTypes";
export function setCurrentSelectedClient(data: any) {
  return {
    type: AllClientActionTypes.SET_CURRENT_CLIENT_SAGA,
    payload: data,
  };
}

export function getAllClientData() {
  return {
    type: AllClientActionTypes.GET_ALL_CLIENT,
  };
}

export function setAllClientData(data:any){
  return {
    type:AllClientActionTypes.SET_ALL_CLIENT,
    payload:data
  }
}