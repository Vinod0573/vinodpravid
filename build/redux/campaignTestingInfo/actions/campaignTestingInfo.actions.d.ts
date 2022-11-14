export function addCustomer(dispatch: any, defaultInputFieldData: any): void;
export function deleteCustomer(dispatch: any, index: any): void;
export function updateCustomerData(dispatch: any, value: any, key: any, index: any): void;
export function setDisableBtn(dispatch: any, value: any): void;
export function getCustomersDataByApi(dispatch: any, clientName: any, defaultInputFieldData: any, reduxData: any): Promise<void>;
export function saveDataByApi(dispatch: any, clientName: any, data: any): Promise<boolean | undefined>;
export function executeCallByApi(dispatch: any, data: any, extraConfigFields: any, clientName: any): Promise<any>;
export function executeWpByApi(dispatch: any, data: any, extraConfigFields: any, accountDetails: any): Promise<false | undefined>;
export function saveCustomerDataByApi(dispatch: any, data: any, token: any, accountIdt: any): Promise<boolean | undefined>;
