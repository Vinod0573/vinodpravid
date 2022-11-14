export function callDetailsTableConstants(downloadcsvFunc: any, downloadIdFun: any, tomap: any, accountType: any, breadcrumName: any): ({
    title: string;
    render: (rowData: any, indx: any, pageNo: any) => JSX.Element;
} | {
    title: string;
    render: (rowData: any) => false | JSX.Element;
})[];
