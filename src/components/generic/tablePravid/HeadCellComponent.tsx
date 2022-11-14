import React from "react";
interface props {
  columnTitle: string;
}

export default function HeadCellComponent(props: props) {
  return <th className="column-name">{props.columnTitle}</th>;
}
