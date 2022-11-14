import actionTypes  from "../actionTypes/filter.actionTypes";
import { stateInterface } from "../interface";

const breadcrumReducer = (
  state: stateInterface = {
    filteredDateRangeData: {}
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
      case actionTypes.SET_FILTER_DATA: {
        return {
          ...state,
          filterData: action.payload,
        };
      }
      case actionTypes.GET_ALL_CLIENT: {
        return {
          ...state,
          allClientInfo: action.payload,
        };
      }
      case actionTypes.SET_ALL_SELECTED_FILTER_DATA: {
        return {
          ...state,
          allSelectedFilterData: action.payload,
        };
      }
  
      case actionTypes.SET_SELECTED_FLOW_FILTER_DATA: {
        return {
          ...state,
          flowSelectedFilterData: action.payload,
        };
      }
  
      case actionTypes.SET_LANGUAGE_FILTER: {
        return {
          ...state,
          filteredLanguageData: action.payload,
        };
      }
  
      case actionTypes.SET_DISPOSITION_FILTER: {
        return {
          ...state,
          filteredDispositionData: action.payload,
        };
      }
  
      case actionTypes.SET_CALL_DURATION_FILTER: {
        return {
          ...state,
          filteredCallDurationData: action.payload,
        };
      }
  
      case actionTypes.SET_FLOW_TYPE_FILTER: {
        return {
          ...state,
          filterFlowTypeData: action.payload,
        };
      }
  
      case actionTypes.SET_CATEGORY_TYPE_FILTER: {
        return {
          ...state,
          filterCategoryTypeData: action.payload,
        };
      }
  
      case actionTypes.SET_FEEDBACK_TYPE_FILTER: {
        return {
          ...state,
          filterFeedbackTypeData: action.payload,
        };
      }
  
      case actionTypes.SET_REGION_FILTER: {
        return {
          ...state,
          filteredRegionData: action.payload,
        };
      }
  
      case actionTypes.SET_DATE_RANGE_FILTER: {
        return {
          ...state,
          filteredDateRangeData: action.payload,
        };
      }
  
      case actionTypes.SET_STATUS_FILTER: {
        return {
          ...state,
          filteredStatusData: action.payload,
        };
      }
  
      case actionTypes.SET_CAMPAIGN_FILTER: {
        return {
          ...state,
          filteredCampaignData: action.payload,
        };
      }
  
      case actionTypes.SET_ATTEMPT_FILTER: {
        return {
          ...state,
          filteredAttemptData: action.payload,
        };
      }
  
      case actionTypes.SET_CLIENT_TYPE_FILTER: {
        return {
          ...state,
          filteredClientData: action.payload,
        };
      }
  
      case actionTypes.SET_APPLY_FILTER: {
        return {
          ...state,
          filteredApplyData: action.payload,
        };
      }
  
      case actionTypes.SET_DISABLE_FILTER: {
        return {
          ...state,
          disableFilterList: action.payload,
        };
      }
  
      case actionTypes.SET_APPLY_FILTER_TRUE: {
        return {
          ...state,
          checkFilteredApplyData: action.payload,
        };
      }
  
      case actionTypes.SET_HIDE_FILTER: {
        return {
          ...state,
          hideFilterList: action.payload,
        };
      }
    
      //MONTH FILTER REDUCER
      case actionTypes.SET_MONTH_RANGE_FILTER: {
        return {
          ...state,
          filteredMonthRangeData: action.payload,
        }
      }
  
      case actionTypes.SET_ELIGIBILITY_FILTER: {
        return {
          ...state,
          filteredEligibility: action.payload,
        };
      }
   
      case actionTypes.SET_INTEREST_FILTER: {
        return {
          ...state,
          filteredInterest: action.payload,
        };
      }
  
      case actionTypes.SET_EMPLOYMENT_FILTER: {
        return {
          ...state,
          filteredEmployment: action.payload,
        };
      }
  
      case actionTypes.SET_SALARY_MODE_FILTER: {
        return {
          ...state,
          filteredSalaryMode: action.payload,
        };
      }
  
      case actionTypes.SET_HAVE_CC_FILTER: {
        return {
          ...state,
          filteredHaveCC: action.payload,
        };
      }
  
      case actionTypes.SET_CUSTOMER_RESPONSE_FILTER:{
        return {
          ...state,
          filteredCustomerResponse: action.payload
        }
      }
  
      case actionTypes.SET_CALLING_LIST_FILTER:{
        return {
          ...state,
          filterByCallingListData: action.payload
        }
      }
      case actionTypes.SET_CALLING_FILTER_LIST:{
        return {
          ...state,
          callingFilterList: action.payload
        }
      }
  
      case actionTypes.SET_CUSTOMER_SENTIMENT_FILTER:{
        return {
          ...state,
          filteredCustomerSentiment: action.payload
        }
      }
  
      case actionTypes.SET_PAYMENT_MODE_FILTER:{
        return {
          ...state,
          filteredpaymentMode: action.payload
        }
      }
  
      case actionTypes.SET_AGENT_REFERRAL_FILTER:{
        return {
          ...state,
          filteredagentReferral: action.payload
        }
      }
  
      case actionTypes.SET_WILLINGNESS_PAY_FILTER:{
        return {
          ...state,
          filteredWillingnessPay: action.payload
        }
      }
      case actionTypes.SET_PRODUCT_FILTER_DATA:{
        return {
          ...state,
          filteredProduct:action.payload
        }
      }
  
      case actionTypes.SET_CAMPAIGN_ID_DATA: {
        return {
          ...state,
          campaignIdFilteredData: action.payload,
        };
      }
  
      default:
        return {
          ...state,
        };
    }
  }


export default breadcrumReducer;
