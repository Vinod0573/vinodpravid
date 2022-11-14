import React from "react";

import styles from "./ChartDownloadComponent.module.scss";

interface props {
  default: string;
}

export default function ChartDownloadComponent(props: any) {
  return (
    <>
      <div className={styles.chartDownloadTopDiv}>
        <button onClick={props.onClickScreenshot} className={styles.downloadData}>
          Download View
        </button>

        <button className={styles.downloadData}
        onClick={props.onClickCsvData}>
          Download Data
        </button>
      </div>
    </>
  );
}
