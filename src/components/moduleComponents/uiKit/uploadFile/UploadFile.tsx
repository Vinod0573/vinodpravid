import React from "react";

import styles from "./UploadFile.module.scss";

interface props {
  default: string;
}

export default function UploadFile(props: any) {
  return <>
  <div className={styles.uploadInputTopdiv}>
    <span className={styles.uploadFileLabel}> Optional </span>
    <div className={styles.uploadFileVisible}>
      <span>
        {/* <label for="upload-file" className="inputUFLable">
          <span className="UPInputPlaceholder"> Upload Photo </span>
        </label> */}
        <input
          id="upload-file"
          className={styles.uploadFileInput}
          type="file"
          placeholder="Upload a text file"
          onChange={(e) => props.onChangeValue(e)}
          accept="image/*"
        />
      </span>
    </div>
  </div>
</>
  ;
}
