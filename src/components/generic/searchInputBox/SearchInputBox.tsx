import React from "react";

import styles from "./SearchInputBox.module.scss";
import PravidIcons from "../icon/PravidIcons";
interface props {
  searchIcon: any;
  onChange: (e: any) => void;
  placeholder: string;
  inputType?: string;
  value?: string | number;
  extraClassWrapper?: string;
  extraClassImg?: string;
  extraClassInput?: string;
}

export default function SearchInputBox(props: props) {
  return (
    <div className={`${styles.searchAreaDivLLP} ${props.extraClassWrapper} `}>
      {/* <img
        src={props.searchIcon}
        alt="search icon"
        className={`${props.extraClassImg}`}
      /> */}
      <PravidIcons activeIcon={"searchIcon"} />
      <input
        type={props.inputType || "text"}
        className={`form-control rounded ${props.extraClassInput}`}
        placeholder={props.placeholder}
        // value={props.value}
        onChange={(e: any) => {
          // console.log("nithin typing", e.target.value);
          props.onChange(e);
        }}
      />
    </div>
  );
}
