/// <reference types="react" />
import "./TablePravid.scss";
declare type dataType = Array<{
    [key: string]: string | number;
}>;
interface props {
    data: dataType;
    columns: Array<any>;
    pageNo: number;
    isLoading?: boolean;
    hoverable?: boolean;
    stripedColor?: string;
    tableEndDisplay?: boolean;
    extraClassTableWrapper?: string;
    extraClassTable?: string;
    extraClassTableHead?: string;
    extraClassTableBody?: string;
}
export default function TablePravid(props: props): JSX.Element;
export {};
