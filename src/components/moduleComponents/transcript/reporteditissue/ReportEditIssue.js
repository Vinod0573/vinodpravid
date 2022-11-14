import React from "react";
import "./ReportEditIssue.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportIssueAction from "../../../../redux/logger/reportIssue/reportIssueActions";
// import whitethumb from "../../../assets/whitethumb.svg"
import { whiteThumbSvg as whitethumb } from "../../../../theme/assets/svg";
const ReportEditIssue = (props) => {
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
  return (
    <>
      <div className="editIssueWrapper">
        {noIssueExist() && (
          <div className={`noissue-wrappersdafc `}>
            <div className={`noissuebirder clrchange`}>
              <span className="spn">
                <img src={whitethumb} alt="GREAT" />
                No Issues
              </span>
            </div>
          </div>
        )}
        <div className="botIssue">
          {props?.botIssueData && (
            <div>
              <p className="bluetxt">BOT</p>
              {props?.botIssueData.map((item, i) => {
                return <p className="issue">{item}</p>;
              })}
            </div>
          )}
        </div>
        <div className="botIssue">
          {props?.ASRIssueData && (
            <div>
              <p className="bluetxt">ASR</p>
              {props?.ASRIssueData.map((item, i) => {
                return <p className="issue">{item}</p>;
              })}
            </div>
          )}
        </div>
        <div className="botIssue">
          {props?.NLUIssueData && (
            <div>
              <p className="bluetxt">NLU</p>
              {props?.NLUIssueData.map((item, i) => {
                return <p className="issue">{item}</p>;
              })}
            </div>
          )}
        </div>
        <div className="botIssue">
          {props?.customerIssueData && (
            <div>
              <p className="bluetxt">CUSTOMER</p>
              {props?.customerIssueData.map((item, i) => {
                return <p className="issue">{item}</p>;
              })}
            </div>
          )}
        </div>
        <div className="botIssue">
          {props?.otherIssueData && (
            <div>
              <p className="bluetxt">OTHER</p>
              {props?.otherIssueData.map((item, i) => {
                return <p className="issue">{item}</p>;
              })}
            </div>
          )}
        </div>
        <div className="botIssue">
          {props?.reportIssueMessage && (
            <div className="textbox-wrapper">
              <p className="textbox">{props?.reportIssueMessage}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    botIssueData: state.loggerReducer.reportIssue?.botIssueData,
    ASRIssueData: state.loggerReducer.reportIssue?.ASRIssueData,
    NLUIssueData: state.loggerReducer.reportIssue?.NLUIssueData,
    otherIssueData: state.loggerReducer.reportIssue?.otherIssueData,
    customerIssueData: state.loggerReducer.reportIssue?.customerIssueData,
    allSelectedReportIssueData:
      state.loggerReducer.reportIssue?.allSelectedReportIssueData,
    reportIssueMessage: state.loggerReducer.reportIssue?.reportIssueMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, reportIssueAction), dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportEditIssue);
//export default ReportEditIssue;
