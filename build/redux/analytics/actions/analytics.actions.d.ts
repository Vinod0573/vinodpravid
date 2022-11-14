export declare const getAnalyticsAPIData: (bodyData: any) => {
    type: string;
    payload: {
        bodyData: any;
    };
};
export declare const getExpandedChart: (isExpand: boolean, expandedChart: any) => {
    type: string;
    payload: {
        isExpand: boolean;
        expandedChart: any;
    };
};
export declare const getSortedChart: (isSort: boolean, sortedChart: string) => {
    type: string;
    payload: {
        isSort: boolean;
        sortedChart: string;
    };
};
export declare const getAnalyticsChartDownloadCSV: (bodyData: any) => {
    type: string;
    payload: {
        bodyData: any;
    };
};
export declare const getViewMore: (isViewMore: boolean, viewMoreChart: any) => {
    type: string;
    payload: {
        isViewMore: boolean;
        viewMoreChart: any;
    };
};
