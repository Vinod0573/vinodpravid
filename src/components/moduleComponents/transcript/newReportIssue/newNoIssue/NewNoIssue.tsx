import React from "react";
import { whiteThumbSvg } from "../../../../../theme/assets/svg";
import styles from "./NewNoIssue.module.scss";
export default function NewNoIssues() {
  return (
    <div className={styles.wrapper}>
      <div>
        {" "}
        <img src={whiteThumbSvg} alt="thumb" /> No Issues
      </div>
    </div>
  );
}
