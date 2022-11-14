/**
 * getDataFromSchema is use to get data from schema in cleaner way.
 * get require data by useSelector hook from reducer and pass in function.
 * currentLoggerPage?: string; it is report/ transcript.
 * It will return schema according to tab selected if all data is valid.
 * Otherwise will return string with error message.
 */
interface argsInterface {
    schema: any;
    isActivePageType: string;
    sourceTab: string;
    subModuleTab: string;
    channelTab: string;
    whatsappChannelTab?: string;
    currentLoggerPage?: string;
}
export declare const getDataFromSchema: ({ schema, isActivePageType, sourceTab, subModuleTab, channelTab, whatsappChannelTab, currentLoggerPage, }: argsInterface) => any;
export {};
