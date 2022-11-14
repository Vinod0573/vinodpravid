import React from "react";
import styles from "./SortableList.module.scss";
import { SortableContainer } from "react-sortable-hoc";
import SortableItems from "../sortableItem/SortableItem";
const SortableList = (props) => {
  //  function shouldCancel(e){
  //   console.log(e,"SHOULD CANCEL START")
  //  }
  return (
    <ul className={styles.listfordnnd}>
      {props.items.map((value, index) => (
        <SortableItems  key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
};

const SortableLists = SortableContainer(SortableList);
export default SortableLists;
