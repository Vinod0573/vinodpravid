import { newReportIssueState } from "../types";
export default function newReportIssueReducer(state: newReportIssueState | undefined, action: any): {
    data: any;
    updateReportIssueId: string;
};
