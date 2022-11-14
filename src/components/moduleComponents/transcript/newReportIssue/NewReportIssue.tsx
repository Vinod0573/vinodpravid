import ReportAllIssues from "./reportAllIssues/ReportAllIssues";
import styles from "./NewReportIssue.module.scss";
import React, { useEffect, useState } from "react";
import NewNoIssues from "./newNoIssue/NewNoIssue";
import NewReportedIssues from "./reportedIssues/NewReportedIssues";
import { useSelector } from "react-redux";
import {
  setEmptyIssue,
  fetchReportIssueNew,
} from "../../../../redux/logger/reportIssue/actions/reportIssues.actions";
import { editIcon } from "../../../../theme/assets/svg";
import { useDispatch } from "react-redux";
import { reportIssue } from "../../../../theme/assets/svg";
import { setRootPortalScreen } from "../../../../redux/baseScreen/baseScreenState/actions";
import portalTypes from "../../../../screens/rootPortal/portalTypes";
export default function NewReportIssue() {
  const summaryData = useSelector(
    (state: any) => state?.loggerReducer?.loggerState?.summaryData[0]
  );
  const reportData = useSelector(
    (state: any) => state?.loggerReducer?.newReportIssueReducer.data
  );

  const [issueStatus, setIssueStatus] = useState<
    "issue" | "noIssue" | "createIssue"
  >("createIssue");
  const [fetchedIssue, setFetchedIssue] = useState<
    { title: string; issueData: string[] }[]
  >([]);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Report Issue");
  //setup issues
  useEffect(() => {
    if (reportData.length > 0) {
      const fetchedData: any = reportData[0];
      const tempData: { title: string; issueData: [] }[] = [];
      if (fetchedData?.issue?.BOT) {
        tempData.push({ title: "BOT", issueData: fetchedData.issue.BOT || [] });
      }
      if (fetchedData?.issue?.ASR) {
        tempData.push({ title: "ASR", issueData: fetchedData.issue.ASR || [] });
      }
      if (fetchedData?.issue?.NLU) {
        tempData.push({ title: "NLU", issueData: fetchedData.issue.NLU || [] });
      }
      if (fetchedData?.issue?.Customer) {
        tempData.push({
          title: "CUSTOMER",
          issueData: fetchedData.issue.Customer || [],
        });
      }
      if (fetchedData?.issue?.Other) {
        tempData.push({
          title: "OTHER",
          issueData: fetchedData.issue.Other || [],
        });
      }
      // if (fetchedData?.issue?.Feedback) {
      // }
      setFetchedIssue(tempData);
    } else {
      setFetchedIssue([]);
    }
  }, [reportData]);

  // setting up issue status
  useEffect(() => {
    if (summaryData) {
      if (summaryData?.status === "issue") {
        setIssueStatus("issue");
        setTitle("Reported Issue");
      } else if (summaryData?.status === "no issue") {
        setIssueStatus("noIssue");
        setTitle("Reported Issue");
        dispatch(setEmptyIssue());
      } else {
        setTitle("Report Issue");
        setIssueStatus("createIssue");
        dispatch(setEmptyIssue());
      }
      setEditMode(false);
    }
    if (summaryData?.conversationId) {
      dispatch(fetchReportIssueNew(summaryData?.conversationId));
    }
  }, [summaryData]);
  function handleShowReportIssueHistory() {
    dispatch(setRootPortalScreen(portalTypes.FEEDBACK_HISTORY_PORTAL));
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {title}{" "}
          <img
            src={reportIssue}
            alt=""
            onClick={handleShowReportIssueHistory}
          />
          {issueStatus !== "createIssue" ? (
            <img
              src={editIcon}
              onClick={() => {
                setEditMode((prev) => !prev);
              }}
            />
          ) : (
            ""
          )}
        </div>
        {(issueStatus === "createIssue" || editMode) && (
          <ReportAllIssues editMode={editMode}></ReportAllIssues>
        )}
        {issueStatus === "noIssue" && !editMode && <NewNoIssues />}
        {issueStatus === "issue" && !editMode && (
          <NewReportedIssues data={fetchedIssue}></NewReportedIssues>
        )}
      </div>
    </>
  );
}
