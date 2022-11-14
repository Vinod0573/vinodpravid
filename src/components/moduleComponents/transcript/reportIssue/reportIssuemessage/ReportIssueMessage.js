import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../../redux/logger/reportIssue/reportIssueActions";
import TextAreaInput from "../../../../generic/textareainput/TextAreaInput";
const ReportIssueMessage = (props) => {
  const handleMessage = (issueMessage) => {
    props.setMessageIssueData(issueMessage.trim());
  };
  return (
    <>
      {/* <PopUp 
        // 
        messageicon={greentick} 
        messagetext={"Report Successfully Submitted Successfully Submitted"}
        position={"center"}
        bTransparent={true}
        
        /> */}
      <></>
      <div>
        <TextAreaInput
          extraClass={"placeholderstydslesx"}
          defaultMessage={props?.defaultMessage}
          contSmall={true}
          placeholder="Subjective Remark"
          handleMessage={(message) => handleMessage(message)}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    reportIssueMessage: state.loggerReducer.reportIssue?.reportIssueMessage,
    allSelectedReportIssueData:
      state.loggerReducer.reportIssue?.allSelectedReportIssueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportIssueMessage);
