import React, { useEffect, useState } from "react";
import NewMultiSelectDropdown from "../../../../generic/newMultiSelectDropdown/NewMultiSelectDropdown";
import { props } from "./types";
import allIssues from "../allIssues.data";
import styles from "./ReportAllIssues.module.scss";
import { thumbsUp } from "../../../../../theme/assets/svg";
import {
  createReportIssue,
  updateReportIssue,
} from "../../../../../redux/logger/reportIssue/actions/reportIssues.actions";
import {
  setNoIssueInSummary,
  updateNoIssue,
} from "../../../../../redux/logger/reportIssue/actions/reportIssues.actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import OtherIssue from "../../reportIssue/otherIssue/OtherIssue";
export default function ReportAllIssues(props: props) {
  const [boIssue, setBotIssue] = useState<string[]>([]);
  const [asrIssue, setAsrIssue] = useState<string[]>([]);
  const [nluIssue, setNluIssue] = useState<string[]>([]);
  const [customer, setCustomerIssue] = useState<string[]>([]);
  const [otherIssue, setOtherIssue] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const dispatch = useDispatch();
  const summaryDetails = useSelector(
    (state: any) => state?.loggerReducer?.loggerState?.summaryData[0]
  );

  const currentCLient = useSelector(
    (state: any) => state.allClientReducer.currentSelectedClient[0]
  );
  const reportData = useSelector(
    (state: any) => state?.loggerReducer?.newReportIssueReducer.data
  );
  useEffect(() => {
    if (reportData.length > 0) {
      const issue = reportData[0].issue;
      if (issue.BOT) {
        setBotIssue(issue.BOT);
      } else {
        setBotIssue([]);
      }
      if (issue.ASR) {
        setAsrIssue(issue.ASR);
      } else {
        setAsrIssue([]);
      }
      if (issue.NLU) {
        setNluIssue(issue.NLU);
      } else {
        setNluIssue([]);
      }
      if (issue.Customer) {
        setCustomerIssue(issue.Customer);
      } else {
        setCustomerIssue([]);
      }
      if (issue.Other) {
        setOtherIssue(issue.OtherIssue);
      } else {
        setOtherIssue([]);
      }
      if (issue.Feedback) {
        setText(issue.Feedback);
      } else {
        setText("");
      }
    }
  }, [reportData]);
  function temp(e: any) {
    console.log(e);
  }
  function handleClick() {
    const bodyData: any = {};
    bodyData.issue = {};
    if (boIssue.length > 0) {
      bodyData.issue.BOT = boIssue;
    }
    if (asrIssue.length > 0) {
      bodyData.issue.ASR = asrIssue;
    }
    if (nluIssue.length > 0) {
      bodyData.issue.NLU = nluIssue;
    }
    if (customer.length > 0) {
      bodyData.issue.Customer = customer;
    }
    if (otherIssue.length > 0) {
      bodyData.issue.Other = otherIssue;
    }
    if (text.length > 0) {
      bodyData.issue.Feedback = [text];
    }
    //     flow: summaryDetails?.flow_type ? summaryDetails?.flow_type : "-",
    // userId: props?.userDetail?._id,
    // language: summaryDetails?.language ? summaryDetails.language : "-",
    // phoneNo: summaryDetails?.phone_number?.toString(),
    // sessionId: summaryDetails?.sessionId,
    // conversationId: props.conversationId,
    if (!props.editMode || reportData.length === 0) {
      bodyData.flow = summaryDetails?.information?.flow_type
        ? summaryDetails?.information?.flow_type
        : "-";
      bodyData.language = summaryDetails?.information?.language
        ? summaryDetails.information?.language
        : "-";
      bodyData.sessionId = summaryDetails?.information?.sessionId;
      bodyData.conversationId = summaryDetails.conversationId;
      bodyData.userId = currentCLient.id;
      bodyData.type = currentCLient.type;
      bodyData.accountName = currentCLient.name;
      bodyData.status = "to do";
      const payload = {
        bodyData,
        summaryId: summaryDetails.id,
      };
      dispatch(createReportIssue(payload));
    } else {
      bodyData.id = reportData[0].id;
      bodyData.assignees = {
        add: [],

        rem: [],
      };
      dispatch(
        updateReportIssue({
          bodyData,
          conversationId: summaryDetails.conversationId,
        })
      );
    }
  }
  function handleNoIssue() {
    if (!props.editMode || reportData.length === 0) {
      dispatch(
        setNoIssueInSummary({
          summaryId: summaryDetails?.id,
          conversationId: summaryDetails.conversationId,
        })
      );
    }
    if (props.editMode) {
      //todo
      dispatch(
        updateNoIssue({
          summaryId: summaryDetails?.id,
          conversationId: summaryDetails.conversationId,
          issueId: reportData[0].id,
          assignees: {
            add: [],

            rem: [],
          },
        })
      );
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.eachIssue}>
          {" "}
          <NewMultiSelectDropdown
            title="BOT"
            data={allIssues.BotIssue}
            selected={boIssue}
            handleSubmit={(e) => {
              setBotIssue(e);
            }}
          ></NewMultiSelectDropdown>
        </div>
        <div className={styles.eachIssue}>
          {" "}
          <NewMultiSelectDropdown
            title="ASR"
            data={allIssues.ASRIssue}
            selected={asrIssue}
            handleSubmit={(e) => {
              setAsrIssue(e);
            }}
          ></NewMultiSelectDropdown>
        </div>
        <div className={styles.eachIssue}>
          {" "}
          <NewMultiSelectDropdown
            title="NLU"
            data={allIssues.NLUIssue}
            selected={nluIssue}
            handleSubmit={(e) => {
              setNluIssue(e);
            }}
          ></NewMultiSelectDropdown>
        </div>
        <div className={styles.eachIssue}>
          {" "}
          <NewMultiSelectDropdown
            title="CUSTOMER"
            data={allIssues.CustomerIssue}
            selected={customer}
            handleSubmit={(e) => {
              setCustomerIssue(e);
            }}
          ></NewMultiSelectDropdown>
        </div>
        <div className={styles.eachIssue}>
          {" "}
          <NewMultiSelectDropdown
            title="OTHERS"
            data={allIssues.OtherIssue}
            selected={otherIssue}
            handleSubmit={(e) => {
              setOtherIssue(e);
            }}
          ></NewMultiSelectDropdown>
          <div
            onClick={handleNoIssue}
            className={`${styles.eachIssue} ${styles.noIssue}`}
          >
            {" "}
            <img src={thumbsUp} alt="" /> No issue
          </div>
          <div className={`${styles.eachIssue} ${styles.subjectiveRemark}`}>
            <textarea
              rows={5}
              placeholder={"Subjective Remark"}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div onClick={handleClick} className={styles.button}>
            Submit
          </div>
        </div>
      </div>
    </>
  );
}
