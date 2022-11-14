import React from "react";
import ASRIssue from "./asrissue/ASRIssue";
import BotIssue from "./botissue/BotIssue";
import CustomerIssue from "./customerissue/CustomerIssue";
import NLUIssue from "./nluissue/NLUIssue";
import OtherIssue from "./otherIssue/OtherIssue";
import NoIssue from "./noIssue/NoIssue";
import "./ReportIssue.css";
import ReportIssueMessage from "./reportIssuemessage/ReportIssueMessage";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as callLoggerAction from "../../../actions/callLoggerActions";
import * as reportIssueAction from "../../../actions/reportIssueActions";
import whitethumb from "../../../assets/whitethumb.svg"
const ReportIssue = (props) => {
  return (
    <>
      {!props.editMode && (
        <div className="reportissWrapper">
          {props.status && props?.status[0]?.status == "no issue"? null : (
            <div>
              <div className="reportissDropdown">
                <BotIssue />
              </div>
              <div className="reportissDropdown">
                <ASRIssue />
              </div>
              <div className="reportissDropdown">
                <NLUIssue />
              </div>
              <div className="reportissDropdown">
                <CustomerIssue />
              </div>
              <div className="reportissDropdown">
                <OtherIssue />
              </div>
              <div className="reportissDropdown">
                <NoIssue isInTranscriptModel={props?.isInTranscriptModel} />
              </div>
            </div>
          )}
           
          {props.status && props?.status[0]?.status == "no issue" ? (
            <div style={{marginBottom:"7px"}} className={`noissue-wrappersdafc `}>
              <div className={`noissuebirder clrchange`}>
                <span className="spn"><img src={whitethumb} alt="GREAT"/>No Issues</span>
              </div>
            </div>
          ) : null}

          <div>
            <ReportIssueMessage/>
          </div>
        </div>
      )}
      {props?.editMode && (
        <div className="reportissWrapper">
          <div className="reportissDropdown">
            <BotIssue />
          </div>
          <div className="reportissDropdown">
            <ASRIssue />
          </div>
          <div className="reportissDropdown">
            <NLUIssue />
          </div>
          <div className="reportissDropdown">
            <CustomerIssue />
          </div>
          <div className="reportissDropdown">
            <OtherIssue />
          </div>
          <div className="reportissDropdown">
            <NoIssue isInTranscriptModel={props?.isInTranscriptModel} />
          </div>
          <div>
            <ReportIssueMessage  defaultMessage={props?.fetchedIssueData?.data[0]?.issue?.Feedback}/>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    conversationId: state.callLoggerReducer.conversationId,
    userLoginInfo: state.loginReducer?.userLoginInfo,
    status: state.callLoggerReducer?.callSummary,
    updateReportIssueId: state.reportIssueReducer?.updateReportIssueId,
    results: state.callLoggerReducer?.allPhoneNumberList,
    phoneNumber: state.callLoggerReducer.phoneNumber,
    reportIssueMessage:state.reportIssueReducer?.reportIssueMessage,
  fetchedIssueData:state.reportIssueReducer?.fetchedIssueData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, callLoggerAction, reportIssueAction),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportIssue);
