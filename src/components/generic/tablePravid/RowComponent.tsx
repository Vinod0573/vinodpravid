import React from "react";
import BodyCellComponent from "./BodyCellComponent";
interface props {
  columns: Array<any>;
  rowData: any;
  index: number;
  pageNo: number;
}

export default function RowCellComponent(props: props) {
  return (
    <tr className="body__row">
      {props.columns.map((column, key) => (
        <BodyCellComponent
          key={key}
          renderFunc={column.render}
          rowData={props.rowData}
          index={props.index}
          pageNo={props.pageNo}
          referenceKey={column.key}
        />
      ))}
    </tr>
  );
}
