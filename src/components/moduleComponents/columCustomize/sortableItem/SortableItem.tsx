import React from "react";
import styles from "./SortableItem.module.scss";
import { SortableElement } from "react-sortable-hoc";
import PravidIcons from "../../../generic/icon/PravidIcons";
// import { arrayMoveImmutable } from "array-move";
// import { SortableContainer } from "react-sortable-hoc";
// import { useEffect, useState } from "react";
// import { threedot } from "../../../../theme/assets/svg/rightSideIcon";
import { info } from "../../../../theme/assets/svg/rightSideIcon";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setReportColumnInDnd } from "../../../../redux/filters/actions";
// import DivComponent from "../../demo/buttonDivComponent/DivComponent";
// import { RootState } from "../../../../redux";
const SortableItem = (props: any) => {
  //const dispatch = useDispatch();
  //   window.onclick = (e) => {
  //     console.log(e.target, "OKKKKKKKKKKKKK");
  //   };
  //   const columns = useSelector(
  //     (state: RootState) => state.filterReducers.allSelectedReportingColumn
  //   );
  // const removeFromSelectedColumn = (id: any) => {
  //   console.log("CLICKED ");
  //   const upatedcolumns = columns.filter((each: any) => each.id !== id);
  //   dispatch(setReportColumnInDnd(upatedcolumns));
  // };
  return (
    <li
      className={styles.listitemfordndn}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Ok");
        //removeFromSelectedColumn(props.value.id);
      }}
    >
      <div className={styles.titlediv}>
        <PravidIcons activeIcon={"threedot"} />
        <p style={{ textOverflow: "ellipsis" }}> {props.value?.currentName}</p>
      </div>
      {props.value?.originalName != "Contact Number" ? (
        <PravidIcons
          activeIcon={"cross"}
          datatype="cross"
          extraClass={styles.crossx}
          altText="X"
          onClick={(e: any) => {
           //
          }}
        />
      ) : (
        <>
          <div className={styles.tooltip}>
          <PravidIcons
          activeIcon={"info"}
          datatype="cross"
          extraClass={styles.crossx}
          altText="i"
          onClick={(e: any) => {
            //
          }}
        />
            
            <span className={styles.tooltiptext}>
              Mandatory Column in Table
            </span>
          </div>
        </>
      )}
    </li>
  );
};

const SortableItems = SortableElement(SortableItem);
export default SortableItems;
