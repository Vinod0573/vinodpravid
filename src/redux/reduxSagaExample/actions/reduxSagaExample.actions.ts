import actionType from "../actionTypes";

export const additionWorker = () => {
  return {
    type: actionType.ADDITION
  };
};

export const substractionWorker = () => {
  return { type: actionType.SUBSTRATION };
};

export const restAPICallWorker = () => {
  return { type: actionType.API_REQUEST };
};
