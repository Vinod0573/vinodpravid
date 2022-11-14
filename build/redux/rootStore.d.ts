/// <reference types="redux-persist/types/persistreducer" />
/// <reference types="redux-persist/types/types" />
/// <reference types="redux-persist" />
import { Middleware } from "@reduxjs/toolkit";
export declare const store: import("@reduxjs/toolkit").EnhancedStore<import("redux").EmptyObject & {
    loginReducer: any;
    integartionReducers: any;
    baseScreen: import("redux").CombinedState<{
        leftMenu: import("./baseScreen/leftMenu").stateInterface & import("redux-persist/es/persistReducer").PersistPartial;
        baseScreenState: import("./baseScreen/baseScreenState/interface").stateInterface;
    }>;
    loggerReducer: import("redux").CombinedState<{
        loggerState: import("./logger/loggerState/interface").stateInterface;
        transcriptReducer: import("./logger/transcript/transcript").transcriptInterface;
        report: import("./logger/report/interface").stateInterface;
        reportIssue: {};
        newReportIssueReducer: {
            data: any;
            updateReportIssueId: string;
        };
    }>;
    mathFunctionReducer: import("redux").CombinedState<{
        mathsOperation: {
            result: any;
            isLoading: boolean;
            API_Response: string;
        } | {
            isLoading: boolean;
            API_Response: any;
            result: string;
        };
    }>;
    breadcrumReducer: any;
    razorpayReducer: any;
    filterReducer: any;
    demoReducer: any;
    allClientReducer: never;
    operationReducer: any;
    dashboardReducer: any;
    filterReducers: any;
    campaignReducer: any;
    omniChannelReducer: any;
    schedulerReducer: any;
    campaignTestingInfoReducer: any;
    analyticsReducer: import("./analytics/interface").stateInterface;
} & import("redux-persist/es/persistReducer").PersistPartial, any, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("redux").EmptyObject & {
    loginReducer: any;
    integartionReducers: any;
    baseScreen: import("redux").CombinedState<{
        leftMenu: import("./baseScreen/leftMenu").stateInterface & import("redux-persist/es/persistReducer").PersistPartial;
        baseScreenState: import("./baseScreen/baseScreenState/interface").stateInterface;
    }>;
    loggerReducer: import("redux").CombinedState<{
        loggerState: import("./logger/loggerState/interface").stateInterface;
        transcriptReducer: import("./logger/transcript/transcript").transcriptInterface;
        report: import("./logger/report/interface").stateInterface;
        reportIssue: {};
        newReportIssueReducer: {
            data: any;
            updateReportIssueId: string;
        };
    }>;
    mathFunctionReducer: import("redux").CombinedState<{
        mathsOperation: {
            result: any;
            isLoading: boolean;
            API_Response: string;
        } | {
            isLoading: boolean;
            API_Response: any;
            result: string;
        };
    }>;
    breadcrumReducer: any;
    razorpayReducer: any;
    filterReducer: any;
    demoReducer: any;
    allClientReducer: never;
    operationReducer: any;
    dashboardReducer: any;
    filterReducers: any;
    campaignReducer: any;
    omniChannelReducer: any;
    schedulerReducer: any;
    campaignTestingInfoReducer: any;
    analyticsReducer: import("./analytics/interface").stateInterface;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction, undefined>, ...Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>[]]>>;
export declare const persistor: import("redux-persist").Persistor;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
