import React from "react";
import styles from "./ErrorMessage.module.scss";
import {errorIcon} from "../../../theme/assets/genericSvg/index";

interface props {
  default: string;
}

export default function ErrorMessage(props: any) {
  return(
    <>
    <div className={`${styles.errorTopDiv} ${props.extraClass ? props.extraClass : ""}`}>
        <img src={errorIcon} alt="Error Icon"/>&nbsp;&nbsp;
        <p>{props.errorMessage}</p>
    </div>
    </>
);
}
