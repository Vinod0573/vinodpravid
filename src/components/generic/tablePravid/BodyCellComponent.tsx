import React from "react";
interface props {
  renderFunc: (
    rowData: any,
    key: string,
    index: number,
    pageNo: number
  ) => React.ReactNode;
  rowData: any;
  index: number;
  pageNo: number;
  referenceKey: string;
}

export default function BoydCellComponent(props: props) {
  return (
    <td className="body__data">
      {props.renderFunc(
        props.rowData,
        props.referenceKey,
        props.index,
        props.pageNo
      )}
    </td>
  );
}
