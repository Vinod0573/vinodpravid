interface argInterface {
    limit: number;
    handleSortClick: any;
    title: string;
    tableSortingColumn: {
        referenceKey: string;
        direction: string;
    };
    accountType: string;
}
export declare const tableConstant: ({ limit, handleSortClick, title, tableSortingColumn, accountType, }: argInterface) => ({
    title: string;
    render: (rowData: any, key: string, index: number, pageNo: number) => JSX.Element;
} | {
    title: JSX.Element;
    render: (rowData: any) => JSX.Element;
})[];
export declare const tableConstantForIssue: {};
export {};
