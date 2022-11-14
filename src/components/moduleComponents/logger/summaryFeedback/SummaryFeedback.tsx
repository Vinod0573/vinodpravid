import React from "react";
import { useSelector } from "react-redux";
import Summary from "./summary/Summary";
import FeedbackHistory from "./feedbackHistory/FeedbackHistory";
import ReportIssueUi from "../../transcript/reportissueui/ReportIssueUi";
import NewReportIssue from "../../transcript/newReportIssue/NewReportIssue";
interface props {
  summary: any;
}

export default function SummaryFeedback(props: props) {
  const userRole: any = useSelector((state: any) => {
    return state.loginReducer.userLoginInfo.userDetail.role;
  });
  return (
    <div className="wrapper__summaryFeedback">
      <div className="summary__div">
        <Summary summary={props.summary} />
      </div>
      <div className="feedback-history__div">
        {userRole.toString().toLowerCase() === "campaign analyst" ? (
          // <ReportIssueUi />
          <NewReportIssue />
        ) : (
          <FeedbackHistory summary={props.summary} />
        )}
      </div>
    </div>
  );
}
