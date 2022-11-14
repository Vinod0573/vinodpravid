import axios from "axios";
import React from "react";
import { thumbsUp } from "../../../../../theme/assets/svg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import *  as  callLoggerAction from "../../../../actions/callLoggerActions";
import * as reportIssueAction from "../../../../../redux/logger/reportIssue/reportIssueActions";
// import { CONVERSATION_URL } from "../../../../Utilities/ApiRoutes";

// import { REPORT_ISSUE_URL } from "../../../../Utilities/ApiRoutes";
import {
  CONVERSATION_URL,
  REPORT_ISSUE_URL,
} from "../../../../../services/ApiRoutes";
import { getSummaryByAPI } from "../../../../../redux/logger/loggerState/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
function NoIssue(props) {
  const dispatch = useDispatch();
  const updateStatus = async () => {
    // if(props?.status[0]?.status!="no issue"){
    // toast.success("No Issue Found", {
    console.log("updating no issue status");
    //   className: "badjfdksfffdye",
    // });

    props.setBotIssueData(null);
    props.setASRIssueData(null);
    props.setNLUIssueData(null);
    props.setCustomerIssueData(null);
    props.setOthersIssueData(null);
    props.setMessageIssueData(null);

    // if (!props?.isInTranscriptModel) {
    //   let temp = props?.results;
    //   temp.results
    //     .find((each, i) => {
    //       return each.phoneNo === props.phoneNumber;
    //     })
    //     .sessionIds.find((each) => {
    //       return each.id === props?.conversationId;
    //     }).status = "no issue";
    //   props.setAllPhoneNumberList(temp);
    // }
    console.log("nithin no issue", props.status);
    const resultofSummary = await axios.post(
      `https://${process.env.REACT_APP_SERVER_URL2}${CONVERSATION_URL.UPDATE_SUMMARY}`,
      { id: props?.status[0]?.id, status: "no issue" }
    );
    console.log("mukesh nit", resultofSummary);
    dispatch(getSummaryByAPI(props?.status[0]?.conversationId));
    // update issue only if id is there

    await axios.post(
      `https://${process.env.REACT_APP_SERVER_URL2}${REPORT_ISSUE_URL.UPDATE_ISSUE}`,
      {
        id: resultofSummary.data.data.id,
        issue: {},

        assignees: {
          add: [],

          rem: [],
        },
      }
    );

    //  props.setConversationId(props?.conversationId+"00");
    //  setTimeout(()=>{
    //   props.setConversationId(props?.conversationId);
    //  },50);

    //props.setCallSummary(props?.status[0]?.conversationId);

    // }
  };

  return (
    <div
      className={`noissue-wrapper ${
        props?.conversationId && !props?.full ? "" : "pointeren"
      }`}
      onClick={() => {
        updateStatus();
      }}
    >
      {/* <div className={`noissuebirder ${ props.status &&(props?.status[0]?.status=="no issue")?"clrchange":""}`} > */}
      <div className={`noissuebirder `}>
        {props.status && props?.status[0]?.status == "no issue" && (
          <img src={thumbsUp} alt="Ok" />
        )}
        <span className="spn">No Issues</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    conversationId:
      state.loggerReducer.transcriptReducer.currentSession.conversationId,
    userLoginInfo: state.loginReducer?.userLoginInfo,

    updateReportIssueId: state.loggerReducer.reportIssue?.updateReportIssueId,
    results: state.loggerReducer.transcriptReducer?.allPhoneNumberList,
    phoneNumber: state.loggerReducer.transcriptReducer.currentSession.phoneNo,
    sessionId: state.loggerReducer.transcriptReducer.currentSession.sessionId,
    status: state.loggerReducer.loggerState?.summaryData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    //  Object.assign({}, callLoggerAction, reportIssueAction),
    Object.assign({}, reportIssueAction),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NoIssue);
