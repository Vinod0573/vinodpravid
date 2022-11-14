export function tableConstants(editViewData: any, deleteData: any): {
    title: string;
    render: (rowData: any, indx: any, pageNo: any) => JSX.Element;
}[];
