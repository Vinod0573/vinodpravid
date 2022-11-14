import React from "react";

import styles from "./Icon.module.scss";

interface props {
  default: string;
}

export default function Icon(props: any) {
  return (
    <img
        src={props.img_src}
        style={props.extraStyle ? props.extraStyle : {}}
        onClick={e => {
            if (props.onClick && !props.disabled) {
                props.onClick(e);
            }
        }}
        className={styles.icon  + (props.disabled ? "disabled " : "") + " " + (props.extraClass ? props.extraClass : "")}
        alt=""
    />
);
}
