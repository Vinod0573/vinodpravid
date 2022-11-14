import React from "react";

import styles from "./TitleComponent.module.scss";

interface props {
  default: string;
}

export default function TitleComponent(props: any) {
  return (
    <>
      <div className={styles.titleInputTopdiv}>
        <div className={styles.titleInputDiv}>
          <input
            type="text"
            placeholder="Title*"
            onChange={(e) => props.onChangeValue(e)}
          />
        </div>
      </div>
    </>
  );
}
