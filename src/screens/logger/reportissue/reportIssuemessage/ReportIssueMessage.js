import React from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../actions/reportIssueActions";
import TextAreaInput from '../../../widlyuse/textareainput/TextAreaInput';
const ReportIssueMessage = (props) => {
    const handleMessage = (issueMessage) => {

        props.setMessageIssueData(issueMessage.trim());
      
    }
    return(
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
            <TextAreaInput  extraClass={"placeholderstydslesx"} defaultMessage={props?.defaultMessage} contSmall={true} placeholder="Subjective Remark" handleMessage={(message) =>handleMessage(message)}/>
        </div>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
      reportIssueMessage: state.reportIssueReducer.reportIssueMessage,
      allSelectedReportIssueData: state.reportIssueReducer.allSelectedReportIssueData,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReportIssueMessage);