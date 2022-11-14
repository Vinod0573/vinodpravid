import axios from "axios";
import Moment from "moment";
import CAMPAIGN_TESTING_ACTION from "../actionTypes/campaignTestingInfo.actionTypes";
import { CAMPAIGN_TESTING_URL } from "../../../services/ApiRoutes";
import { ToastContainer, toast } from "react-toastify";
const { v4: uuidv4 } = require("uuid");
/* Constants */
const configKeys = [
  "isActive",
  "contactInfo.primary",
  "primaryInfo.flow",
  "primaryInfo.language",
  "behaviourDetails.callDisposition",
  "primaryInfo.firstName",
  "primaryInfo.clientname",
  "loanAccountDetails.emiAmount",
  "loanAccountDetails.emiDueDate",
  "behaviourDetails.ptpDate",
  "primaryInfo.region",
  "primaryInfo.gender",
  "primaryInfo.age",
  "primaryInfo.collared",
  "behaviourDetails.typology",
  "primaryInfo.agentname",
];
const apiResponseKeys = [
  "isActive",
  "mobileNumber",
  "flow",
  "language",
  "disposition",
  "firstName",
  "clientName",
  "emiamount",
  "emiduedate",
  "ptpDate",
  "region",
  "gender",
  "age",
  "occupation",
  "typology",
  "agentname",
];

const apiResponseKeysUploadDataapi = [
  "isActive",
  "phone_number",
  "flow_type",
  "language",
  "call_disposition",
  "first_name",
  "bank_name",
  "amount",
  "due_date",
  "ptp_date",
  "region",
  "gender",
  "age",
  "collared",
  "typology",
  "agent_name",
];

const maiaFlow = {
  Pre_Due: "predue",
  Due_Date: "duedate",
  "DPD_1-3": "dpd_1_3",
  "DPD_4-7": "dpd_4_7",
  "DPD_8-15": "dpd_8_15",
  "DPD_16-30": "dpd_16_30",
};
const maiaWhatsAppFlow = {
  Pre_Due: "predue",
  Due_Date: "duedate",
  "DPD_1-3": "DPD_1_3",
  "DPD_4-7": "DPD_4_7",
  "DPD_8-15": "DPD_8_15",
  "DPD_16-30": "DPD_16_30",
};

const maiTypology = {
  "WAOR(Low-Risk_Polite)": "WAOR",
  "WACR(Low-Risk_Polite)": "WACR",
  "WIOR(Low-Risk_Polite)": "WIOR",
  "WAOE(Low-Risk_Polite)": "WAOE",
  "WIOE(Medium-Risk_Neutral)": "WIOE",
  "WACE(Medium-Risk_Neutral)": "WACE",
  "WICR(Medium-Risk_Neutral)": "WICR",
  "WICE(Medium-Risk_Neutral)": "WICE",
  "DAOR(Medium-Risk_Neutral)": "DAOR",
  "DAOE(Medium-Risk_Neutral)": "DAOE",
  "DACR(Medium-Risk_Neutral)": "DACR",
  "DIOR(High-Risk_Firm)": "DIOR",
  "DACE(High-Risk_Firm)": "DACE",
  "DIOE(High-Risk_Firm)": "DIOE",
  "DICR(High-Risk_Firm)": "DICR",
  "DICE(High-Risk_Firm)": "DICE",
  WAOR: "WAOR",
};

export const addCustomer = (dispatch, defaultInputFieldData) => {
  const customerData = { ...defaultInputFieldData };
  dispatch({
    type: CAMPAIGN_TESTING_ACTION.ADD_CUSTOMER,
    payload: { customerData: customerData },
  });
};

export const deleteCustomer = (dispatch, index) => {
  dispatch({
    type: CAMPAIGN_TESTING_ACTION.DELETE_CUSTOMER,
    payload: { index: index },
  });
};

export const updateCustomerData = (dispatch, value, key, index) => {
  // console.log("action", key, value, index);
  dispatch({
    type: CAMPAIGN_TESTING_ACTION.UPDATE_CUSTOMER_DATA,
    payload: { key, value, index },
  });
};

export const setDisableBtn = (dispatch, value) => {
  dispatch({
    type: CAMPAIGN_TESTING_ACTION.SET_DISABLE_BUTTON,
    payload: { data: value },
  });
};

export const getCustomersDataByApi = async (
  dispatch,
  clientName,
  defaultInputFieldData,
  reduxData
) => {
  const clientNameProper = clientName;
  clientName = clientName.replaceAll(" ", "%20");
  const URL = `${CAMPAIGN_TESTING_URL.GET_CUSTOMERS_DATA}${clientName}`;
  try {
    const res = await axios.get(URL);
    const tempCustomersData = res?.data?.data[0]?.userInfo;

    if (tempCustomersData) {
      const dataArr = tempCustomersData.map((item) => {
        const newItem = { ...defaultInputFieldData };
        apiResponseKeys.forEach((key, index) => {
          if (item[key] || item[key] === false) {
            newItem[configKeys[index]] = item[key];
          }
        });
        if (clientNameProper === "Aadhar Housing Testing") {
          newItem["linkStatus"] = item["linkStatus"];
        }
        if (clientNameProper === "Mannapuram Personal Loans Testing") {
          newItem["noOfLoans"] = item["noOfLoans"];
        }
        if (
          clientNameProper === "Capri Global Testing" ||
          clientNameProper === "Capri Azure Testing"
        ) {
          newItem["payment_method"] = item["payment_method"];
        }
        return newItem;
      });

      if (dataArr?.length !== 0) {
        dispatch({
          type: CAMPAIGN_TESTING_ACTION.ADD_FETCHED_CUSTOMERS,
          payload: { data: dataArr },
        });
      } else if (reduxData?.length === 0) {
        const customerData = { ...defaultInputFieldData };
        dispatch({
          type: CAMPAIGN_TESTING_ACTION.ADD_CUSTOMER,
          payload: { customerData: customerData },
        });
      }

      dispatch({
        type: CAMPAIGN_TESTING_ACTION.SET_DISABLE_BUTTON,
        payload: { data: false },
      });
    } else if (reduxData?.length === 0) {
      const customerData = { ...defaultInputFieldData };
      dispatch({
        type: CAMPAIGN_TESTING_ACTION.ADD_CUSTOMER,
        payload: { customerData: customerData },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const saveDataByApi = async (dispatch, clientName, data) => {
  const URL = CAMPAIGN_TESTING_URL.SAVE_CUSTOMERS_DATA;
  const modifiedData = data.map((item) => {
    const modifiedItem = {};
    configKeys.forEach((key, index) => {
      modifiedItem[apiResponseKeys[index]] = item[key];
    });
    if (clientName === "Aadhar Housing Testing") {
      modifiedItem["linkStatus"] = item["linkStatus"];
    }
    if (clientName === "Mannapuram Personal Loans Testing") {
      modifiedItem["noOfLoans"] = item["noOfLoans"];
    }
    if (
      clientName === "Capri Global Testing" ||
      clientName === "Capri Azure Testing"
    ) {
      modifiedItem["payment_method"] = item["payment_method"];
    }
    return modifiedItem;
  });
  const bodyData = { clientName, userInfo: modifiedData };
  const headers = { "Content-Type": "application/json" };

  try {
    setDisableBtn(dispatch, true);
    const res = await axios.post(URL, bodyData, { headers });
    setDisableBtn(dispatch, false);
    if (res.data) {
      toast.success("Saved Successfully");
      return true;
    }
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.error);
    setDisableBtn(dispatch, false);
    return false;
  }
};

export const executeCallByApi = async (
  dispatch,
  data,
  extraConfigFields,
  clientName
) => {
  const URL = CAMPAIGN_TESTING_URL.CAMPAIGNTESTING;
  data = data.filter((item) => item.isActive === true);
  console.log("exe", data);
  const modifiedData = data.map((item) => {
    const modifiedItem = { ...extraConfigFields };

    // if (modifiedItem["clientName"] === "Maia Testing") {
    //   modifiedItem["clientName"] = "Maia";
    // }
    configKeys.forEach((key) => {
      if (item[key] !== "" && item[key] !== null) {
        modifiedItem[key] = item[key];
        if (key === "primaryInfo.collared") {
          let toSend = item[key].split(" ");
          modifiedItem[key] = toSend?.[0];
        }
        if (key === "primaryInfo.firstName") {
          modifiedItem[key] = item[key]?.toLowerCase();
        }
        if (key === "primaryInfo.gender") {
          if (item[key] == "Male") {
            modifiedItem[key] = "M";
          } else {
            modifiedItem[key] = "F";
          }
        }
        if (
          key === "loanAccountDetails.emiDueDate" ||
          key === "behaviourDetails.ptpDate"
        ) {
          modifiedItem[key] = Moment(item[key]).format("DD-MM-YYYY");
        }
        if (
          extraConfigFields["clientName"] === "Maia Testing" &&
          key === "primaryInfo.flow"
        ) {
          modifiedItem[key] = maiaFlow[`${item[key]}`];
        }
        if (key === "behaviourDetails.typology") {
          modifiedItem[key] = maiTypology[`${item[key]}`];
        }
        if (key === "primaryInfo.clientname") {
          modifiedItem["primaryInfo.bankname"] = item[key];
          delete modifiedItem["primaryInfo.clientname"];
        }
      }
    });
    if (clientName === "Aadhar Housing Testing") {
      modifiedItem["customerInfo"]["others"]["linkStatus"] = item["linkStatus"];
    }
    if (clientName === "Mannapuram Personal Loans Testing") {
      modifiedItem["loanAccountDetails.noOfLoans"] = item["noOfLoans"];
    }
    if (
      clientName === "Capri Global Testing" ||
      clientName === "Capri Azure Testing"
    ) {
      modifiedItem["loanAccountDetails.nach"] =
        item["payment_method"] === "Nach" ? "yes" : "no";
    }
    if (clientName === "Probus Insurance Testing") {
      modifiedItem["clientName"] = "Probus Testing";
    }
    return modifiedItem;
  });
  const bodyData = modifiedData;
  const headers = { "Content-Type": "application/json" };
  if (bodyData.length === 0) {
    toast.error("Please select at least one calling info ");
    return false;
  }

  try {
    setDisableBtn(dispatch, true);
    const res = await axios.post(URL, bodyData, { headers });
    setDisableBtn(dispatch, false);
    if (res.data) {
      toast.success("Call Executed Successfully");
      return res.data.data.message;
    }
  } catch (e) {
    console.error(e);
    setDisableBtn(dispatch, false);
    return false;
  }
};

export const executeWpByApi = async (
  dispatch,
  data,
  extraConfigFields,
  accountDetails
) => {
  // console.log("bhai", accountDetails);
  let url = CAMPAIGN_TESTING_URL.CAMPAIGNTESTINGWHATAPP;
  let temp = [];
  data = data.filter((item) => item.isActive === true);
  let newArray1 = data?.map((item) => {
    const modifiedItem = { ...extraConfigFields };
    configKeys.forEach((key) => {
      if (item[key] !== "" && item[key] !== null) {
        modifiedItem[key] = item[key];

        if (
          key === "loanAccountDetails.emiDueDate" ||
          key === "behaviourDetails.ptpDate"
        ) {
          modifiedItem[key] = Moment(item[key]).format("DD-MM-YYYY");
        }
      }
    });
    if (
      extraConfigFields.clientName === "Capri Global Testing" ||
      extraConfigFields.clientName === "Capri Azure Testing"
    ) {
      modifiedItem["payment_method"] = item["payment_method"];
    }
    return modifiedItem;
  });

  if (data?.length === 0) {
    toast.error("Please select at least one calling info ");
    return false;
  }

  newArray1?.map((e) => {
    let final = {
      mobile: e["contactInfo.primary"],
      campaignInfo: {
        accountInfo: {
          name: e?.clientName,
          _id: accountDetails[0]?.id,
        },
        customerInfo: {
          primaryInfo: {},
          others: {},
          contactInfo: {},
          loanAccountDetails: {},
          behaviourDetails: {},
          email: { primary: "" },
        },
      },
    };
    let keys = Object.keys(e);
    keys.map((d) => {
      if (d?.includes("primaryInfo")) {
        if (d?.split(".")[1] === "gender") {
          if (e[d] === "Male") {
            final["campaignInfo"]["customerInfo"]["primaryInfo"][
              d?.split(".")[1]
            ] = "M";
          } else {
            final["campaignInfo"]["customerInfo"]["primaryInfo"][
              d?.split(".")[1]
            ] = "F";
          }
        } else if (d?.split(".")[1] === "collared") {
          final["campaignInfo"]["customerInfo"]["primaryInfo"][
            d?.split(".")[1]
          ] = e[d]?.split(" ")[0];
        } else if (d?.split(".")[1] === "flow") {
          final["campaignInfo"]["customerInfo"]["primaryInfo"][
            d?.split(".")[1]
          ] = maiaWhatsAppFlow[`${e[d]}`] ? maiaWhatsAppFlow[`${e[d]}`] : e[d];
        } else {
          final["campaignInfo"]["customerInfo"]["primaryInfo"][
            d?.split(".")[1]
          ] = e[d] ? e[d]?.toString() : "25";
        }
      }
      if (d?.includes("callDisposition")) {
        final["campaignInfo"]["customerInfo"]["others"]["dispositionName"] =
          e[d] === "normal" ? "" : e[d];
      }
      if (d?.includes("contactInfo")) {
        final["campaignInfo"]["customerInfo"]["contactInfo"][d?.split(".")[1]] =
          e[d];
      }
      if (d?.includes("loanAccountDetails")) {
        if (d === "loanAccountDetails.emiDueDate") {
          console.log("abbb", e[d], Moment(`${e[d]}`).format("DD-MM-YYYY"));
          final["campaignInfo"]["customerInfo"]["loanAccountDetails"][
            d?.split(".")[1]
          ] = e[d];
        } else {
          final["campaignInfo"]["customerInfo"]["loanAccountDetails"][
            d?.split(".")[1]
          ] = e[d];
        }
      }
      if (d?.includes("behaviourDetails.typology")) {
        final["campaignInfo"]["customerInfo"]["behaviourDetails"]["typology"] =
          e[d] ? maiTypology[`${e[d]}`] : "";
      }
    });
    if (
      extraConfigFields.clientName === "Capri Global Testing" ||
      extraConfigFields.clientName === "Capri Azure Testing"
    ) {
      final["campaignInfo"]["customerInfo"]["loanAccountDetails"]["nach"] =
        e["payment_method"] === "Nach" ? "yes" : "no";
    }
    temp.push(final);
  });
  let bodywp = {
    data: temp,
    accountDetails: accountDetails[0],
    channel: "Whatsapp",
  };

  try {
    setDisableBtn(dispatch, true);
    const res = await axios.post(url, bodywp);
    setDisableBtn(dispatch, false);
    if (res.data) {
      toast.success("WhatsApp Executed Successfully");
    }
  } catch (e) {
    console.error(e);
    setDisableBtn(dispatch, false);
    return false;
  }
};

export const saveCustomerDataByApi = async (
  dispatch,
  data,
  token,
  accountIdt
) => {
  let URL = CAMPAIGN_TESTING_URL.PUSH_DATA_API;
  console.log("data bank name", data);
  data = data.filter((item) => item.isActive === true);
  const modifiedData = data.map((item) => {
    const modifiedItem = {};
    configKeys.forEach((key, index) => {
      if (key === "primaryInfo.flow") {
        modifiedItem[apiResponseKeysUploadDataapi[index]] =
          maiaFlow[`${item[key]}`];
      } else if (key === "behaviourDetails.typology") {
        modifiedItem[apiResponseKeysUploadDataapi[index]] =
          maiTypology[`${item[key]}`];
      } else if (key === "primaryInfo.gender") {
        if (item[key] == "Male") {
          modifiedItem[apiResponseKeysUploadDataapi[index]] = "M";
        } else {
          modifiedItem[apiResponseKeysUploadDataapi[index]] = "F";
        }
      } else if (key === "primaryInfo.collared") {
        let toSend = item[key].split(" ");
        modifiedItem[apiResponseKeysUploadDataapi[index]] = toSend?.[0];
      } else {
        modifiedItem[apiResponseKeysUploadDataapi[index]] = item[key];
      }
    });
    //     const d = new Date();
    // let text = d.toISOString();
    let sessionId = uuidv4();
    modifiedItem["loan_id"] = `${sessionId}`;
    modifiedItem["email_id"] = "jai@gmail.com";
    modifiedItem["channel"] = "call";
    (modifiedItem["interest_rate"] = "4"),
      (modifiedItem["late_fees"] = "100"),
      (modifiedItem["loan_amount_remaining"] = "400000"),
      (modifiedItem["loan_approval_date"] = "2022-06-09"),
      (modifiedItem["loan_end_date"] = "2023-10-09"),
      (modifiedItem["loan_application_date"] = "2022-06-09"),
      (modifiedItem["loan_tenure_left"] = "5"),
      (modifiedItem["total_emis_paid"] = "3"),
      (modifiedItem["total_loans_taken"] = "3"),
      (modifiedItem["no_of_loans"] = "3"),
      (modifiedItem["no_of_emis"] = "3"),
      (modifiedItem["principal_amount"] = "300000"),
      (modifiedItem["total_loan_amount"] = "300000"),
      (modifiedItem["geographic_location"] = "bengaluru"),
      (modifiedItem["barging_call"] = "true"),
      (modifiedItem["call_id"] = "12345"),
      (modifiedItem["clientName"] = "Demo"),
      delete modifiedItem["isActive"];
    //delete modifiedItem['clientName'];
    //delete modifiedItem['agentname'];
    if (modifiedItem["typology"]?.length === 0) {
      modifiedItem["typology"] = "WAOR";
    }
    if (modifiedItem["amount"]?.length === 0) {
      modifiedItem["amount"] = "40000";
    }
    if (modifiedItem["due_date"]?.length === 0) {
      modifiedItem["due_date"] = "2022-10-09";
    }
    if (modifiedItem["ptp_date"]?.length === 0) {
      modifiedItem["ptp_date"] = "2022-10-09";
    }
    if (modifiedItem["call_disposition"]?.length === 0) {
      modifiedItem["call_disposition"] = "normal";
    }
    if (modifiedItem["age"]?.length === 0) {
      modifiedItem["age"] = "45";
    }
    return modifiedItem;
  });
  console.log("modifiedItem", modifiedData);
  let bodyData = { data: modifiedData };
  //const headers = { "Content-Type": "application/json","Authorization": `JWT ${token}`};

  try {
    let accessTokenUrl = `https://${process.env.REACT_APP_CONNECTOR}/api/accounts/v1/o-login`;
    let accountId = accountIdt;
    let client_id;
    let client_secret;
    if (accountId === "628f6d76d830f6455fa7a632") {
      client_id = "6282b61";
      client_secret = "4ec8830561da4581958d2056da23a14c";
    } else if (accountId === "61e90dab9c1de558c3adb420") {
      client_id = "6319f3d";
      client_secret = "6319f3d36e682e15fc4f6d6319f3d29";
    } else if (accountId === "628f6cef2554564553aa9824") {
      client_id = "dfdfc4f";
      client_secret = "6319f3d36e682e15dfdfdfc4f6d6319f3d29";
    } else if (accountId === "6357ededbc771e3f0332e62f") {
      client_id = "cidtd";
      client_secret = "csec45454tsfst4434";
    } else if (accountId === "6357e19818427181896d1232") {
      client_id = "6319f3dem";
      client_secret = "6319f3d36e682e15fc4fse6319f3d29";
    }

    let accessTokenBody = {
      client_id: client_id,
      client_secret: client_secret,
    };
    let resAccessToken = await axios.post(accessTokenUrl, accessTokenBody);
    let accessToken = resAccessToken?.data?.data?.data?.access_token;
    setDisableBtn(dispatch, true);
    const res = await axios.post(URL, bodyData, {
      headers: { Authorization: `JWT ${accessToken}` },
    });
    setDisableBtn(dispatch, false);
    if (res.data) {
      toast.success("Data Pushed Successfully");
      return true;
    }
  } catch (e) {
    console.error(e);
    toast.error(e?.response?.data?.error);
    setDisableBtn(dispatch, false);
    return false;
  }
};
