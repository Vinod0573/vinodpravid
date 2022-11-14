export declare const setSelectedSourceTab: (payload: string) => {
    type: string;
    payload: string;
};
export declare const setSelectedChannelTab: (payload: string) => {
    type: string;
    payload: string;
};
export declare const setSelectedWhatsAppChannelTab: (payload: string) => {
    type: string;
    payload: string;
};
export declare const setSelectedSubmoduleTab: (payload: string) => {
    type: string;
    payload: string;
};
export declare const setSubHeaderTabs: (channelTab: string, subChannelTab: string, subModuleTab: string) => {
    type: string;
    payload: {
        channelTab: string;
        subChannelTab: string;
        subModuleTab: string;
    };
};
