import actionTypes from "../actionTypes/filter.actionTypes";

import Axios from "axios";


import {FILTER_URL,SERVER_URL,ONBOARDING_URL,SCHEDULER_URL} from '../../../services/ApiRoutes';

let cancelGetFilterTokenRD;
let cancelGetAllClientTokenRD;
let cancelGetAllFilterInDateToken;
// to get all filter
export const getFilterDetails = (username) => {
  const filterUrl = `${FILTER_URL}${username}`

    return async function (dispatch) {
      if (typeof cancelGetFilterTokenRD != typeof undefined) {
        cancelGetFilterTokenRD.cancel("Operation canceled due to new request.")
      }
    
      //Save the cancel token for the current request
      cancelGetFilterTokenRD = Axios.CancelToken.source()
      try {
        const response = await Axios.get(filterUrl,{ cancelToken: cancelGetFilterTokenRD.token }
        );
  
          dispatch({
            type: actionTypes.SET_FILTER_DATA,
            payload: response.data
          });
          return response.data
      } catch (err) {
        console.log(err);
      }
    };
    }

    export const getFilterInDateRange = (username,startDate,endDate) => {
      const filterUrl = `${FILTER_URL}${username}`
    
        return async function (dispatch) {
          if (typeof cancelGetAllFilterInDateToken != typeof undefined) {
            cancelGetAllFilterInDateToken.cancel("Operation canceled due to new request.")
          }
        
          //Save the cancel token for the current request
          cancelGetAllFilterInDateToken = Axios.CancelToken.source()
          try {
            const response = await Axios.get(filterUrl,
              {params: {
                end_date: endDate,
                start_date: startDate,
              }},
              { cancelToken: cancelGetAllFilterInDateToken.token }
            );
      
              dispatch({
                type: actionTypes.SET_FILTER_DATA,
                payload: response.data
              });
              return response.data
          } catch (err) {
            console.log(err);
          }
        };
        }

// To get all client 
export const getClientDetails = () => {
      const allClientUrl = `${SERVER_URL}${ONBOARDING_URL.ALL_CLIENT_INFO}`
        return async function (dispatch) {
          if (typeof cancelGetAllClientTokenRD != typeof undefined) {
            cancelGetAllClientTokenRD.cancel("Operation canceled due to new request.")
          }
        
          //Save the cancel token for the current request
          cancelGetAllClientTokenRD = Axios.CancelToken.source()
          try {
            const response = await Axios.get(allClientUrl,{ cancelToken: cancelGetAllClientTokenRD.token }
            );
      
              dispatch({
                type: actionTypes.GET_ALL_CLIENT,
                payload: response.data.data
              });
              return response.data.data
          } catch (err) {
            console.log(err);
          }
        };
        }


 // To set all selected filter
 export const setAllSelectedFilterData = (selectedData) => {
  return function (dispatch) {  
    dispatch({
      type: actionTypes.SET_ALL_SELECTED_FILTER_DATA,
      payload: selectedData
    });
    return selectedData
} 
}

// To store selected language
  export const setLanguageFilterData = (languageSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_LANGUAGE_FILTER,
        payload: languageSelected
      });
      return languageSelected
  } 
  }


  // To set selected disposition
  export const setDispositionFilterData = (dispositionSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_DISPOSITION_FILTER,
        payload: dispositionSelected
      });
      return dispositionSelected
  } 
  }

  // To set selected status
  export const setStatusFilterData = (statusSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_STATUS_FILTER,
        payload: statusSelected
      });
      return statusSelected
  } 
  }


    // To set selected region
  export const setRegionFilterData = (regionSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_REGION_FILTER,
        payload: regionSelected
      });
      return regionSelected
  } 
  }


 // To set selected Date range
  export const setDateFilterData = (dateSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_DATE_RANGE_FILTER,
        payload: dateSelected
      });
      return dateSelected
  } 
  }


  // To set selected Date range
  export const setCallDurationFilterData = (callDurationSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_CALL_DURATION_FILTER,
        payload: callDurationSelected
      });
      return callDurationSelected
  } 
  }

  
// To set selected Flow Type
    export const setFlowTypeFilterData = (flowTypeSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_FLOW_TYPE_FILTER,
          payload: flowTypeSelected
        });
        return flowTypeSelected
    } 
    }

    // To set selected category Type
    export const setCategoryTypeFilterData = (categoryTypeSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_CATEGORY_TYPE_FILTER,
          payload: categoryTypeSelected
        });
        return categoryTypeSelected
    } 
    }
// To set selected feedback Type
export const setFeedbackTypeFilterData = (feedbackSelected) => {
  return function (dispatch) {  
    dispatch({
      type: actionTypes.SET_FEEDBACK_TYPE_FILTER,
      payload: feedbackSelected
    });
    return feedbackSelected
} 
}

    // To set selected Campaign Type
    export const setCampaignFilterData = (campaignSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_CAMPAIGN_FILTER,
          payload: campaignSelected
        });
        return campaignSelected
    } 
    }
  
      // To set selected Campaign Type
      export const setAttemptFilterData = (attemptSelected) => {
        return function (dispatch) {  
          dispatch({
            type: actionTypes.SET_ATTEMPT_FILTER,
            payload: attemptSelected
          });
          return attemptSelected
      } 
      }

  // To set selected Client Type
  export const setClientFilterData = (clientSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_CLIENT_TYPE_FILTER,
        payload: clientSelected
      });
      return clientSelected
  } 
  }
 

    // To set selected Flow Type
    export const setApplyFilter = (value) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_APPLY_FILTER,
          payload: value
        });
        return value;
    } 
    }

// To check apply click
    export const setApplyFilterTrue = (value) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_APPLY_FILTER_TRUE,
          payload: value
        });
        return value;
    } 
    }

   // To set disable filter list
   export const setDisableFilterList = (value) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_DISABLE_FILTER,
        payload: value
      });
      return value;
  } 
  }


     // To set hide filter list
     export const setHideFilterList = (value) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_HIDE_FILTER,
          payload: value
        });
        return value;
    } 
    }
     // To set selected Month range
  export const setMonthFilterData = (dateSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_MONTH_RANGE_FILTER,
        payload: dateSelected
      });
      return dateSelected
  } 
  }

    export const setEligibilityFilterData = (eligibilitySelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_ELIGIBILITY_FILTER,
          payload: eligibilitySelected
        });
        return eligibilitySelected
    } 
    }

    export const setInterestFilterData = (interestSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_INTEREST_FILTER,
          payload: interestSelected
        });
        return interestSelected
    } 
    }

    export const setEmploymentFilterData = (employmentSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_EMPLOYMENT_FILTER,
          payload: employmentSelected
        });
        return employmentSelected
    } 
    }

    export const setSalaryModeFilterData = (salaryModeSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_SALARY_MODE_FILTER,
          payload: salaryModeSelected
        });
        return salaryModeSelected
    } 
    }

    export const setHaveCCFilterData = (haveCCSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_HAVE_CC_FILTER,
          payload: haveCCSelected
        });
        return haveCCSelected
    } 
    }

    export const setSelectedFlowFilterData = (selectedData) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_SELECTED_FLOW_FILTER_DATA,
          payload: selectedData
        });
        return selectedData
    } 
    }

    export const setCallingListFilter=(data)=>{
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_CALLING_LIST_FILTER,
          payload: data
        });
        return data
    } 
    }

    // To set selected Customer Response
    export const setCustomerResponseFilterData = (customerResponseSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_CUSTOMER_RESPONSE_FILTER,
          payload: customerResponseSelected
        });
        return customerResponseSelected
    } 
    }

    export const setCustomerSentimentFilterData = (customerSentimentSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_CUSTOMER_SENTIMENT_FILTER,
          payload: customerSentimentSelected
        });
        return customerSentimentSelected
    } 
    }

    export const setPaymentModeFilterData = (paymentModeSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_PAYMENT_MODE_FILTER,
          payload: paymentModeSelected
        });
        return paymentModeSelected
    } 
    }

    export const setAgentReferralFilterData = (agentReferralSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_AGENT_REFERRAL_FILTER,
          payload: agentReferralSelected
        });
        return agentReferralSelected
    } 
    }

    export const setPayWillingnessFilterData = (payWillingnessSelected) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_WILLINGNESS_PAY_FILTER,
          payload: payWillingnessSelected
        });
        return payWillingnessSelected
    } 
    }

    //set Product filter--->
  export const setProductFilterData = (productSelected) => {
    return function (dispatch) {  
      dispatch({
        type: actionTypes.SET_PRODUCT_FILTER_DATA,
        payload: productSelected
      });
      return productSelected
  } 
  }

    export const setCampaignIdData = (campaignId) => {
      return function (dispatch) {  
        dispatch({
          type: actionTypes.SET_CAMPAIGN_ID_DATA,
          payload: campaignId
        });
        return campaignId
    } 
    }

    export const getCallingListFilters=(id,tokenZx)=>{
      const URL=`${SCHEDULER_URL.GET_CALLINGLIST_FILTERS}`
      return async function (dispatch) {  
        try {
          const response = await Axios.post(URL,id,{headers:{"x-access-token":tokenZx}})
          dispatch({
            type: actionTypes.SET_CALLING_FILTER_LIST,
            payload: response.data.data
          });
            return response.data.data
        } catch (err) {
            console.log(err);
        }
    } 
    }
