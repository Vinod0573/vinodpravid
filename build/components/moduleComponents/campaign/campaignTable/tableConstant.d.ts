export function tableConstants(getChildCampaign: any, accountType: any, pageNo: any, downloadCampaignData: any, moveToEdit: any, deleteCampaignData: any, showManualScreen: any, moveToAnnalyticPage: any, moveToCallingListPage: any, handleArchieve: any, handlePlayCampaign: any, handlePauseCampaign: any, toShowScheduleModal: any, toshowProgressModal: any, closeArrowList: any, showChildId: any, getParentLabelId: any): ({
    title: string;
    render: (rowdata: any, indx: any, pageNo: any) => JSX.Element;
} | {
    title: string;
    render: (rowData: any) => JSX.Element | "----";
})[];
