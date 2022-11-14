import React from "react";
import styles from "./Description.module.scss";

interface props {
  default: string;
}

export default function Description(props: any) {
  return (
    <>
      <div className={styles.InputTopdiv}>
        <div className={styles.discriptionTextArea}>
          <textarea
            // rows="5"
            placeholder="Description*"
            onChange={(e) => props.onChangeValue(e)}
          />
        </div>
      </div>
    </>
  );
}
