import actionTypes  from "../actionTypes/operation.actionTypes";
import axios from "axios";
import { SERVER_URL, OPERATION } from "../../../../services/ApiRoutes";



let cancelTokenOperation;
let cancelTokenDownload;
export const getAllOperatedData = (bodyData) => {
    
    if (typeof cancelTokenOperation != typeof undefined) {
        cancelTokenOperation.cancel("Operation canceled due to new request.")
      }
      //Save the cancel token for the current request
      cancelTokenOperation = axios.CancelToken.source()
     return async function(dispatch){
        let getOperationDataUrl = `${SERVER_URL}${OPERATION.GET_DATA}`
        try{
         
            let res = await axios.post(getOperationDataUrl,bodyData,{ cancelToken: cancelTokenOperation.token });
            res = res.data
            dispatch({
                type: actionTypes.GET_ALL_OPERATED_DATA,
                payload: res 
            })
            return res;
        }catch(err){
            console.log(err)
        }
       
    }
}

export const getAllOperatedDownload = (bodyData) => {
    if (typeof cancelTokenDownload != typeof undefined) {
        cancelTokenDownload.cancel("Operation canceled due to new request.")
      }
    
      //Save the cancel token for the current request
      cancelTokenDownload = axios.CancelToken.source()

    return async function(dispatch){
        let getOperationDownloadUrl = `${SERVER_URL}${OPERATION.DOWNLOAD_DATA }`
        try{
            let res = await axios.post(getOperationDownloadUrl,bodyData,{ cancelToken: cancelTokenDownload.token });
            res = res.data
            dispatch({
                type: actionTypes.GET_ALL_OPERATED_DOWNLOAD,
                payload: res 
            })
            return res;
        }catch(err){
            console.log(err)
        }
       
    }
}
