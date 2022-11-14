import actionTypes  from "../actionTypes/campaignTestingInfo.actionTypes";
import { stateInterface } from "../interface";


const campaignTestinInfoReducer = (
  state: stateInterface = {
     customerDataArr: [],
     disableBtn: true
  },
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case actionTypes.ADD_CUSTOMER: {
      const newDataArr = [
        ...state.customerDataArr,
        action.payload.customerData,
      ];
      return { ...state, customerDataArr: [...newDataArr]};
    }
    case actionTypes.DELETE_CUSTOMER: {
      const newCustomerDataArr = [...state.customerDataArr];
      newCustomerDataArr.splice(action.payload.index, 1);
      return { ...state, customerDataArr: newCustomerDataArr };
    }
    case actionTypes.ADD_FETCHED_CUSTOMERS: {
      return { ...state, customerDataArr: action.payload.data };
    }
    case actionTypes.UPDATE_CUSTOMER_DATA: {
      const { value, key, index } = action.payload;
      // const newData = [...state.customerDataArr];
      const newData = JSON.parse(JSON.stringify(state.customerDataArr))
      newData[index][key] = value;
      return { ...state, customerDataArr: [...newData]};
    }
    case actionTypes.SET_DISABLE_BUTTON: {
      return { ...state, disableBtn: action.payload.data };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default campaignTestinInfoReducer;
