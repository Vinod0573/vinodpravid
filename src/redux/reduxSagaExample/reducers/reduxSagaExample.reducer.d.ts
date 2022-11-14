export default function mathOperationReducers(initialstate: {
    isLoading: boolean;
    result: string;
    API_Response: string;
} | undefined, action: any): {
    result: any;
    isLoading: boolean;
    API_Response: string;
} | {
    isLoading: boolean;
    API_Response: any;
    result: string;
};
