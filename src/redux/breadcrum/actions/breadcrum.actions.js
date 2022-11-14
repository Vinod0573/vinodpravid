import actionTypes  from "../actionTypes/breadcrum.actionTypes";
import { SCHEDULERSECTION } from "../../../services/ApiRoutes";
import schedulerActionType from "../../campaign/scheduler/actionTypes/scheduler.actionTypes"
import omniChannelActionTypes from "../../omniChannel/actionTypes/omniChannel.actionTypes";
import axios from "axios";

export function setSelectedTab(payload) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_TAB,
      payload: payload
    })
  }
}
export const tabSelected = (data) => {
  return async function (dispatch) {
    dispatch({
      type: "SET_TAB",
      payload: data,
    });
  };
};
export const storeSelectedBreadcrum = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_BREADCRUM,
      payload: data,
    });
  };
};

export const setSchedulerPhase = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_PHASE,
      payload: data,
    });
  };
};

export const storeBreadCrumData = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_BREADCRUM_DATA,
      payload: data,
    });
  };
};


export const getDialTimeData = (accId, useCaseId, tokenZx) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        SCHEDULERSECTION.GET_DIALTIME_DATA + accId + `&useCaseId=${useCaseId}`,
        { headers: { "x-access-token": tokenZx } }
      );
      const tempData = res.data.data;
      dispatch({
        type: actionTypes.SET_DIAL_DATA,
        payload: tempData,
      });
      return tempData;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCallingCondition = (tokenZx) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(SCHEDULERSECTION.GET_CAMPAIGN_CONDITION, {
        headers: { "x-access-token": tokenZx },
      });
      const tempData = res?.data?.data;
    
      dispatch({
        type: actionTypes.SET_CALLING_DATA,
        payload: tempData?.[0],
      });
      return tempData;
    } catch (e) {
      console.log(e);
    }
  };
};

export const setCallingCondition = (data) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_CALLING_DATA,
      payload: data,
    });
  };
};

export const getDBCCondition = (accId, useCaseId, tokenZx ,selectNavChannel) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        SCHEDULERSECTION.GET_DISPOSITION_CONDITION +
          accId +
          `&useCaseId=${useCaseId}`,
        { headers: { "x-access-token": tokenZx } }
      );
      const tempData = res.data.data;
      let newtemp
     
      selectNavChannel = selectNavChannel === "WhatsApp" ? "Whatsapp" : selectNavChannel
      if(selectNavChannel){
         newtemp = tempData?.filter(e => {
        if(e?.channel === selectNavChannel){
       
           return e
        }
      })
      newtemp = [...newtemp]
      }
      else{
        newtemp = tempData
      }
      if(newtemp?.length == 0){
        newtemp = tempData
      }
       
   
      tempData["template"] = newtemp?.[0]?.template?.map((er) => {
        return { ...er, retryHrTime: 2, retryMinTime: 0 };
      });
      dispatch({
        type: actionTypes.SET_DISPOSITION_DATA,
        payload: tempData,
      });
      return tempData;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getSchedulerData = (data) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        SCHEDULERSECTION.GET_ALL_DISPOSITION_DATA_TO_EDIT + `${data}`
      );
      dispatch({
        type: schedulerActionType.SET_DIALTIME,
        payload: {
          dialTimeData: res?.data?.data?.dialTimeData?.data,
          preferedTime: res?.data?.data?.preferredTime,
        },
      });
      // dispatch({
      //   type:actionTypes.SET_SELECTED_DISPOSITION_DATA,
      //   payload: data
      // })
      // dispatch({
      //   type: actionTypes.SET_CALLING_DATA,
      //   payload: tempData[0],
      // });
      // dispatch({
      //   type: actionTypes.SET_DISPOSITION_DATA,
      //   payload: tempData,
      // });
      return res;
    } catch (e) {
      console.log(e);
    }
  };
};

export const shuffledCallingCondition = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SHUFFLED_DATA,
      payload: data,
    });
  };
};

export const shuffledDispositionCondition = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SHUFFLED_DISPOSITION_DATA,
      payload: data,
    });
  };
};

export const shuffledConnectedDispositionCondition = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SHUFFLED_CONNECTED_DISPOSITION_DATA,
      payload: data,
    });
  };
};
export const shuffledConnectedSucceding = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SHUFFLED_CONNECTED_SUCCEDING_DATA,
      payload: data,
    });
  };
};
export const shuffledNotConnectedSucceding = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SHUFFLED_NOTCONNECTED_SUCCEDING_DATA,
      payload: data,
    });
  };
};

export const setSelectedDispositionData = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_DISPOSITION_DATA,
      payload: data,
    });
  };
};
export const setSelectedDispositionDataParent = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_DISPOSITION_DATA_PARENT,
      payload: data,
    });
  };
};
export const setSelectedDispositionDataChild = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_DISPOSITION_DATA_CHILD,
      payload: data,
    });
  };
};
// export const setSelectedSuccedingDispositionData=(data)=>{
//   return async function(dispatch){
//     dispatch({
//       type:actionTypes.SET_SELECTED_DISPOSITION_DATA,
//       payload: data
//     })
//   }
// }

export const selectedDataRetryTime = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_DATA_RETRY_TIME,
      payload: data,
    });
  };
};

export const storeSeparateSelectedData = (data) => {
  console.log(data);
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SEPARATE_SELECTED_DATA,
      payload: data,
    });
  };
};

export const storeAPICSVList = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_API_CSV_LIST,
      payload: data,
    });
  };
};

export const setSelectedCallingData = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SELECTED_CALLING_DATA,
      payload: data,
    });
  };
};

export const setDCBData = (data) => {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_DISPOSITION_DATA,
      payload: data,
    });
  };
};

export const updateData = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_UPDATE_DATA,
      payload: data,
    });
  };
};

export const goToCallingList = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SHOW_CALLING_LIST,
      payload: data,
    });
  };
};

export const setCallingDay = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_CALLING_DAY,
      payload: data,
    });
  };
};

export const setEmiValue = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_EMI_VALUE,
      payload: data,
    });
  };
};

export const setSameDayBtn = (data) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.SET_SAME_BTN,
      payload: data,
    });
  };
};

export const sendWhatsappDetails = (tokenZx, payload) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(
        SCHEDULERSECTION.SUBMIT_DIAL_TIME_DATA,
        payload,
        { headers: { "x-access-token": tokenZx } }
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const storeWhatsappData = (tempData) => {

  let Obj = {
    communication: tempData?.dialTimeData?.data?.communication,
    template: tempData?.dialTimeData?.data?.templateName,
    startDate: tempData?.dialTimeData?.data?.schedule_date_start,
    endDate: tempData?.dialTimeData?.data?.schedule_date_end,
    templatesId: tempData?.dialTimeData?.data?.templates,
    time: {
      hasdata: true,
      am:
        Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60) > 12
          ? false
          : true,
      hour:
        Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60) > 12
          ? (
              Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60) - 12
            ).toString().length > 1
            ? (
                Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60) - 12
              ).toString()
            : "0" +
              (
                Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60) - 12
              ).toString()
          : Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60).toString()
              .length > 1
          ? Math.floor(tempData?.dialTimeData?.data?.schedule_time / 60).toString()
          : "0" +
            Math.floor(
              tempData?.dialTimeData?.data.schedule_time / 60
            ).toString(),
      minute:
        (tempData?.dialTimeData?.data?.schedule_time % 60).toString()?.length < 2
          ? `0${(tempData?.dialTimeData?.data?.schedule_time % 60).toString()}`
          : (tempData?.dialTimeData?.data?.schedule_time % 60)?.toString(),
      // -((tempData.dialTimeData.data.schedule_time/ 60) *60).toString()
    },
  };

  //dbc whatsApp
  let dbcInterval = tempData?.dispositionData?.data?.followUpAttributes?.followupInterval
  let numberOffollowup = tempData?.dispositionData?.data?.followUpAttributes?.noOfFollowups
   let succeeding_connected = tempData?.dispositionData?.data?.succeeding_connected
   let succeeding_not_connected = tempData?.dispositionData?.data?.succeeding_not_connected

   let succConnectedResKey = succeeding_connected?.map( e=> e?.respKey)
   let succNonConnectedResKey = succeeding_not_connected?.map(e => e?.respKey)
   let allRespKey = [...succConnectedResKey , ...succNonConnectedResKey]
   let separeted = {
    succeeding_connected: succConnectedResKey,
    succeeding_not_connected: succNonConnectedResKey,
  }
   let newFollowUp = Object.values(dbcInterval)
   let newFollowArray =[]
    newFollowUp?.map(
      each => {
        let obj = {}
        obj["retryHrTime"] = Math.floor(each/60)
        obj["retryMinTime"] = each %60
        newFollowArray.push(obj)
      }
   )

  return async function (dispatch) {
    dispatch({
      type: omniChannelActionTypes.SET_SCHEDULERSETTING_WHATSAPP,
      payload: Obj,
    });
    dispatch({
      type: omniChannelActionTypes.SET_NUMBER_OF_FOLLOWUP,
      payload: numberOffollowup,
    });
    dispatch({
      type: omniChannelActionTypes.SET_SELECTED_DISPOSITION_DATAWP,
      payload: allRespKey,
    });
    dispatch({
      type: omniChannelActionTypes.SET_SELECTED_DISPOSITION_DATA_CHILDWP,
      payload: allRespKey,
    });
    dispatch({
      type: omniChannelActionTypes.SET_SEPARATE_SELECTED_DATAWP,
      payload: separeted,
    });
    dispatch({
      type: omniChannelActionTypes.SET_SHUFFLED_CONNECTED_SUCCEDING_DATAWP,
      payload: succeeding_connected,
    });
    dispatch({
      type: omniChannelActionTypes.SET_SHUFFLED_NOTCONNECTED_SUCCEDING_DATAWP,
      payload: succeeding_not_connected ,
    });
  };
};
