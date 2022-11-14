import React, { useEffect, useState } from "react";
import axios from "axios";

import "./ReportIssueUi.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReportIssue from "../reportIssue/ReportIssue";

// import Button from "../../../../../components/ui-kit/Button/button";
import Button from "../../../generic/button/Button";

// import edit from "../../.././../../assets/edit.svg";
import { editIcon as edit } from "../../../../theme/assets/svg";
// import CopyAllIssueIcon from "../../../../../assets/summarysection/CopyAllIssueIcon.svg";
import { reportIssue as CopyAllIssueIcon } from "../../../../theme/assets/svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../redux/logger/reportIssue/reportIssueActions";
//import * as callLoggerAction from "../../../../../actions/callLoggerActions";
//import * as loginAction from "../../../../../actions/loginActions";
import * as loginAction from "../../../../redux/onboarding/login/actions/login.actions";
import ReportEditIssue from "../reporteditissue/ReportEditIssue";
//import { CONVERSATION_URL } from "../../../../../services/ApiRoutes";
import { CONVERSATION_URL } from "../../../../services/ApiRoutes";

const ReportIssueUi = (props) => {
  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("Id");
  const accountName = props.userLoginInfo?.userDetail?.accountDetails[0]?.name;
  const [allIssueSlected, setAllIssueSelected] = useState();
  const [title, setTitle] = useState("Report Issue");
  const [isSuccess, setIsSuccess] = useState(false);
  const [summaryDetails, setSummaryDetails] = useState();
  const [isCheckSubmit, setIsCheckSubmit] = useState(true);
  const [isIssueAvailable, setIsIssueAvailable] = useState();
  const [issueUpdateId, setIssueUpdateId] = useState();
  const [show, setShow] = useState(false);
  const [issue, setIssue] = useState(false);
  const [editMode, setEditMode] = useState(false);
  let accountType = props.userLoginInfo?.accountDetails[0]?.type;
  //accountType = accountType?.toString().toLowerCase();

  const noIssueExist = () => {
    let st = true;
    if (
      (props?.botIssueData?.length > 0) |
      (props?.ASRIssueData?.length > 0) |
      (props?.NLUIssueData?.length > 0) |
      (props?.otherIssueData?.length > 0) |
      (props?.customerIssueData?.length > 0)
    ) {
      st = false;
    }
    return st;
  };
  useEffect(() => {
    setSummaryDetails((prev) =>
      props.callSummary ? props.callSummary[0]?.information : ""
    );
    if (props?.callSummary && props.callSummary[0]?.status == "issue")
      setIsSuccess((prev) => true);
    else if (props?.callSummary && props.callSummary[0]?.status == "no issue")
      setIsSuccess((prev) => false);

    setEditMode((prev) => false);
  }, [props.callSummary]);
  useEffect(() => {
    if (!isSuccess) {
      setEditMode((prev) => true);
    }
  }, [isSuccess]);

  const [reportIssueBodyData, setReportIssueBodyData] = useState({
    flow: summaryDetails?.flow_type ? summaryDetails?.flow_type : "-",
    category: summaryDetails?.category,
    userId: summaryDetails?.user_id,
    language: summaryDetails?.language,
    phoneNo: props?.phoneNumber,
    sessionId: props?.sessionId,
    conversationId: props.conversationId,
    accountName: accountName,
  });

  useEffect(() => {
    setReportIssueBodyData((prev) => {
      return {
        ...prev,
        flow: summaryDetails?.flow_type ? summaryDetails?.flow_type : "-",
        category: summaryDetails?.category ? summaryDetails?.category : "-",
        userId: summaryDetails?.user_id,
        language: summaryDetails?.language,
        phoneNo: props?.phoneNumber,
        sessionId: props.sessionId,
        conversationId: props.conversationId,
        accountName: accountName,
      };
    });
    props?.setAllSelectedReportIssueData(null);
  }, [summaryDetails]);

  useEffect(() => {
    async function callApi() {
      if (props.conversationId) {
        props.setBotIssueData(null);
        props.setASRIssueData(null);
        props.setNLUIssueData(null);
        props.setCustomerIssueData(null);
        props.setOthersIssueData(null);
        props.setAllSelectedReportIssueData(null);

        setIsSuccess(false);
        setIsIssueAvailable((prev) => "");
        const fetchedRes = await props.fetchReportIssue(props.conversationId);
        setIsIssueAvailable((prev) => fetchedRes?.data?.length);
        //console.log(fetchedRes?.data[0]?.id)
        setIssueUpdateId((prev) => fetchedRes?.data[0]?.id);
        props.setUpdateIssueId(fetchedRes?.data[0]?.id);
        let tempAllData = props.allSelectedReportIssueData
          ? props.allSelectedReportIssueData
          : [];
        let tempIssue = fetchedRes?.data[0]?.issue;
        props.setMessageIssueData(null);
        tempIssue &&
          Object.keys(tempIssue)?.map((item, i) => {
            let tempVle = tempIssue[item];
            if (item === "BOT") {
              tempAllData = [...tempAllData, ...tempVle];
              props.setBotIssueData(tempVle);
            }
            if (item === "ASR") {
              tempAllData = [...tempAllData, ...tempVle];
              props.setASRIssueData(tempVle);
            }
            if (item === "NLU") {
              tempAllData = [...tempAllData, ...tempVle];
              props.setNLUIssueData(tempVle);
            }
            if (item === "Customer") {
              tempAllData = [...tempAllData, ...tempVle];
              props.setCustomerIssueData(tempVle);
            }
            if (item === "Other") {
              tempAllData = [...tempAllData, ...tempVle];
              props.setOthersIssueData(tempVle);
            }
            if (item === "Feedback") {
              tempAllData = [...tempAllData, ...tempVle];
              props.setMessageIssueData(tempVle);
            }
          });
        props.setAllSelectedReportIssueData(tempAllData);
        console.log(" fetched data nit", tempAllData);
      }
    }
    callApi();
  }, [props.conversationId]);

  useEffect(() => {
    setIssueUpdateId((prev) => props.updateReportIssueId);
  }, [props.updateReportIssueId]);

  useEffect(() => {
    setAllIssueSelected((prev) => props.allSelectedReportIssueData);
  }, [props.allSelectedReportIssueData]);

  const handleSubmitIssue = async () => {
    // console.log("mukesh ambani");
    setIsCheckSubmit((prev) => false);
    const id = toast.loading("Please wait...", {
      toastId: "customIdname",
      className: "badjfdksfffdye",
    });

    // setShow(true);
    let tempIssueArray = {};
    if (props.botIssueData) {
      tempIssueArray["BOT"] = props.botIssueData;
    }
    if (props.ASRIssueData) {
      tempIssueArray["ASR"] = props.ASRIssueData;
    }
    if (props.NLUIssueData) {
      tempIssueArray["NLU"] = props.NLUIssueData;
    }
    if (props.customerIssueData) {
      tempIssueArray["Customer"] = props.customerIssueData;
    }
    if (props.otherIssueData) {
      tempIssueArray["Other"] = props.otherIssueData;
    }
    if (props.reportIssueMessage) {
      tempIssueArray["Feedback"] = [props.reportIssueMessage];
    }

    let bodyData = {
      flow: summaryDetails?.flow_type ? summaryDetails?.flow_type : "-",
      userId: props?.userDetail?._id,
      language: summaryDetails?.language ? summaryDetails.language : "-",
      phoneNo: props.phoneNumber,
      sessionId: props.sessionId,
      conversationId: props.conversationId,
      type: accountType,
      accountName: accountName,
      issue: { ...tempIssueArray },
    };
    console.log("nithin update issue");
    if (isIssueAvailable > 0) {
      let bodyDataUpdate = {
        id: issueUpdateId ? issueUpdateId : props.updateReportIssueId,
        issue: { ...tempIssueArray },
        assignees: {
          add: [],

          rem: [],
        },
      };
      const response = await props.updateReportIssue(bodyDataUpdate);
      console.log(bodyData, response, "update issues from the inside");
    } else {
      bodyData["status"] = "to do";
      console.log("else nithin", bodyData);
      const response = await props.createReportIssue(bodyData);
      console.log(response, "after else nithin");
      let createdId = response?.data[0]?.id;
      setIssueUpdateId((prev) => createdId);
      props.setUpdateIssueId(createdId);
      setIsIssueAvailable((prev) => 1);
      // console.log(bodyData, response, "update issues from the inside");
    }

    //  toast.success("Report Submitted successfully");
    setIsCheckSubmit((prev) => true);
    // do something else
    toast.update(id, {
      render: isIssueAvailable
        ? "Report Edited successfully"
        : "Report Submitted successfully",
      type: "success",
      isLoading: false,
      className: "badjfdksfffdye",
      autoClose: 2000,
    });
    setIsSuccess((prev) => true);

    // if (!props?.isInTranscriptModel) {
    //   let temp = props?.results;
    //   temp.results
    //     .find((each, i) => {
    //       return each.phoneNo === props.phoneNumber;
    //     })
    //     .sessionIds.find((each) => {
    //       return each.id === props?.conversationId;
    //     }).status = "issue";
    //   props.setAllPhoneNumberList(temp);
    // }

    // setTimeout(() => {
    //   props?.setConversationId(props?.conversationId);
    // }, 50);

    await axios.post(
      `https://${process.env.REACT_APP_SERVER_URL2}${CONVERSATION_URL.UPDATE_SUMMARY}`,
      {
        id: props?.callSummary[0]?.id,
        status: "issue",
      }
    );

    props?.setCallSummary(props?.callSummary[0]?.conversationId);
    setEditMode((prev) => false);
  };

  return (
    <>
      <div className="reportIssueUiChSa">
        <div className="reportIssueHeadingSa">
          {!isSuccess ? (
            <>
              <h2 className="headmidx">Report Issue</h2>
              <img
                className=""
                style={{ width: "20px" }}
                src={CopyAllIssueIcon}
                onClick={() => props.settingFeedbackHistoryHideShow(true)}
                alt="CopyIcon"
              />
              {props?.callSummary &&
              !props?.callSummary?.[0]?.status.includes("seen") &&
              !editMode ? (
                <img
                  className="icons"
                  style={{ width: "20px" }}
                  src={edit}
                  onClick={() => {
                    setEditMode((prev) => true);
                    props.setMessageIssueData("");
                  }}
                  alt="EditIcon"
                />
              ) : (
                <div style={{ width: "20px" }}></div>
              )}
            </>
          ) : (
            <>
              <img
                className=""
                style={{ width: "20px" }}
                src={CopyAllIssueIcon}
                onClick={() => props.settingFeedbackHistoryHideShow(true)}
                alt="CopyIcon"
              />
              <h2 className="headmid">Issue Reported</h2>
              <img
                className="icons"
                style={{ width: "20px" }}
                src={edit}
                onClick={() => {
                  setIsSuccess((prev) => !prev);
                  props.setMessageIssueData("");
                }}
                alt="EditIcon"
              />
            </>
          )}
        </div>
        <div className="reportIssueScrollbarDiv">
          {isSuccess ? (
            <ReportEditIssue />
          ) : (
            <ReportIssue
              isInTranscriptModel={props?.isInTranscriptModel}
              editMode={editMode}
            />
          )}
        </div>
        <div className="reportIssueSaveButtonDiv">
          {isSuccess ? null : (
            // <Button
            // text=" Edit "
            // extraClass="submitReportIssueButtonStyle"
            // onClick={() => handleEditIssue()}
            // />
            <Button
              disabled={
                !editMode &&
                !(props?.status && props?.status[0]?.status.includes("seen"))
                  ? typeof props?.reportIssueMessage != "string" ||
                    (typeof props?.reportIssueMessage == "string" &&
                      props?.reportIssueMessage?.length == 0)
                  : (props?.allSelectedReportIssueData?.length > 0 &&
                      isCheckSubmit &&
                      summaryDetails) ||
                    props?.reportIssueMessage
                  ? ""
                  : true
              }
              //text={isIssueAvailable>0 ? 'Edit' : "Submit"}
              text={"Submit"}
              extraClass="submitReportIssueButtonStyle"
              onClick={() => handleSubmitIssue()}
            />
          )}
          {/* {
               show&&<PopUp 
         
         messageicon={greentick} 
         messagetext={isIssueAvailable ? "Report Edited successfully" : "Report Submitted successfully"}
         position={"center"}
         bTransparent={false}
         shouldShow={setShow}
         time={3000}
         /> 
            } */}
        </div>
        {/* <ToastContainer
          position="top-center"
          type='success'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          draggable={false}
          rtl={true}
        /> */}
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    allSelectedReportIssueData:
      state.loggerReducer.reportIssue?.allSelectedReportIssueData,
    botIssueData: state.loggerReducer.reportIssue?.botIssueData,
    conversationId:
      state.loggerReducer.transcriptReducer.currentSession.conversationId,
    customerIssueData: state.loggerReducer.reportIssue?.customerIssueData,
    ASRIssueData: state.loggerReducer.reportIssue?.ASRIssueData,
    NLUIssueData: state.loggerReducer.reportIssue?.NLUIssueData,
    otherIssueData: state.loggerReducer.reportIssue?.otherIssueData,
    callSummary: state.loggerReducer.loggerState?.summaryData,
    userLoginInfo: state.loginReducer?.userLoginInfo,
    reportIssueMessage: state.loggerReducer.reportIssue?.reportIssueMessage,
    updateReportIssueId: state.loggerReducer.reportIssue?.updateReportIssueId,
    createdReportIssue: state.loggerReducer.reportIssue?.createdReportIssue,
    results: state.loggerReducer.transcriptReducer?.allPhoneNumberList,
    phoneNumber: state.loggerReducer.transcriptReducer.currentSession.phoneNo,
    sessionId: state.loggerReducer.transcriptReducer.currentSession.sessionId,
    status: state.loggerReducer.loggerState?.summaryData,
    userDetail: state.loginReducer?.userLoginInfo?.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    //Object.assign({}, reportIssueAction, callLoggerAction, loginAction),
    Object.assign({}, reportIssueAction, loginAction),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportIssueUi);
// export default ReportIssueUi;
