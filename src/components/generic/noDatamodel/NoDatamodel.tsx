import React from "react";

import styles from "./NoDatamodel.module.scss";

interface props {
  srcImg: string;
  message?: string;
  button?: { message: string; onClick?: CallableFunction };
  extraCss?: { img?: string; message?: string; button?: string };
}

export default function NoDatamodel(props: props) {
  // console.log(props.extraCss?.message, "no data");
  return (
    <div className={styles.wrapper}>
      <img
        alt="error"
        src={props.srcImg}
        className={styles.img + " " + props.extraCss?.img}
      ></img>
      {props.message && (
        <h2 className={styles.message + " " + props.extraCss?.message}>
          {props.message}
        </h2>
      )}
      {props.button?.message && (
        <a
          className={styles.a + " " + props.extraCss?.button}
          onClick={(e) => {
            if (props.button && props.button.onClick) {
              props.button.onClick();
            }
          }}
        >
          {props.button.message}
        </a>
      )}
    </div>
  );
}
