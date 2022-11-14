export const DASHBOARD_URL: string;
export const AVAIL: "avail";
export const FILTER_URL: string;
export const ATTEMPT_URL: string;
export const TUNETALK_DASHBOARD_URL: string;
export const LIVE_CHAT_URL: "https://calllogger.saarthi.ai/live";
export const LAST_UPDATED_URL: string;
export const SERVER_URL: string;
export const SERVER_URL2: string;
export const SERVER_URL_CONNECTOR: string;
export const SERVER_REACT_APP_MAPPING_CSV: string;
export const PROJECT_URL: "https://chathistory.saarthi.ai";
export const WHATSAPP_ONEWAY_URL: "https://streaming.saarthi.ai/api/notification/summary/v1/get";
export const WHATSAPP_ONEWAY_ANALYTICS_URL: "https://streaming.saarthi.ai/api/dashboard/v1/kpis";
export const PUSH_CSV_DOWNLOAD: "https://streaming.saarthi.ai/api/notification/summary/v1/download";
export const SAARTHIDEMO_PAYMENT_DASHBOARD_URL: string;
export const SAARTHIDEMO_CUSTOMER_DASHBOARD_URL: string;
export namespace ANALYTICS_URL {
    const DOWNLOAD_CSV: string;
}
export namespace ONBOARDING_URL {
    const SIGN_IN: string;
    const UPDATE_USER_DATA: string;
    const UPDATE_RESET_PASSWORD: string;
    const SIGN_UP: string;
    const All_USERS: string;
    const SEARCH_USERS: string;
    const REPROT_BUG: string;
    const REQUEST_FEATURE: string;
    const ALL_CLIENT_INFO: string;
    const SCHEMA_UPDATE: string;
}
export namespace EDITING_URL {
    const UPDATE_FEEDBACK: string;
    const FEEDBACK_HISTORY: string;
    const FEEDBACK_HISTORY_DOWNLOAD_CSV: string;
    const FETCH_FEEDBACK_TYPEWISE: string;
}
export namespace CONVERSATION_URL {
    const FETCH_PHONE_NO: string;
    const FETCH_SESSION_ID: string;
    const MESSAGE_URL: string;
    const SUMMARY_URL: string;
    const DOWNLOAD_CSV_TRANSCRIPT: string;
    const UPDATE_SUMMARY: string;
}
export namespace CALL_REPORT_URL {
    const FILTER_URL: string;
    const FILTER_CSV_URL: string;
    const PHONE_CONVERSATION_LIST_URL: string;
    const STATUS_CSV_FILE: string;
}
export namespace REPORT_ISSUE_URL {
    const CREATE_ISSUE: string;
    const UPDATE_ISSUE: string;
    const FETCH_ALL_ISSUE: string;
    const FETCH_ISSUE: string;
    const REPORT_ISSUE_DOWNLOAD_CSV: string;
    const FETCH_ISSUE_TYPEWISE: string;
}
export namespace CAMPAIGN_URL {
    const CREATE_CAMPAIGN: string;
    const UPLOAD_CSV_CAMPAIGN: string;
    const UPDATE_CAMPAIGN: string;
    const ALL_CAMPAIGN_LIST: string;
    const DELETE_CAMPAIGN: string;
    const DOWNLOAD_CAMPAIGN: string;
    const DOWNLOAD_CAMPAIGN_INFO: string;
    const SAARTHI_HEADER_FIELD: string;
    const GET_UPLOADED_INFO: string;
    const CSV_HEADER: string;
    const GET_UPLOADED_CSV: string;
    const CSV_MAPPED_DATA: string;
    const PUSHED_API_DATA_CSV_DOWNLOAD: string;
}
export namespace PAYMENT_URL {
    const UPLOAD_CSV_PAYMENT: string;
    const SAARTHI_HEADER_PAYMENT_FIELD: string;
    const CREATE_DUNNY_NOTICES: string;
}
export namespace RESETLINK_URL {
    const GET_USER_ID: string;
    const PASSWORD_RESET_LINK: string;
}
export const CLIENTNAME_URL: string;
export const SAVE_FETCH_RECORDS_URL: string;
export const SAVE_PUSH_RECORDS_URL: string;
export const TABLESALESFORCE_URL: string;
export const SALESFORCE_SERVER_URL: string;
export namespace SALESFORCE_URL {
    const SFOBJECT_URL: string;
    const SAARTHIOBJECT_URL: string;
    const SFOBJECT_FIELD_URL: string;
    const SAARTHIOBJECT_FIELD_URL: string;
    const SAVE_FETCH_RECORDS_URL: string;
    const SAVE_PUSH_RECORDS_URL: string;
    const RUN_SAVE_DATA_URL: string;
}
export const CONNECTOR_PAYMENT_INFO: string;
export namespace PAYMENT_INFO_URL {
    const FETCH_PAYMENT_INFO: string;
    const SEND_PAYMENT_INFO_EMAIL: string;
    const PAYMENT_INFO_STATUS: string;
    const PAYMENT_INFO_DOWNLOAD: string;
}
export const DEMO_SERVER_URL: string;
export namespace DEMO_URL {
    const FETCH_ALL_ROLE: string;
    const REGISTER_USER: string;
    const FETCH_POSTEMI: string;
}
export namespace DEMO_SIGNUP_URL {
    const REQUEST_DEMO: string;
    const DEMO_SIGN_UP: string;
}
export namespace OPERATION {
    const GET_DATA: string;
    const DOWNLOAD_DATA: string;
    const GET_ALL_CLIENT: string;
    const SEND_EMAIL: string;
}
export namespace SCHEDULER_URL {
    const ARCHIEVE_API: string;
    const PLAY_PAUSE_API: string;
    const GET_USECASE_API: string;
    const GET_CALLINGLIST_API: string;
    const CALLINGLIST_DISABLE_API: string;
    const GET_CALLINGLIST_FILTERS: string;
    const GET_ALL_PORT: string;
    const SCHEDULE_CAMPAIGN: string | undefined;
    const CALLING_INFO: string;
    const GET_CAMPAIGN_DAETAIL: string;
    const MAX_CALL_ATTEMPS: string;
}
export namespace SCHEDULERSECTION {
    const GET_SCHEDULER_DATA: string;
    const GET_DIALTIME_DATA: string;
    const GET_CAMPAIGN_CONDITION: string;
    const GET_DISPOSITION_CONDITION: string;
    const SAVE_SCHEDULER_DATA: string;
    const GET_ALL_DISPOSITION_DATA_TO_EDIT: string;
    const SUBMIT_DIAL_TIME_DATA: string;
}
export namespace OMNICHANNEL {
    const GET_TEMPLATE_DROPDOWN_URL: string;
    const GET_SELECTED_TEMPLATE: string;
    const GET_MINDMAP: string;
    const HIDE_INITIAL_SCREEN: string;
}
export namespace CAMPAIGN_TESTING_URL {
    const GET_CUSTOMERS_DATA: string;
    const SAVE_CUSTOMERS_DATA: string;
    const EXECUTE_CALL: string;
    const CAMPAIGNTESTING: string;
    const CAMPAIGNTESTINGWHATAPP: string;
    const PUSH_DATA_API: string;
}
export namespace DUMMYAPI {
    const GET_DUMMY_RESPONSE: string;
}
export namespace config {
    function POST(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
    function POST_WITH_CANCEL_TOKEN(url: any, params: any, cancelToken: any): Promise<import("axios").AxiosResponse<any, any>>;
    function PUT(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
    function GET(url: any): Promise<import("axios").AxiosResponse<any, any>>;
    function GET_WITH_HEADER(url: any): Promise<import("axios").AxiosResponse<any, any>>;
    function GET_WITH_PARAMS(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
    function POST_WITH_HEADER(url: any, params: any, headerParams?: {
        "Content-Type": string;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    function at(url: any, params: any, headerParams?: {
        "Content-Type": string;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    function PUT_WITH_HEADER(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
    function DELETE_WITH_HEADER(url: any, params: any): Promise<import("axios").AxiosResponse<any, any>>;
}
