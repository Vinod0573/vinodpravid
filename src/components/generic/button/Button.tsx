import React from "react";
import styles from "./Button.module.scss";
import Icon from "../../moduleComponents/uiKit/iconComponent/Icon"

interface props {
  default: string;
}

export default React.forwardRef(function Button(props:any, ref:any) {
  return (
    <button
      className={
        `${styles.basic} ${styles.button_}` +
        (props.button_type ? props.button_type : "") +
        " " +
        (props.extraClass ? props.extraClass : "") +
        " " +
        (props.disabled ? "disabled" : "") +
        " " +
        (props.roundedBtn ? "btn_radius" : "")
      }
      data-toggle={props.dataToggle ? props.dataToggle : ""}
      ref={ref}
      type={props.type ? props.type : "BUTTON"}
      style={props.extraStyle ? props.extraStyle : { width: "130px" }}
      disabled={props.disabled}
      onClick={e => {
        if (props.onClick && !props.disabled) {
          props.onClick(e);
        }
      }}
    >
      <span
        className={
          "btn-text" + (props.buttonTextClass ? props.buttonTextClass : "")
        }
      >
        {props.text ? props.text : ""}
      </span>
      {props.image_src && (
        <Icon
          img_src={props.image_src}
          extraClass={props.imgClass ? props.imgClass : ""}
          extraStyle={{
            cursor: props.disabled ? "not-allowed" : "pointer"
          }}
          disabled={props.disabled}
        />
      )}
      {props.shortLoader ? <span className={`${styles.short_loader} ${styles.ml-2}`}></span> : ""}
    </button>
  );
});
