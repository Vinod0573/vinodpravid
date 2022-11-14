import React from "react";
import { phoneBlue } from "../../../theme/assets/svg";

interface props {
  src?: any;
  altText?: string;
  style?: React.CSSProperties;
  extraClass?: string;
}

export default function ImageComponent(props: props) {
  return (
    <>
      <img
        className={props.extraClass ? props.extraClass : ""}
        style={props.style}
        src={props.src || phoneBlue}
        alt={props.altText}
      />
    </>
  );
}
