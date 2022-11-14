export declare const setCurrentPage: (currentPage: string) => {
    type: string;
    payload: string;
};
export declare const getSummaryByAPI: (data: string) => {
    type: string;
    payload: string;
};
export declare const getMessages: (data: any) => {
    type: string;
    data: any;
};
export declare const feedbackPostAPI: (data: any, headers: any) => {
    type: string;
    payload: {
        data: any;
        headers: any;
    };
};
export declare const feedbackHistoryPostAPI: (bodyData: any) => {
    type: string;
    payload: any;
};
export declare const setFeedbackHistoryTableData: (tableData: any) => {
    type: string;
    payload: any;
};
export declare const setFeedbackCalender: (calenderData: {
    startDate: Date;
    endDate: Date;
}) => {
    type: string;
    payload: {
        startDate: Date;
        endDate: Date;
    };
};
export declare const reportIssueHistory: (data: any) => {
    type: string;
    payload: any;
};
export declare const portalTranscriptDownloadCSV: (bodyData: any) => {
    type: string;
    payload: any;
};
export declare const feedbackHistoryDownload: (bodyData: any) => {
    type: string;
    payload: any;
};
export declare const reportIssueDownload: (bodyData: any) => {
    type: string;
};
