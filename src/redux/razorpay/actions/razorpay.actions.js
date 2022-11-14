import actionTypes  from "../actionTypes/razorpay.actionTypes";
import Axios from "axios";
import {SERVER_URL_CONNECTOR, PAYMENT_INFO_URL } from '../../../services/ApiRoutes'


export const getRazorpayPaymentDetails =  (bodyData) => {
    return async function (dispatch) {
        const fetchPaymentUrl = `${SERVER_URL_CONNECTOR}${PAYMENT_INFO_URL.FETCH_PAYMENT_INFO}`
      try {
        let response = await Axios.post(fetchPaymentUrl,bodyData);
              response = response.data
          dispatch({
            type: RAZORPAY_ACTION.SET_RAZORPAY_DATA,
            payload: response,
          });
          return response
      } catch (err) {
        console.log(err);
      }
    };
    }

    export const getRazorpayPaymentDownloadData =  (bodyData) => {
      return async function (dispatch) {
          const getDownloadUrl = `${SERVER_URL_CONNECTOR}${PAYMENT_INFO_URL.PAYMENT_INFO_DOWNLOAD}`
        try {
          let response = await Axios.post(getDownloadUrl,bodyData);
                response = response.data
            dispatch({
              type: RAZORPAY_ACTION.SET_RAZORPAY_DOWNLOAD_DATA,
              payload: response,
            });
            // console.log(response,"999")
            return response
        } catch (err) {
          console.log(err);
        }
      };
      }
