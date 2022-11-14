import React, { useEffect, useRef, useState } from "react";

import styles from "./RightSidebarpop.module.scss";
// import {
//   arrow,
//   blueFilter,
//   blueCalender,
// } from "../../../theme/assets/svg/rightSideIcon";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux";

import DatePicker from "./../../generic/rightSidebar/dataPicker/DatePicker";
import DropdownFilter from "../rightSidebar/dropdownFilter/DropdownFilter";
import DownloadSection from "../rightSidebar/downloadSection/DownloadSection";
import PravidIcons from "../icon/PravidIcons";
interface props {
  selectedIcon: string | null;
  // show: boolean;
  // setShow: Dispatch<SetStateAction<boolean>>;
}

import {
  getAllFiltersOptionsForAccount,
  setSelectedFilterType,
  setShowRightSideBar,
} from "../../../redux/filters/actions";
import KPIWrapper from "../kpiWrapper/KPIWapper";
import { useCurrentPageTab } from "../../../hooks";

const RightSidebarpop = React.forwardRef((props: any, ref: any) => {
  const dispatch = useDispatch();
  const refP = useRef<any>(null);
  const accountName = useSelector(
    (store: any) =>
      store.loginReducer?.userLoginInfo?.userDetail.accountDetails[0].name
  );
  const show = useSelector(
    (state: RootState) => state.filterReducers.showRightSidePop
  );
  useEffect(() => {
    dispatch(getAllFiltersOptionsForAccount(accountName));
  }, []);
  const {
    schema,

    sourceTab,

    isActivePageType,

    whatsappChannelTab,

    subModuleTab,

    channelTab,

    currentLoggerPage,
  } = useCurrentPageTab();

  useEffect(() => {
    const x = (window.document.onclick = (event) => {
      if (
        ref.current &&
        refP.current &&
        !refP.current.contains(event.target) &&
        !ref.current.contains(event.target)
      ) {
        dispatch(setShowRightSideBar(false));
        props.setSelectedIcon("");
      }
    });
    return window.removeEventListener("click", x);
  }, []);
  //console.log(props.selectedIcon,"SELCTED ICOn")
  return (
    <>
      <div
        ref={refP}
        className={`${styles.rightsidepopwrapper} ${show ? styles.show : ""}`}
      >
        {props?.selectedIcon === "Filter" && (
          <>
            <DropdownFilter selectedIcon={props.selectedIcon} />
          </>
        )}
        {props?.selectedIcon === "Calendar" && (
          <>
            <DatePicker
              setSelectedIcon={props.setSelectedIcon}
              selectedIcon={props.selectedIcon}
            />
          </>
        )}
        {props?.selectedIcon === "Download" && (
          <>
            <DownloadSection
              selectedIcon={props?.selectedIcon}
              setSelectedIcon={props.setSelectedIcon}
            />
          </>
        )}
        {props?.selectedIcon === "KPI customisation" && (
          <>
            <div style={{ textAlign: "center" }}>
              <KPIWrapper selectedIcon={props?.selectedIcon} />
            </div>
          </>
        )}
        {props?.selectedIcon === "Shuffle Column" && (
          <>
            <div style={{ textAlign: "center" }}>{props?.selectedIcon}</div>
          </>
        )}
        <div
          className={styles.closeicon}
          onClick={() => {
            dispatch(setShowRightSideBar(false));
            dispatch(setSelectedFilterType(""));
            props.setSelectedIcon("");
          }}
        >
          {/* <img src={arrow} alt="" /> */}
          <PravidIcons activeIcon={"arrow"} />
        </div>
      </div>
    </>
  );
});

RightSidebarpop.displayName = "RightSidebarpop";
export default RightSidebarpop;
