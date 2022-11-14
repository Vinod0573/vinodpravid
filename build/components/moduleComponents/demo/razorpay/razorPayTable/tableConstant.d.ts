export default TableConstants;
declare function TableConstants(): {
    title: string;
    render: (rowData: any, indx: any, pageNo: any) => JSX.Element;
}[];
