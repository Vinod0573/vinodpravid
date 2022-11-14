export declare const setCurrentPage: (currentPage: string) => {
    type: string;
    payload: string;
};
export declare const getSummaryByAPI: (data: string) => {
    type: string;
    payload: string;
};
export declare const getMessages: (data: any) => {
    type: string;
    data: any;
};
export declare const feedbackPostAPI: (data: any, headers: any) => {
    type: string;
    payload: {
        data: any;
        headers: any;
    };
};
