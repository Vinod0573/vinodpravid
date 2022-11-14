declare const mathFunctionReducer: import("redux").Reducer<import("redux").CombinedState<{
    mathsOperation: {
        result: any;
        isLoading: boolean;
        API_Response: string;
    } | {
        isLoading: boolean;
        API_Response: any;
        result: string;
    };
}>, any>;
export default mathFunctionReducer;
