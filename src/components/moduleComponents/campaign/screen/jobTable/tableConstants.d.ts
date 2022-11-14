export function tableConstants(handleRun: any, jobFetchStatus: any, handleCompleted: any): {
    title: string;
    render: (rowdata: any, indx: any, pageNo: any) => JSX.Element;
}[];
