import TRANSCRIPT_ACTION from "../actionTypes";
export const transcriptPhoneApi = (data: any) => {
  return {
    type: TRANSCRIPT_ACTION.CALL_API,
    data,
  };
};
