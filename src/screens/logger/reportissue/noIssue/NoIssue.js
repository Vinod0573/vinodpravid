import axios from "axios";
import React from "react";
import thumbsUp from "../../../../assets/thumbsUp.svg";
import "./NoIssue.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *  as  callLoggerAction from "../../../../actions/callLoggerActions";
import * as reportIssueAction from "../../../../actions/reportIssueActions"
import { CONVERSATION_URL } from "../../../../Utilities/ApiRoutes";
import {REPORT_ISSUE_URL} from "../../../../Utilities/ApiRoutes"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function NoIssue(props) {
 
  const updateStatus= async (e)=>{
    // if(props?.status[0]?.status!="no issue"){
    toast.success("No Issue Found",{
      className:"badjfdksfffdye"
    });

    props.setBotIssueData(null);
    props.setASRIssueData(null);
    props.setNLUIssueData(null);
    props.setCustomerIssueData(null);
    props.setOthersIssueData(null);
    props.setMessageIssueData(null);

    if(!props?.isInTranscriptModel){
    let temp=props?.results;
    temp.results.find((each,i)=>{return each.phoneNo===props.phoneNumber})
    .sessionIds.find((each)=>{return each.id===props?.conversationId}).status="no issue"
    props.setAllPhoneNumberList(temp);}

    await axios.post(`https://${process.env.REACT_APP_SERVER_URL2}${CONVERSATION_URL.UPDATE_SUMMARY}`,
    {id:props?.status[0]?.id,
    status:"no issue"})
 
  

   axios.post(`https://${process.env.REACT_APP_SERVER_URL2}${REPORT_ISSUE_URL.UPDATE_ISSUE}`,
   {
    id:props?.updateReportIssueId,
    issue:{},
   
   assignees: {

    add: [],
    
    rem: []
    
    }
   })




//  props.setConversationId(props?.conversationId+"00");
//  setTimeout(()=>{
//   props.setConversationId(props?.conversationId);
//  },50);

 props.setCallSummary(props?.status[0]?.conversationId);

  // }
 

  }


  return (
    <div className={`noissue-wrapper ${props?.conversationId &&!props?.full?"":"pointeren"}`}  onClick={updateStatus}>
      {/* <div className={`noissuebirder ${ props.status &&(props?.status[0]?.status=="no issue")?"clrchange":""}`} > */}
      <div className={`noissuebirder `} >
        { props.status &&(props?.status[0]?.status=="no issue")&&<img src={thumbsUp} alt="Ok" />}
        <span className="spn">No Issues</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return{
    conversationId: state.callLoggerReducer.conversationId,
    userLoginInfo: state.loginReducer?.userLoginInfo,
    status:state.callLoggerReducer?.callSummary,
    updateReportIssueId: state.reportIssueReducer?.updateReportIssueId,
    results:state.callLoggerReducer?.allPhoneNumberList,
    phoneNumber: state.callLoggerReducer.phoneNumber,
    
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    Object.assign({}, callLoggerAction,reportIssueAction),
    dispatch
);
}

export default connect(mapStateToProps,mapDispatchToProps)(NoIssue);