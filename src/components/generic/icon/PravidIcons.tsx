import React from "react";
import "./Icon.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

export default function PravidIcons(props: any) {
  const iconUrl = useSelector(
    (state: RootState) => state?.loginReducer?.userLoginInfo?.iconsBaseUrl
  );

  return props.donutIcon ? (
    <img
      src={`${iconUrl}${
        props.isInActive ? props.inActiveIcon : props.activeIcon
      }${`.svg#svgView(viewBox(0,0,30,25))`}`}
      style={props.extraStyle ? props.extraStyle : {}}
      onClick={(e) => {
        if (props.onClick && !props.disabled) {
          props.onClick(e);
        }
      }}
      className={
        // "icon " +
        (props.disabled ? "disabled " : "") +
        " " +
        (props.extraClass ? props.extraClass : "")
      }
      alt={
        props.altText
          ? props.altText
          : props.isActive
          ? props.activeIcon
          : props.inActiveIcon
      }
      data-type={props.datatype}
    />
  ) : (
    <img
      // src={`https://saarthistorage.blob.core.windows.net/pravidicons/${
      //   props.isActive ? props.activeIcon : props.inActiveIcon
      // }`}
      // src={`https://saarthistorage.blob.core.windows.net/pravidicons/applyIcon.svg`}
      src={`${iconUrl}${
        props.isInActive ? props.inActiveIcon : props.activeIcon
      }${`.svg`}`}
      style={props.extraStyle ? props.extraStyle : {}}
      onClick={(e) => {
        if (props.onClick && !props.disabled) {
          props.onClick(e);
        }
      }}
      className={
        // "icon " +
        (props.disabled ? "disabled " : "") +
        " " +
        (props.extraClass ? props.extraClass : "")
      }
      alt={props.isActive ? props.activeIcon : props.inActiveIcon}
      data-type={props.datatype}
    />
  );
}
//To Get Active Icon
// <PravidIcons
// activeIcon={"applyIcon"}
// />
//To Get InActive Icon
// <PravidIcons
// activeIcon={"applyIcon"}
// inActiveIcon={"applyIcons"}
// isInActive
// Onclick
// />
