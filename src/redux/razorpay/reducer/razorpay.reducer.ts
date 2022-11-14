import actionTypes  from "../actionTypes/razorpay.actionTypes";
import { stateInterface } from "../interface";

const razorpayReducer = (
  state: stateInterface = {
    razorpayData: "",
    razorpayDownloadData: ""

  },
  action: { payload: any; type: string }
) => {
  
    switch (action.type) {
      case actionTypes.SET_RAZORPAY_DATA: {
        return {
          ...state,
          razorpayData: action.payload,
        };
      }
  
      case actionTypes.SET_RAZORPAY_DOWNLOAD_DATA: {
        return {
          ...state,
          razorpayDownloadData: action.payload,
        };
      }
  
  
      default:
        return {
          ...state
        };
    }
  }


export default razorpayReducer;
