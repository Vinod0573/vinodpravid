export function tableConstants(downloadData: any, emailData: any, showData: any): ({
    title: string;
    render: (rowData: any, indx: any, pageNo: any) => JSX.Element;
} | {
    title: JSX.Element;
    render: (rowData: any) => JSX.Element;
})[];
