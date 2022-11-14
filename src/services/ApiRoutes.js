import axios from "axios";

export const DASHBOARD_URL = `https://${process.env.REACT_APP_DASHBOARD_URL}`;
export const AVAIL = "avail";
// export const ACCOUNT_NAME= accountName;
export const FILTER_URL = `https://${process.env.REACT_APP_FILTER_URL}?username=`;
export const ATTEMPT_URL = `https://${process.env.REACT_APP_SERVER_URL2}/api/conversations/dashboard/v1/attempt/count`;

// /api/accounts/user/v1/updateResetPassword
// Old - https://connectors.saarthi.ai/conversation
// New - https://conversationlogger.saarthi.ai/accounts

// Old - https://connectors.saarthi.ai/messages
// New - https://conversationlogger.saarthi.ai/conversations
// export const MANAPPURAM_DASHBOARD_URL="https://calllogger.saarthi.ai/testing"
export const TUNETALK_DASHBOARD_URL = `https://${process.env.REACT_APP_TUNETALK_DASHBOARD_URL}`;
export const LIVE_CHAT_URL = "https://calllogger.saarthi.ai/live";
export const LAST_UPDATED_URL = `https://${process.env.REACT_APP_SERVER_URL2}/api/conversations/summary/v1/latest?accountName=`;

export const SERVER_URL = `https://${process.env.REACT_APP_SERVER_URL}`;
export const SERVER_URL2 = `https://${process.env.REACT_APP_SERVER_URL2}`;
export const SERVER_URL_CONNECTOR = `https://${process.env.REACT_APP_CONNECTOR}`;
export const SERVER_REACT_APP_MAPPING_CSV = `https://${process.env.REACT_APP_MAPPING_CSV}`;
export const PROJECT_URL = "https://chathistory.saarthi.ai";
export const WHATSAPP_ONEWAY_URL =
  "https://streaming.saarthi.ai/api/notification/summary/v1/get";
export const WHATSAPP_ONEWAY_ANALYTICS_URL =
  "https://streaming.saarthi.ai/api/dashboard/v1/kpis";

export const PUSH_CSV_DOWNLOAD =
  "https://streaming.saarthi.ai/api/notification/summary/v1/download";
export const SAARTHIDEMO_PAYMENT_DASHBOARD_URL = `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/paymentDetails/v1/getkpis`;
export const SAARTHIDEMO_CUSTOMER_DASHBOARD_URL = `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerResponseInfo/v1/getkpis`;

//https://conversationlogger.saarthi.ai/accounts/api/accounts/account/v1/all

export const ANALYTICS_URL={
  DOWNLOAD_CSV:"/api/conversations/dashboard/v1/download/kpi"
}

export const ONBOARDING_URL = {
  SIGN_IN: "/api/accounts/v2/login",
  UPDATE_USER_DATA: "/api/accounts/user/v1/update",
  UPDATE_RESET_PASSWORD: "/api/accounts/user/v1/updateResetPassword",
  SIGN_UP: "/api/accounts/user/v1/register",
  All_USERS: "/api/accounts/user/v1/all?",
  SEARCH_USERS: "/api/accounts/user/v1/user?",
  REPROT_BUG: "/api/accounts/reportBug/v1/create",
  REQUEST_FEATURE: "/api/accounts/featureRequest/v1/create",
  ALL_CLIENT_INFO: "/api/accounts/account/v1/all",
  SCHEMA_UPDATE:'/api/accounts/v1/updateSchema'
};

export const EDITING_URL = {
  UPDATE_FEEDBACK: "/api/conversations/feedback/v1/create",
  FEEDBACK_HISTORY: "/api/conversations/feedback/v1/all",
  FEEDBACK_HISTORY_DOWNLOAD_CSV: "/api/conversations/feedback/v1/download",
  FETCH_FEEDBACK_TYPEWISE:
    "/api/conversations/feedback/v1/getFeedbackOnType?type=",
};

export const CONVERSATION_URL = {
  FETCH_PHONE_NO: "/api/conversations/conversation/v1/all?",
  FETCH_SESSION_ID: "/api/conversations/summary/v1/filter/phoneNo/sessionId",
  MESSAGE_URL: "/api/conversations/message/v1/all?",
  SUMMARY_URL: "/api/conversations/summary/v1/all?",
  DOWNLOAD_CSV_TRANSCRIPT: "/api/conversations/summary/v1/downloadTranscript",
  UPDATE_SUMMARY: "/api/conversations/summary/v1/update/",
};

export const CALL_REPORT_URL = {
  FILTER_URL: "/api/conversations/summary/v1/filter",
  // FILTER_CSV_URL:"/api/conversations/summary/v1/filtercsv",
  FILTER_CSV_URL: "/api/conversations/summary/v2/download",
  PHONE_CONVERSATION_LIST_URL: "/api/conversations/summary/v1/conversation",
  STATUS_CSV_FILE:"/api/conversations/summary/v1/report/status?sessionId="
};

export const REPORT_ISSUE_URL = {
  CREATE_ISSUE: "/api/conversations/reportissue/v1/create",
  UPDATE_ISSUE: "/api/conversations/reportissue/v1/update",
  FETCH_ALL_ISSUE: "/api/conversations/reportissue/v1/all",
  FETCH_ISSUE: "/api/conversations/reportissue/v1/issue?conversationId=",
  REPORT_ISSUE_DOWNLOAD_CSV: "/api/conversations/reportissue/v1/download",
  FETCH_ISSUE_TYPEWISE:
    "/api/conversations/reportissue/v1/getIssuesOnType?type=",
};

//https://connectors.saarthi.ai/campaign/api/campaignManagement/customerUploadInfo/v1/getDetails?campaignManagerId=62209959cb448a280183089c

export const CAMPAIGN_URL = {
  CREATE_CAMPAIGN:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/create",
  UPLOAD_CSV_CAMPAIGN:
    "/api/campaignManagement/customerInfo/v2/create",
  UPDATE_CAMPAIGN:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/update",
  ALL_CAMPAIGN_LIST:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/all",
  DELETE_CAMPAIGN:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/delete",
  DOWNLOAD_CAMPAIGN:
    "/campaign/api/campaignManagement/customerUploadInfo/v1/get?campaignManagerId=",
  DOWNLOAD_CAMPAIGN_INFO:
    "/campaign/api/campaignManagement/callingInfo/v1/downloadCallingInfo",
  SAARTHI_HEADER_FIELD:
    "/campaign/api/campaignManagement/customerInfo/v1/fields",
  GET_UPLOADED_INFO:
    "/campaign/api/campaignManagement/customerUploadInfo/v1/getDetails?campaignManagerId=",
  CSV_HEADER: `https://${process.env.REACT_APP_CONNECTOR}/api/tools/v2/fetchCsvData`,
  GET_UPLOADED_CSV: "api/push/v1/list_api_pushed_data_in_buckets?accountId=",
  CSV_MAPPED_DATA: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/campaignManagerInfo/v1/getCampaingMapping`,
  PUSHED_API_DATA_CSV_DOWNLOAD : "api/push/v1/download/list_api_pushed_data_in_buckets"
};

export const PAYMENT_URL = {
  // UPLOAD_CSV_PAYMENT:
  //   "/campaign/api/campaignManagement/paymentDetails/v2/update",
  UPLOAD_CSV_PAYMENT:
    "/campaign/api/campaignManagement/paymentDetails/v2/update",
  SAARTHI_HEADER_PAYMENT_FIELD:
    "/campaign/api/campaignManagement/paymentDetails/v1/fields",
  CREATE_DUNNY_NOTICES:
    "/campaign/api/campaignManagement/dunnyNotice/v1/create",
};

export const RESETLINK_URL = {
  GET_USER_ID: "/api/accounts/user/v1/fetchUserDetails?",
  PASSWORD_RESET_LINK: "/api/accounts/v1/resetPassword",
};

export const CLIENTNAME_URL = `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/account/v1/all`;
export const SAVE_FETCH_RECORDS_URL = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/saveFetchMapping`;
export const SAVE_PUSH_RECORDS_URL = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/salesforce/v1/saveFetchMapping`;
//export const RUN_SAVE_DATA_URL ='http://connectors.saarthi.ai/api/connectors/salesforce/v1/fetchRecords'

export const TABLESALESFORCE_URL = `https://${process.env.REACT_APP_CONNECTOR}/api/connectors/job/v1/job/all`;

export const SALESFORCE_SERVER_URL = `https://${process.env.REACT_APP_CONNECTOR}/api`;
// salesforce Api
export const SALESFORCE_URL = {
  SFOBJECT_URL: "/connectors/salesforce/v1/fetchObjects?",
  SAARTHIOBJECT_URL: "/connectors/v1/fetchObjects?",
  SFOBJECT_FIELD_URL: "/connectors/salesforce/v1/fetchObjectFields?",
  SAARTHIOBJECT_FIELD_URL: "/connectors/v1/fetchObjectFields?",
  SAVE_FETCH_RECORDS_URL: "/connectors/salesforce/v1/saveFetchMapping",
  SAVE_PUSH_RECORDS_URL: "/connectors/salesforce/v1/savePushMapping",
  RUN_SAVE_DATA_URL: "//connectors/salesforce/v1/fetchRecords",
};

//Payment Info API Razorpay
//export const CONNECTOR_PAYMENT_INFO = "https://connectors.saarthi.ai/campaign"
export const CONNECTOR_PAYMENT_INFO = `https://${process.env.REACT_APP_CONNECTOR}/api/tools/v1/razorPay/`;
export const PAYMENT_INFO_URL = {
  FETCH_PAYMENT_INFO:
    "/campaign/api/campaignManagement/paymentDetails/v1/payment/all", //POST API
  SEND_PAYMENT_INFO_EMAIL: "sendEmail", //POST API
  PAYMENT_INFO_STATUS: "fetchStatus?", //GET API
  PAYMENT_INFO_DOWNLOAD:
    "/campaign/api/campaignManagement/paymentDetails/v1/payment/download", //POST API
};

//Api for demo
export const DEMO_SERVER_URL = `https://${process.env.REACT_APP_SERVER_URL}`;
export const DEMO_URL = {
  FETCH_ALL_ROLE: "/api/accounts/role/v1/all", //GET API
  REGISTER_USER: "/api/accounts/user/v1/register", //POST API
  FETCH_POSTEMI: "/api/accounts/flow/v1/filter", //post API
};

export const DEMO_SIGNUP_URL = {
  REQUEST_DEMO: "/api/accounts/requestDemo//v1/create", //POST API
  DEMO_SIGN_UP: "/api/accounts/user/v1/signup", //POST API
};

export const OPERATION = {
  GET_DATA: "/api/accounts/account/v1/operation/get",
  DOWNLOAD_DATA: "/api/accounts/account/v1/operation/download ", //POST
  GET_ALL_CLIENT: "/api/accounts/account/v1/all/distinctAccount", // GET
  SEND_EMAIL: `https://${process.env.REACT_APP_CONNECTOR}/api/tools/v2/sendEmail`, //POST
};
// Api for scheduler
export const SCHEDULER_URL = {
  ARCHIEVE_API:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/archive", // PATCH
  PLAY_PAUSE_API:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/pause", // PATCH
  GET_USECASE_API: "/api/accounts/usecase/v1/all", //GET
  GET_CALLINGLIST_API:
    "/campaign/api/campaignManagement/callingInfo/v1/getCallingList", //GET
  CALLINGLIST_DISABLE_API:
    "/campaign/api/campaignManagement/callingInfo/v1/changeActiveStatus", //POST
  GET_CALLINGLIST_FILTERS: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/callingInfo/v1/getFilters`, //GET
  GET_ALL_PORT: "/api/accounts/account/v1/getById", //GET
  SCHEDULE_CAMPAIGN: process.env.REACT_APP_SCHEDULE, //POST
  CALLING_INFO:
    "/campaign/api/campaignManagement/callingInfo/v1/getAllocationCount", //POST
  GET_CAMPAIGN_DAETAIL:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/getCampaignDetails", //POST
  MAX_CALL_ATTEMPS:
    "/campaign/api/campaignManagement/campaignManagerInfo/v1/callingCount", // POST
};

export const SCHEDULERSECTION = {
  GET_SCHEDULER_DATA: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/callingCondition/v1/all`,
  GET_DIALTIME_DATA: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/dialTimeTemplate/v1/get?accountId=`,
  GET_CAMPAIGN_CONDITION: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/callingCondition/v1/all`,
  GET_DISPOSITION_CONDITION: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/dispositionBasedCallingTemplate/v1/get?accountId=`,
  SAVE_SCHEDULER_DATA: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/saveCampaignDetails/v1/save`,
  GET_ALL_DISPOSITION_DATA_TO_EDIT: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/saveCampaignDetails/v1/get?campaignId=`,
  SUBMIT_DIAL_TIME_DATA: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/saveCampaignDetails/v1/save`,
};

export const OMNICHANNEL = {
  GET_TEMPLATE_DROPDOWN_URL: `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/template/v1/get`,
  GET_SELECTED_TEMPLATE: `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/template/v1/getByIdList`,
  GET_MINDMAP: `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/demoTemplate/v1/filter`,
  HIDE_INITIAL_SCREEN: `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/user/v1/addDemoModule`, //POST ,
};
export const CAMPAIGN_TESTING_URL = {
  GET_CUSTOMERS_DATA: `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/campaignTestingInfo/v1/all?clientName=`,
  SAVE_CUSTOMERS_DATA: `https://${process.env.REACT_APP_SERVER_URL}/api/accounts/campaignTestingInfo/v1/save`,
  EXECUTE_CALL: `https://staging-connectors.saarthi.ai/dialer/api/dialer/epicode/v1/initiateVoiceCall`,
  CAMPAIGNTESTING : `https://staging-connectors.saarthi.ai/dialer/api/dialer/excotel/v1/initiateCall`,
  CAMPAIGNTESTINGWHATAPP : `https://${process.env.REACT_APP_WHATSAPP}/whatsapp/v1/triggerMessage`,
  PUSH_DATA_API:`https://${process.env.REACT_APP_CONNECTOR}/api/push/v1/push_to_system`
}

export const DUMMYAPI = {
  GET_DUMMY_RESPONSE: "https://reqres.in/api/users?page=2",
};

var headers = {
  "Content-Type": "application/json",
};

export const config = {
  POST: (url, params) => {
    return axios.post(url, params, { headers: headers });
  },
  POST_WITH_CANCEL_TOKEN: (url, params, cancelToken) => {
    return axios.post(url, params, { cancelToken: cancelToken.token, headers: headers });
  },
  PUT: (url, params) => {
    return axios.put(url, params);
  },
  GET: (url) => {
    return axios.get(url);
  },
  GET_WITH_HEADER: (url) => {
    return axios.get(url, headers);
  },
  GET_WITH_PARAMS: (url, params) => {
    return axios.get(url, { params: params, headers: headers });
  },
  POST_WITH_HEADER: (url, params, headerParams = headers) => {
    return axios.post(
      url,
      params,
      { headers: headerParams },
      { timeout: 1000 * 60 * 3 }
    );
  },
  at: (url, params, headerParams = headers) => {
    return axios.post(url, null, { params: params }, { headers: headerParams });
  },
  PUT_WITH_HEADER: (url, params) => {
    return axios.put(url, params, { headers: headers });
  },
  DELETE_WITH_HEADER: (url, params) => {
    return axios.delete(url, { data: params, headers: headers });
  },
};
