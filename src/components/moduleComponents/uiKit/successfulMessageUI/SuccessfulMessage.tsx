import React from "react";

import styles from "../../reportRequest/ReportRequest.module.scss";
import {successfulMessageIcon} from "../../../../theme/assets/headerSvg";
import {crossIcon} from "../../../../theme/assets/genericSvg";

interface props {
  default: string;
}

export default function SuccessfulMessage(props: any) {

    const handleSubmitAgain = () =>{
        props.handleSubmitAgain(false);
      }

  return (
    <>
      <div className={styles.reportRequestTopDiv}>
        <div>
          <div className={styles.RRClosingDiv}>
            {" "}
            <img
              src={crossIcon}
              alt="cross icon"
              onClick={() => props.toCloseRRModel()}
            />
          </div>
          <div className={styles.RRHeadingDiv}>
            {" "}
            <h2> {props.propsOption[2]} </h2>
          </div>
          <div className={styles.RRAllInputTop}>
            <div className={`${styles.RRInput} ${styles.RRSuccessful}`}>
              <div>
                <img src={successfulMessageIcon} alt="successful icon" />
              </div>
              <div className={styles.successfulMessage}>
                <h4> {props.propsOption[3]} </h4>
              </div>
              <div className={styles.RRSaveButtonDiv}>
                <button
                  className={styles.RRSaveButton}
                  style={{ background: "#7B42FF" }}
                  onClick={() => handleSubmitAgain()}
                >
                  {" "}
                  {props.propsOption[4]}{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
