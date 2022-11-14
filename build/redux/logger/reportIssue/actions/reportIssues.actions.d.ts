export declare function fetchReportIssueNew(conversationId: string): {
    type: string;
    payload: string;
};
export declare function setEmptyIssue(): {
    type: string;
};
export declare function createReportIssue(bodydata: any): {
    type: string;
    payload: any;
};
export declare function updateReportIssue(data: {
    bodyData: any;
    conversationId: string;
}): {
    type: string;
    payload: {
        bodyData: any;
        conversationId: string;
    };
};
export declare function setNoIssueInSummary(data: {
    summaryId: string;
    conversationId: string;
}): {
    type: string;
    payload: {
        summaryId: string;
        conversationId: string;
    };
};
export declare function updateNoIssue(data: {
    summaryId: string;
    conversationId: string;
    issueId: string;
    assignees: any;
}): {
    type: string;
    payload: {
        summaryId: string;
        conversationId: string;
        issueId: string;
        assignees: any;
    };
};
