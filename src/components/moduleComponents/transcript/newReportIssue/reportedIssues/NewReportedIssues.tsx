import React from "react";
import styles from "./NewReportedIssues.module.scss";
import { props } from "./types";

export default function NewReportedIssues(props: props) {
  return (
    <div className={styles.wrapper}>
      {props.data.map((eachIssue, index) => {
        return (
          <div key={index} className={styles.eachIssue}>
            <div className={styles.title}>{eachIssue.title}</div>
            {eachIssue.issueData.map((individualIssues, index1) => {
              return (
                <div key={index1} className={styles.list}>
                  {" "}
                  {individualIssues}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
