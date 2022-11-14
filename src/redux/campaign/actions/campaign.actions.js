import actionTypes  from "../actionTypes/campaign.actionTypes";
import axios from "axios";
import clearCacheData from "../../../utils/clearCacheData";
import { downloadFromLink } from "../../../utils/downloadCsvFile";


import { SERVER_URL_CONNECTOR, CAMPAIGN_URL,PAYMENT_URL,SERVER_URL2,CALL_REPORT_URL} from "../../../services/ApiRoutes";

// To get all campaign list
let cancelTokenGetAllCampaignList;
export const getAllCampaignList = () => {
    return async function(dispatch){
      if (typeof cancelTokenGetAllCampaignList != typeof undefined) {
        cancelTokenGetAllCampaignList.cancel("Operation canceled due to new request.")
      }

      //Save the cancel token for the current request
      cancelTokenGetAllCampaignList = axios.CancelToken.source()
      const getCampaignListUrl =`${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.ALL_CAMPAIGN_LIST}`;
     try{
      const res =  await axios.get(getCampaignListUrl,{ cancelToken: cancelTokenGetAllCampaignList.token });
      const tempData = res.data.data;
      dispatch({
        type:actionTypes.SET_ALL_CAMPAIGN_LIST,
        payload: tempData,
      });
      return tempData
     }
    catch(e){
          console.log(e);
  }
    }
  }

   // To get the saarthi header list
let cancelTokenGetSaarthiHeaderList;
export const getSaarthiHeaderList = (typeOfUpload,tokenZx) => {
    return async function(dispatch){
      if (typeof cancelTokenGetSaarthiHeaderList != typeof undefined) {
        cancelTokenGetSaarthiHeaderList.cancel("Operation canceled due to new request.")
      }

      //Save the cancel token for the current request
      cancelTokenGetSaarthiHeaderList = axios.CancelToken.source();

     try{
      let getHeaderListUrl;
      let tempData;
      if(typeOfUpload === 'uploadOne'){
         getHeaderListUrl =`${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.SAARTHI_HEADER_FIELD}`;
         const res =  await axios.get(getHeaderListUrl,{ cancelToken: cancelTokenGetSaarthiHeaderList.token ,headers:{"x-access-token":tokenZx}});
        tempData = res.data.data
      }
      else if(typeOfUpload === 'uploadTwo'){
        // alert("jai")
        getHeaderListUrl =`${SERVER_URL_CONNECTOR}${PAYMENT_URL.SAARTHI_HEADER_PAYMENT_FIELD}`;
        const res =  await axios.get(getHeaderListUrl,{ cancelToken: cancelTokenGetSaarthiHeaderList.token,headers:{"x-access-token":tokenZx} });
        tempData = res.data.data
      }
      else if(typeOfUpload === 'uploadThree'){
        getHeaderListUrl =`${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.SAARTHI_HEADER_FIELD}`;
      }


      dispatch({
        type:actionTypes.SAARTHI_HEADER,
        payload: tempData,
      });

      return tempData
     }
    catch(e){
          console.log(e);
  }
    }
  }



  // To get uploaded file info
  let cancelTokenGetFileUploadedList;
  export const getCampaignFileUploadedList = (id,tokenZx,history,accountType) => {
      return async function(dispatch){
        if (typeof cancelTokenGetFileUploadedList != typeof undefined) {
          cancelTokenGetFileUploadedList.cancel("Operation canceled due to new request.")
        }

        //Save the cancel token for the current request
        cancelTokenGetFileUploadedList = axios.CancelToken.source();

       try{
          let getFileUploadedUrl =`${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.GET_UPLOADED_INFO}${id}&userType=${accountType}`;
           const res =  await axios.get(getFileUploadedUrl,{ cancelToken: cancelTokenGetFileUploadedList.token,headers:{"x-access-token":tokenZx} }).catch(err=>{
            if(err.response.status==401){
              history.push("/login");
              clearCacheData();
              window.location.reload();

              }
           });
         let tempData = res.data.data
        dispatch({
          type:actionTypes.SET_FILE_UPLOADED_INFO,
          payload: tempData,
        });
        return tempData
       }
      catch(e){
            console.log(e);
    }
      }
    }

   // To set upload campaign type
 export const setUploadType = (type) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_TYPE_UPLOAD_CLICK,
        payload: type
      });
      return type
  }
  }

  export const setSaarthiHeaderList = (data,payload) =>{
    return function (dispatch){
      dispatch({
        type:data,
        payload: payload
      })
    }
  }

  export const setCsvHeaderList = (data,payload) =>{
    return function (dispatch){
      dispatch({
        type:data,
        payload: payload
      })
    }
  }



  export const setCamapignSelectedData = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_CAMPAIGN_SELECTED_DATA,
        payload: data
      });
      return data
  }
  }



  export const setCreatedCampaignIdName = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_CAMPAIGN_ID_NAME,
        payload: data
      });
      return data
  }
  }
  export const setCreatedCampaignIdNameEdit = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_CAMPAIGN_ID_NAME_EDIT,
        payload: data
      });
      return data
  }
  }

  export const setCampaignEditOrCreateType = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_TYPE_CREATE_EDIT_CAMAPIGN,
        payload: data
      });
      return data
  }
  }

  export const setIsCampaignCreate=(data)=>{
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_TYPE_CREATE_EDIT_CAMAPIGN,
        payload: data
      });
      return data
  }
  }

  export const setSelectedCampaignCredentials= (data)=>{
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_CAMPAIGN_CREDENTIAL,
        payload: data
      });
      return data
  }
  }

  export const setCampaignClientName = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_CLIENT_NAME,
        payload: data
      });
      return data
  }
  }

  export const storedCSVData=(data)=>{

    return async function(dispatch){
      try{
        const URL=CAMPAIGN_URL.CSV_MAPPED_DATA
        const res =  await axios.post( URL, {campaignId:data})
        const tempData = res?.data?.data;
   
        dispatch({
          type: actionTypes.SET_STORE_MAPPED_DATA,
          payload: {mapping:tempData}
        });
        return tempData
      }
      catch(e){
        console.log(e);
      }
    }
  }

  export const storeMappedData= (data)=>{
    return async function(dispatch){
      try{
        const URL=`https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/campaignManagerInfo/v1/addMapping`
        const res =  await axios.post( URL, data)
        const tempData = res?.data?.data;
        dispatch({
          type: actionTypes.SET_CAMPAIGN_CREDENTIAL,
          payload: tempData
        })
        // dispatch({
        //   type: actionTypes.SET_STORE_MAPPED_DATA,
        //   payload: tempData
        // });
        return tempData
      }
      catch(e){
        console.log(e);
      }
    }
  }


  export const setChildTitleData = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_CHILD_DATA,
        payload: data
      });
      return data
  }
  }

  export const setParentTitleData = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_PARENT_DATA,
        payload: data
      });
      return data
  }
  }
  export const setFilteredDateRangeCamapign = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_FILTEREDATE_CAMPAIGN,
        payload: data
      });
      return data
  }
  }

  export const getCSVHeaders=(payload,headers)=>{
    return async function(dispatch){
     try{
      const getCsvHeaderUrl =`${CAMPAIGN_URL.CSV_HEADER}`;
      const res =  await axios.post(getCsvHeaderUrl,payload,headers);
      console.log(res.data)
      const tempData = res.data.data;
      dispatch({
        type:actionTypes.SET_CSV_HEADER_DATA,
        payload: tempData,
      });
      return tempData
     }
    catch(e){
          console.log(e);
  }
  }
}
//all id for Edit
export const setCreatedCampaignAllIdEdit = (data) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_CAMPAIGN_ID_ALL_EDIT,
      payload: data
    });
    return data
}
}
//All channel data
export const setAllCampaignChannelData = (data) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_ALL_CAMPAIGN_CHANNEL_DATA,
      payload: data
    });
    return data
}
}
  //all channel array
  export const setAllChannelArray = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_ALL_CHANNEL_OMNI,
        payload: data
      });
      return data
  }
  }
  //To set update mode

  export const setUpdateModeOmni = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_UPDATE_MODE,
        payload: data
      });
      return data
  }
  }
  export const setParentCampaignListId = (data) => {
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_PARENT_CAMPAIGN_LIST_ID,
        payload: data
      });
      return data
  }
  }
  // export function setMappingDataResponse(data,payload){
  //   return function (dispatch) {
  //     dispatch({
  //       type: data,
  //       payload: payload
  //     })
  //   }
  // }

  export const getUploadedCSV=(accountId,tokenZx,page,limit)=>{
    return  async function (dispatch) {
      try {
        const res =  await axios.get(`https://${process.env.REACT_APP_CONNECTOR}/${CAMPAIGN_URL.GET_UPLOADED_CSV}${accountId}&page=${page}`,{headers:{"Authorization":`JWT ${tokenZx}`}});
        console.log(res)
        dispatch({
          type: actionTypes.SET_UPLOADED_CSV_DATA,
          payload:res.data.data,
        });
        return res;
      } catch (e) {
        console.log(e);
      }
    };
  }

  export const sendApiDetails=(data,tokenZx)=>{
    return  async function (dispatch) {
      try {
        const res =  await axios.post(`https://${process.env.REACT_APP_CONNECTOR}/api/push/v1/use_api_data_for_campaign`,data,{headers:{"Authorization":`JWT ${tokenZx}`}});
        console.log(res)
        return res;
      } catch (e) {
        console.log(e);
      }
    };
  }


  export const isShowConfirm=(data)=>{
    return function (dispatch) {
      dispatch({
        type: actionTypes.SET_IS_SHOW_CONFIRM,
        payload: data
      });
      return data
  }
  }
  export function setCustomerData(data, payload) {
    return function (dispatch) {
      dispatch({
        type: data,
        payload: payload
      })
    }
  }

let cancelTokenCSVDataCampaign;
export const getAllReportCsvPushData = (bodyData,tokenZx ) => {


    if (typeof cancelTokenCSVDataCampaign != typeof undefined) {
        cancelTokenCSVDataCampaign.cancel("Operation canceled due to new request.")
      }
    
      //Save the cancel token for the current request
      cancelTokenCSVDataCampaign = axios.CancelToken.source()

    return async function(dispatch){
        let getReportCsvDataUrl = `https://${process.env.REACT_APP_CONNECTOR}/${CAMPAIGN_URL.PUSHED_API_DATA_CSV_DOWNLOAD}`;
        //let getReportCsvDataUrl = `http://localhost:6003/${CAMPAIGN_URL.PUSHED_API_DATA_CSV_DOWNLOAD}`;
        let accessTokenUrl = `https://${process.env.REACT_APP_CONNECTOR}/api/accounts/v1/o-login`


        try{
          let accountId = bodyData?.accountId
          let client_id
          let client_secret
        if(accountId === '628f6d76d830f6455fa7a632'){
          client_id = "6282b61"
          client_secret = "4ec8830561da4581958d2056da23a14c"
        }
        else if(accountId === '61e90dab9c1de558c3adb420'){
          client_id = "6319f3d"
          client_secret = "6319f3d36e682e15fc4f6d6319f3d29"
          }
          else if(accountId === '628f6cef2554564553aa9824'){
          client_id = "dfdfc4f" 
          client_secret = "6319f3d36e682e15dfdfdfc4f6d6319f3d29"
          }
          else if(accountId === '6357ededbc771e3f0332e62f'){
          client_id = "cidtd"
          client_secret = "csec45454tsfst4434"
          }
          else if(accountId === '6357e19818427181896d1232'){
          client_id = "6319f3dem"
          client_secret = "6319f3d36e682e15fc4fse6319f3d29"
          }

          let accessTokenBody = {
            client_id: client_id,
            client_secret: client_secret
        }
          let resAccessToken = await axios.post(accessTokenUrl,accessTokenBody,{ cancelToken: cancelTokenCSVDataCampaign.token });
          let accessToken = resAccessToken?.data?.data?.data?.access_token

            let res = await axios.post(getReportCsvDataUrl,bodyData,{headers:{"Authorization":`JWT ${accessToken}`}},{ cancelToken: cancelTokenCSVDataCampaign.token });
            let sessionIdOfReport = res?.data?.data?.sessionInfo?.sessionId
            //const successLinkCheckerUrl = `http://localhost:6050/api/conversations/summary/v1/report/status?sessionId=${sessionIdOfReport}`
            const successLinkCheckerUrl = `${SERVER_URL2}${CALL_REPORT_URL.STATUS_CSV_FILE}${sessionIdOfReport}`
            let startIntervalCheckerCampaign
            const stopIntervalChecker = () => {
                clearInterval(startIntervalCheckerCampaign);
            }

            const successLinkChecker = async () => {
                let resOfSuccessLink = await axios.get(successLinkCheckerUrl); 
                if(resOfSuccessLink?.data?.data?.sessionInfo?.status === 'completed'){
                    stopIntervalChecker();
                    downloadFromLink(resOfSuccessLink?.data?.data?.sessionInfo?.link)
                    dispatch({
                        type: actionTypes.PUSHED_API_DATA_CSV_DOWNLOAD,
                        payload: resOfSuccessLink.data.data
                    })
                }      
            }
            startIntervalCheckerCampaign = setInterval(successLinkChecker, 2000);
            //res = res.data
            dispatch({
                type: actionTypes.PUSHED_API_DATA_CSV_DOWNLOAD,
                payload: res.data.data
            })
            return res.data.data;
        }catch(err){
            console.error(err)
        }
        
    }
}