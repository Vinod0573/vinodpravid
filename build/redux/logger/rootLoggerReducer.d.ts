declare const rootLoggerReducer: import("redux").Reducer<import("redux").CombinedState<{
    loggerState: import("./loggerState/interface").stateInterface;
    transcriptReducer: import("./transcript/transcript").transcriptInterface;
    report: import("./report/interface").stateInterface;
    reportIssue: {};
    newReportIssueReducer: {
        data: any;
        updateReportIssueId: string;
    };
}>, any>;
export default rootLoggerReducer;
