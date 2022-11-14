import React from "react";
import styles from "./DatePicker.module.scss";
import PopupCalenderfilter from "../../../moduleComponents/popupCalenderfilter/PopupCalenderfilter";
// import { blueCalender } from "../../../../theme/assets/svg/rightSideIcon";
import { firstLetterCapital } from "../../../../utils/stringmodifycase";
import PravidIcons from "../../icon/PravidIcons";
import { blueCalender } from "../../../../theme/assets/svg/rightSideIcon";
export default function DatePicker(props: any) {
  return (
    <>
      <div className={styles.titleofilter}>
        {/* <img src={blueCalender} alt="" /> */}
        <PravidIcons activeIcon={"blueCalender"} />
        <p className={styles.titletext}>
          {firstLetterCapital(props.selectedIcon)}
        </p>
      </div>
      <div className={styles.divide}></div>
      <div style={{ margin: "auto" }}>
        <PopupCalenderfilter setSelectedIcon={props.setSelectedIcon} />
      </div>
      <div className={styles.divide}></div>
    </>
  );
}
