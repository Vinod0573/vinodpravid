import actionTypes  from "../actionTypes/omniChannel.actionTypes";
import { stateInterface } from "../interface";

const omniChannelReducer = (
  state: stateInterface = {
    isLoding: false,
    getTemplates: [],
    error: "",
    dcbDataWhatsApp : { 
    },
    dcbDataWhatsAppflowUp : []
  },
  action: { payload: any; type: string }
) => {
    switch (action.type) {
      case actionTypes.SET_CHANNEL_BY_NAV: {
        return {
          ...state,
          selectedOmniChannelByNavigation: action.payload,
        };
      }
      case actionTypes.SET_SCHEDULERSETTING_WHATSAPP: {
        return {
          ...state,
          storedschedulerSettingwhatsApp: action.payload,
        };
      }
      case actionTypes.SET_TEMPLATE_REQUEST: {
        return {
          ...state,
          isLoding: true,
        };
      }
      case actionTypes.SET_TEMPLATE_SUCCESS: {
        return {
          ...state,
          isLoding: false,
          getTemplates: action.payload,
        };
      }
      case actionTypes.SET_TEMPLATE_FAILURE: {
        return {
          ...state,
          isLoding: false,
          error: action.payload,
        };
      }
     case actionTypes.SET_TEMPLATE_DROPDOWN: {
      return {
        ...state,
        getDropdownTemplates: action.payload,
      };
     }
     case actionTypes.SET_MINDMAP: {
      return {
        ...state,
        getMindmap: action.payload,
      };
     }
     case actionTypes.SET_DCBDATA_WHATSAPP: {
   
  
      
      const {index,value ,key } = action.payload;
      if(index === "remove"){
        return {
          ...state,
           dcbDataWhatsApp: {}
      }
    }
      
      const finalobj :any={}
      const newData = {...state?.dcbDataWhatsApp};
       finalobj[key] = value
    
      return { ...state, dcbDataWhatsApp: {...newData ,...finalobj} };
      
     }
     case actionTypes.SET_DCBDATA_WHATSAPP_FLOWUP: {
     
      const {index,value } = action.payload;

      if(index === "remove"){
        return {
          ...state,
          dcbDataWhatsAppflowUp: []
        };
      }
      
      const errArray = state?.dcbDataWhatsAppflowUp ? state?.dcbDataWhatsAppflowUp :[]
       const arr =   state?.dcbDataWhatsAppflowUp?.length >0? [...errArray] : [] 
       arr[index] = value
      return {
        ...state,
        dcbDataWhatsAppflowUp: arr
      };
      
     }
     case actionTypes.SET_SELECTED_DISPOSITION_DATAWP:{
      return{
        ...state,
        selectedDispositionDataWP: action.payload
      }
    }
     case actionTypes.SET_SEPARATE_SELECTED_DATAWP:{
      return{
        ...state,
        separateDispositionDataWP: action.payload
      }
    }
    case actionTypes.SET_SELECTED_DISPOSITION_DATA_CHILDWP:{
      return{
        ...state,
        selectedDispositionDataChildWP: action.payload
      }
    }
    case actionTypes.SET_SHUFFLED_CONNECTED_SUCCEDING_DATAWP:{
      return{
        ...state,
        shuffledConnectedSuccedingWP: action.payload
      }
    }
    case actionTypes.SET_SHUFFLED_NOTCONNECTED_SUCCEDING_DATAWP:{
      return{
        ...state,
        shuffledNotConnectedSuccedingWP: action.payload
      }
    }
    case actionTypes.SET_NUMBER_OF_FOLLOWUP:{
      return{
        ...state,
        numberOfFollowUp: action.payload
      }
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default omniChannelReducer;
