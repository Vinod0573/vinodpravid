export declare const getLoggerReportDataAPI: (bodyData: any) => {
    type: string;
    payload: {
        bodyData: any;
    };
};
export declare const setTableSortingColumn: (columnKey: string, sortingDirection: "asc" | "desc") => {
    type: string;
    payload: {
        columnKey: string;
        sortingDirection: "desc" | "asc";
    };
};
export declare const sortReportTableData: (tableData: Array<any>, tableSortingColumn: Record<string, "asc" | "desc">) => {
    type: string;
    payload: {
        tableData: any[];
        tableSortingColumn: Record<string, "desc" | "asc">;
    };
};
