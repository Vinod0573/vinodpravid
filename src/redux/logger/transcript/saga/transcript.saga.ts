import {
  config,
  CONVERSATION_URL,
  SERVER_URL2,
} from "../../../../services/ApiRoutes";
import { put, call } from "redux-saga/effects";
import TRANSCRIPT_ACTION from "../actionTypes";

export function* setAllPhoneList(data: any) {
  const preFilterData = data;
  yield put({
    type: TRANSCRIPT_ACTION.SET_ALL_PHONE_NUMBER,
    payload: preFilterData,
  });
}

export function* apiCall(data: any): any {
  // console.log("saga running", data);
  yield put({ type: TRANSCRIPT_ACTION.SET_PHONE_LOADING, payload: true });
  try {
    // let channel;
    // // console.log(data, "api");
    // if (data.data.channel.toString().toLowerCase() === "call") {
    //   channel = "Call";
    // } else if (data.data.channel.toString().toLowerCase() === "whatsapp") {
    //   channel = "Whatsapp";
    // }
    // let source;
    // if (data?.data?.source) {
    //   if (data.data.source.includes("Debt")) {
    //     source = "Debt";
    //   } else if (data.data.source.includes("Lead")) {
    //     source = "Lead";
    //   }
    // }

    // console.log("transcript saga before api");
    let dummyBodyData: any = {
      accountName: data.data.user,
      channel: [data.data.channel],
      dategte: data.data.startDate,
      datelte: data.data.endDate,
      limit: data.data.limit,
      page: data.data.page,
      source: [data?.data?.source],
      // language: data.data?.language || [],
      // disposition: data.data?.disposition || [],
      // flowType: data.data?.flowType || [],
      phoneNo: "",
    };

    dummyBodyData = { ...dummyBodyData, ...data.data?.selectedFilters };
    if (data.data?.phoneNo) {
      dummyBodyData.phoneNo = data.data.phoneNo;
    }
    if (data.data?.channel?.toString()?.toLowerCase() === "whatsapp") {
      dummyBodyData.communicationType = [data.data.communicationType];
    }
    const phoneSessionIdUrl = `${SERVER_URL2}${CONVERSATION_URL.FETCH_SESSION_ID}`;
    //  console.log("the url", phoneSessionIdUrl);
    const response = yield call(config.POST, phoneSessionIdUrl, dummyBodyData);
    // console.log(dummyBodyData, "body Data", { response }, "the Response");
    yield put({
      type: TRANSCRIPT_ACTION.SET_TOTAL_PAGE,
      payload: response.data.data.totalPages,
    });
    const phoneList = response.data.data.results;
    yield call(setAllPhoneList, phoneList);
    // console.log(response, "the response");
  } catch (error) {
    console.error(error);
    yield call(setAllPhoneList, []);
  }
  yield put({ type: TRANSCRIPT_ACTION.SET_PHONE_LOADING, payload: false });
}
