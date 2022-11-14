import React from "react";
import styles from "./RadioButton.module.scss";

interface props {
  default: string;
}

export default function RadioButton(props: any) {
  return <>
  <div className={styles.RadioButton}>
    <input
        id={props.id}
        onChange={props.changed}
        value={props.value}
        type="radio"
        checked={props.isSelected}
      />
      <label className={styles.LabelDiv} htmlFor={props.id}>{props.label}</label>
    </div>
  </>;
}
