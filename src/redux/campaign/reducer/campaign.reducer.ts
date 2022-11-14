import actionTypes from "../actionTypes/campaign.actionTypes";
import { stateInterface } from "../interface";

const campaignReducer = (
  state: stateInterface = {
    allCampaignListb: "",
    typeUploadClick: "",
    campaignSelectedData: "",
    campaignIdName: "",
    campaignAllIdEdit: "",
    campaignIdNameEdit: "",
    campaignEditUpdateType: "",
    saarthiHeader: "",
    csvHeader: "",
    uploadedCamapignFile: "",
    campaignClientName: "",
    campaignCredentials: "",
    mappedCredentials: "",
    childName: "",
    parentName: "",
    csvHeaderDataList: "",
    isCampaignCreate: "",
    datefiltercampaign: "",
    campaignAllCampaignChannelData: "",
    campaignAllChannelOmni: "",
    campaignWhatsappSchedulerData: "",
    campaignUpdateMode: "",
    callingDetailsData: "",
    campaignListParentId: "",
    isShowConfirm: "",
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.SET_ALL_CAMPAIGN_LIST: {
      return {
        ...state,
        allCampaignList: action.payload,
      };
    }

    case actionTypes.SET_TYPE_UPLOAD_CLICK: {
      return {
        ...state,
        typeUploadClick: action.payload,
      };
    }

    case actionTypes.SET_CAMPAIGN_SELECTED_DATA: {
      return {
        ...state,
        campaignSelectedData: action.payload,
      };
    }

    case actionTypes.SET_CAMPAIGN_ID_NAME: {
      return {
        ...state,
        campaignIdName: action.payload,
      };
    }
    //for all id
    case actionTypes.SET_CAMPAIGN_ID_ALL_EDIT: {
      return {
        ...state,
        campaignAllIdEdit: action.payload,
      };
    }

    case actionTypes.SET_CAMPAIGN_ID_NAME_EDIT: {
      return {
        ...state,
        campaignIdNameEdit: action.payload,
      };
    }

    case actionTypes.SET_TYPE_CREATE_EDIT_CAMAPIGN: {
      return {
        ...state,
        campaignEditUpdateType: action.payload,
      };
    }

    case actionTypes.SAARTHI_HEADER: {
      return {
        ...state,
        saarthiHeader: action.payload,
      };
    }
    case "CSV_HEADER": {
      return {
        ...state,
        csvHeader: action.payload,
      };
    }
    case actionTypes.SET_FILE_UPLOADED_INFO: {
      return {
        ...state,
        uploadedCamapignFile: action.payload,
      };
    }
    case actionTypes.SET_CLIENT_NAME: {
      return {
        ...state,
        campaignClientName: action.payload,
      };
    }
    case actionTypes.SET_CAMPAIGN_CREDENTIAL: {
      return {
        ...state,
        campaignCredentials: action.payload,
      };
    }
    case actionTypes.SET_STORE_MAPPED_DATA: {
      return {
        ...state,
        mappedCredentials: action.payload,
      };
    }
    case actionTypes.SET_CHILD_DATA: {
      return {
        ...state,
        childName: action.payload,
      };
    }
    case actionTypes.SET_PARENT_DATA: {
      return {
        ...state,
        parentName: action.payload,
      };
    }
    case actionTypes.SET_CSV_HEADER_DATA: {
      return {
        ...state,
        csvHeaderDataList: action.payload,
      };
    }
    // case actionTypes.SET_TYPE_CREATE_EDIT_CAMAPIGN:{
    //     return{
    //         ...state,
    //         isCampaignCreate: action.payload
    //       }
    // }
    case actionTypes.SET_FILTEREDATE_CAMPAIGN: {
      return {
        ...state,
        datefiltercampaign: action.payload,
      };
    }
    // all channel data SET_ALL_CAMPAIGN_CHANNEL_DATA
    case actionTypes.SET_ALL_CAMPAIGN_CHANNEL_DATA: {
      return {
        ...state,
        campaignAllCampaignChannelData: action.payload,
      };
    }
    case actionTypes.SET_ALL_CHANNEL_OMNI: {
      return {
        ...state,
        campaignAllChannelOmni: action.payload,
      };
    }

    case actionTypes.SET_STORED_SCHEDULER_DATA: {
      return {
        ...state,
        campaignWhatsappSchedulerData: action.payload,
      };
    }
    // update mode
    case actionTypes.SET_UPDATE_MODE: {
      return {
        ...state,
        campaignUpdateMode: action.payload,
      };
    }
    case actionTypes.SET_UPLOADED_CSV_DATA: {
      return {
        ...state,
        callingDetailsData: action.payload,
      };
    }

    case actionTypes.SET_PARENT_CAMPAIGN_LIST_ID: {
      return {
        ...state,
        campaignListParentId: action.payload,
      };
    }
    case actionTypes.SET_IS_SHOW_CONFIRM: {
      return {
        ...state,
        isShowConfirm: action.payload,
      };
    }

    case actionTypes.PUSHED_API_DATA_CSV_DOWNLOAD: {
      return {
        ...state,
        pushApiDataCsvDownload: action.payload,
      };
    }

    case "SET_CUSTOMER_DATA": {
      return {
        ...state,
        customerDataType: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default campaignReducer;
