import React from "react";
interface props {
    renderFunc: (rowData: any, key: string, index: number, pageNo: number) => React.ReactNode;
    rowData: any;
    index: number;
    pageNo: number;
    referenceKey: string;
}
export default function BoydCellComponent(props: props): JSX.Element;
export {};
