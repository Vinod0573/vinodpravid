import React from "react";
import styles from "./ColumnDnD.module.scss";
import { SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer } from "react-sortable-hoc";
import { useEffect, useState } from "react";
// import { threedot } from "../../../../theme/assets/svg/rightSideIcon";
// import { cross } from "../../../../theme/assets/svg/rightSideIcon";
import { useSelector } from "react-redux";
import SortableLists from "../sortableList/SortableList";
import { RootState } from "../../../../redux";
import { useDispatch } from "react-redux";
import { setReportColumnInDnd } from "../../../../redux/filters/actions";
import { useRef } from "react";
// const options = [
//   { currentName: "Sr no", position: 1, id: 23 },
//   { currentName: "Call", position: 3, id: 26 },
//   { currentName: "Summary", position: 4, id: 27 },
//   { currentName: "Langauge", position: 5, id: 35 },
//   { currentName: "Constact", position: 6, id: 98 },
// ];
let targetCross = -1;
function ColumnDnD(props: any) {
  const ref = useRef(0);
  const options = useSelector(
    (state: RootState) => state.filterReducers.allSelectedReportingColumn
  );
  const dispatch = useDispatch();
  // const [targetLi,setTargetLi]=useState(-1);
  // const [targetCross,setTargetCross]=useState(-1);
  const [items, setItems] = useState(options);
  useEffect(() => {
    // console.log(options, "CHNAGE DOPTIONS");
    ref.current = ref.current + 1;
    if (ref.current <= 3) {
      setItems([
        ...options.sort((a: any, b: any) => {
          return a.position - b.position;
        }),
      ]);
    } else {
      setItems(options);
    }
  }, [options]);
  //let  optionsto=[...options.sort((a,b)=>a.position-b.position)];

  const onSortEnd = (order: any) => {
    setItems((prevItem: any) =>
      arrayMoveImmutable(prevItem, order.oldIndex, order.newIndex)
    );
  };
  useEffect(() => {
    // console.log(items,"ITEMS")
    props.setOut(items);
  }, [items]);
  // useEffect(() => {
  //    console.log(targetLi,targetCross,"target li and cross")

  // }, [targetLi,targetCross]);
  function changes(e: any) {
    // setTargetCross(targetLi);
    if (
      targetCross != -1 &&
      e.target.getAttribute("data-type") == "cross" &&
      items[targetCross]?.originalName != "Contact Number"
    ) {
      const temp = items;
      temp.splice(targetCross, 1);

      dispatch(setReportColumnInDnd(temp));
      setItems(temp);
    }
  }
  function handleSortStart(e: any) {
    //  console.log(e,"STARTED DRAGS");
    targetCross = e.index;
  }

  return (
    <div className={styles.wrapperfordndtop}>
      <p className={styles.selectedcolumtitl}>Selected Column</p>
      <div className={styles.centerwrapper}>
        <SortableLists
          items={items}
          transitionDuration={400}
          onSortEnd={onSortEnd}
          onSortStart={handleSortStart}
          shouldCancelStart={changes}
          lockAxis="y"
        />
      </div>
    </div>
  );
}
// function ColumnDnD() {
//   return <div>Ok</div>;
// }

export default React.memo(ColumnDnD);
