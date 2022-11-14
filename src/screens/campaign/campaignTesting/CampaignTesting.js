import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { campaignTestingConfig } from "./campaignTestingConfig";
import {
  addCustomer,
  getCustomersDataByApi,
  deleteCustomer,
  updateCustomerData,
  setDisableBtn,
  saveDataByApi,
  executeCallByApi,
  executeWpByApi,
  saveCustomerDataByApi,
} from "../../../redux/campaignTestingInfo/actions";
import { ToastContainer, toast } from "react-toastify";
import UploadCampaignDetails from "../../../components/moduleComponents/campaign/uploadcampaigndetails/UploadCampaignDetails";
import { tabSelected } from "../../../redux/breadcrum/actions";
import LoaderSaarthi from "../../../components/generic/loader/Loader";
import AddBtn from "../../../components/moduleComponents/demo/addBtn/AddBtn";
import CheckBox from "../../../components/generic/checkbox/Checkbox";
import DropDown from "../../../components/generic/dropdownSaarthi/dropdownsaarthi2/DropdownSaarthi";
import ErrorMessage from "../../../components/generic/errorMessage/ErrorMessage";
import callWhite from "../../../theme/assets/svg/campaignTestingInfo/callWhite.svg";
import whatsAppWhite from "../../../theme/assets/svg/campaignTestingInfo/whatsAppwhite.svg";
import whatsAppBlack from "../../../theme/assets/svg/campaignTestingInfo/whatsAppBlack.svg";
import callBlack from "../../../theme/assets/svg/campaignTestingInfo/callBlack.svg";
import downArrow from "../../../theme/assets/svg/demo/downArrowIcon.svg";
import expandArrow from "../../../theme/assets/svg/generic/activesidearrowcampTest.svg";
import ToggleButton from "../../../components/generic/toggelButton/ToggleButton";
import rural from "../../../theme/assets/svg/campaignTestingInfo/rural.svg";
import male from "../../../theme/assets/svg/campaignTestingInfo/male.svg";
import female from "../../../theme/assets/svg/campaignTestingInfo/female.svg";
import normal from "../../../theme/assets/svg/campaignTestingInfo/normal.svg";
import urban from "../../../theme/assets/svg/campaignTestingInfo/urban.svg";
import whiteColler from "../../../theme/assets/svg/campaignTestingInfo/whiteCollar.svg";
import "react-toastify/dist/ReactToastify.css";
import "./campaignTesting.css";

const CampaignTestingInfo = (props) => {
  /* ---- useStates ---- */
  const [showExtraFields, setShowExtraFields] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isExecutingCall, setIsExecutingCall] = useState(false);
  const [isExecutingWp, setIsExecutingWp] = useState(false);
  const [disableExecuteBtn, setDisableExecuteBtn] = useState(false);
  const [moveToUploadData, setmoveToUploadData] = useState(false);
  /* ---- useSelectors, dispatch ---- */
  const clientName = useSelector(
    (store) =>
      store.loginReducer.userLoginInfo?.userDetail?.accountDetails[0]?.name
  );
  const accountDetails = useSelector(
    (store) => store.loginReducer.userLoginInfo?.userDetail?.accountDetails
  );
  const data = useSelector(
    (store) => store.campaignTestingInfoReducer?.customerDataArr
  );
 
  const disableBtn = useSelector(
    (store) => store.campaignTestingInfoReducer?.disableBtn
  );
  const accessTokenLogin = useSelector(
    (store) => store.loginReducer.userLoginInfo?.userSessionDetails?.accessToken
  );
  const channels = useSelector(
    (store) => store.loginReducer.userLoginInfo?.accountDetails[0]?.channels
  );
  const filterData = useSelector(
    (store) => store.filterReducer?.filterData?.data?.filters
  );
  const jwtToken = useSelector(
    (store) =>
      store.loginReducer?.userLoginInfo?.userSessionDetails?.accessToken
  );
  
  let languageDropdown = filterData?.language?.map((e) => e?.language);
  let flowDropDown = filterData?.flow_type?.map((e) => e?.flow_type);


  const dispatch = useDispatch();

  /* ---- variables ---- */
  let clientConfig = campaignTestingConfig(clientName);
  let extraConfigFields;
  const defaultInputFieldData = {
    isActive: true,
    "contactInfo.primary": "",
    "primaryInfo.flow": "",
    "primaryInfo.language": "",
    "behaviourDetails.callDisposition": "",
    "primaryInfo.firstName": "",
    "primaryInfo.clientname": "",
    "loanAccountDetails.emiAmount": "",
    "loanAccountDetails.emiDueDate": "",
    "behaviourDetails.ptpDate": "",
    "primaryInfo.region": "",
    "primaryInfo.gender": "",
    "primaryInfo.age": "",
    "primaryInfo.collared": "",
    "behaviourDetails.typology": "",
    "primaryInfo.agentname": "",
  };

  // dropdown objects
  const dropListLang = {
    optionList: clientConfig?.language,
    placeHolderText: "Language",
    imgSrcRight: downArrow,
  };
  const dropListFlow = {
    optionList: clientConfig?.flow,
    placeHolderText: "Flow",
    imgSrcRight: downArrow,
  };
  const dropListDisposition = {
    optionList: [
      "Default",
      "Paid",
      "Acceptable Promise To Pay(APTP)",
      "Unacceptable PTP (UPTP)",
      "Defiant to pay (DTP)",
      "Delay - Property Dispute",
      "Delay - Personal Issue",
      "Delay - Business Loss",
      "Delay - Family Matter",
      "Delay - Cheque Bounce",
      "Delay - Insufficient funds",
      "Delay - Date not informed",
      "Delay - Salary issues",
      "Delay - Jobless",
      "Delay - Jobloss",
      "Delay - Unable to find job",
      "Delay - Forgot due date",
      "Delay - Forgot payment",
      "Delay - Account inactive",
      "Delay - Health issue",
      "Delay - Death In Family",
      "Delay - Technical issue",
      "Delay - Account updating",
      "Delay - Account closed",
      "Delay - Transaction limit exceeded",
      "Delay - Account issue",
      "Delay -  Property Dispute - PP",
      "Delay - Personal Issue - PP",
      "Delay - Family Matter - PP",
      "Delay - Jobless - PP",
      "Delay - Jobloss - PP",
      "Delay - Unable to find job - PP",
      "Delay - Salary issues - PP",
      "Delay - Insufficient funds - PP",
      "Ask_Question-APTP",
      "Agree to proceed",
      "Disagree to proceed",
      "General - Callback - Time Available",
      "General - Callback - Time Unavailable",
      "General - Right_party Contact",
      "General - Call hangup",
      "General - Network issue",
      "General - Loan Cancellation",
      "General - Agent Request",
      "General - Customer call later",
      "General - Hear capability - fail",
      "General - No Response",
      "General - Customer Care Contact",
      "General - Language Change -  Not Supported",
      "Busy",
      "No Answer",
    ],
    placeHolderText: "Disposition",
    imgSrcRight: downArrow,
  };
  const dropListCustomerTypology = {
    optionList: [
      "WAOR(Low-Risk_Polite)",
      "WACR(Low-Risk_Polite)",
      "WIOR(Low-Risk_Polite)",
      "WAOE(Low-Risk_Polite)",
      "WIOE(Medium-Risk_Neutral)",
      "WACE(Medium-Risk_Neutral)",
      "WICR(Medium-Risk_Neutral)",
      "WICE(Medium-Risk_Neutral)",
      "DAOR(Medium-Risk_Neutral)",
      "DAOE(Medium-Risk_Neutral)",
      "DACR(Medium-Risk_Neutral)",
      "DIOR(High-Risk_Firm)",
      "DACE(High-Risk_Firm)",
      "DIOE(High-Risk_Firm)",
      "DICR(High-Risk_Firm)",
      "DICE(High-Risk_Firm)",
    ],
    placeHolderText: "Typology(Risk Type_Tone)",
    imgSrcRight: downArrow,
  };
  const dropListStatus = {
    optionList: ["YES", "NO"],
    placeHolderText: "Link Status",
    imgSrcRight: downArrow,
  };
  const setIsActive = (data) => {
    if (data.toLowerCase() === "bot") {
      console.log("setting campaign-testing-info as active");
    }
  };

  /* ---- useEffects ---- */
  useEffect(() => {
    //getCustomersDataByApi(dispatch, clientName, defaultInputFieldData, data);
    if (clientName === "Aadhar Housing Testing") {
      defaultInputFieldData["linkStatus"] = "";
    }
    if (clientName === "Mannapuram Personal Loans Testing") {
      defaultInputFieldData["noOfLoans"] = "";
    }
    if (
      clientName === "Capri Global Testing" ||
      clientName === "Capri Azure Testing"
    ) {
      defaultInputFieldData["payment_method"] = "";
    }
    getCustomersDataByApi(dispatch, clientName, defaultInputFieldData, data);
    setIsLoading(false);
  }, []);

  // data validation
  useEffect(() => {
    const isValidData = validateData();
    let selectedData = data?.filter((e) => e.isActive === true);
    // console.log("isValidData", isValidData);
    if (isValidData && disableBtn) {
      setDisableBtn(dispatch, false);
    } else if (!isValidData && !disableBtn) {
      setDisableBtn(dispatch, true);
    }
    if (data?.length === 0) {
      setDisableExecuteBtn(true);
    } else if (selectedData?.length === 0) {
      setDisableExecuteBtn(true);
    } else {
      setDisableExecuteBtn(false);
    }
  }, [data]);

  /* ---- helper functions ---- */
  const getExtraConfigFields = (clientConfig) => {
    const extraConfigFields = clientConfig?.telephonyData
      ? clientConfig?.telephonyData
      : {};
    extraConfigFields["accessToken"] = accessTokenLogin;
    extraConfigFields["clientName"] = clientName;
    return extraConfigFields;
  };

  const validateData = () => {
    let isValidData = true;
    data?.forEach((row) => {
      if (
        row["contactInfo.primary"]?.length !== 10 ||
        row["primaryInfo.flow"] === "" ||
        row["primaryInfo.language"] === "" ||
        row["primaryInfo.firstName"]?.length === 0
      ) {
        // console.log("is entering forEach if");
        isValidData = false;
      }
      //   if (
      //     clientName === "Maia Testing" &&
      //     (row["primaryInfo.clientname"]?.length < 3 ||
      //       row["primaryInfo.agentname"]?.length < 3)
      //   ) {
      //     isValidData = false;
      //   }
      // });
      if (
        (clientName === "Maia Testing" || clientName?.includes("Demo")) &&
        (row["primaryInfo.clientname"]?.length < 3 ||
          row["primaryInfo.agentname"]?.length < 3)
      ) {
        isValidData = false;
      }
      if (clientName === "Aadhar Housing Testing" && row["linkStatus"] == "") {
        isValidData = false;
      }
      if (
        clientName === "Mannapuram Personal Loans Testing" &&
        row["noOfLoans"] === ""
      ) {
        isValidData = false;
      }
      if (
        (clientName === "Capri Global Testing" ||
          clientName === "Capri Azure Testing") &&
        row["payment_method"] === ""
      ) {
        isValidData = false;
      }
      // if(props.sidebarView ) {
      //   if (
      //     row["loanAccountDetails.emiDueDate"] === "" || row["loanAccountDetails.emiAmount"] === ""   || row["primaryInfo.age"] === ""
      //   ) {
      //     isValidData = false;
      //   }
      // }
    });
    return isValidData;
  };

  /* ---- handlers ---- */
  const handleAddBtnClick = () => {
    if (clientName === "Aadhar Housing Testing") {
      defaultInputFieldData["linkStatus"] = "";
    }
    if (clientName === "Mannapuram Personal Loans Testing") {
      defaultInputFieldData["noOfLoans"] = "";
    }
    if (
      clientName === "Capri Global Testing" ||
      clientName === "Capri Azure Testing"
    ) {
      defaultInputFieldData["payment_method"] = "";
    }
    addCustomer(dispatch, defaultInputFieldData);
  };

  const handleRemoveClick = (index) => {
    setShowExtraFields(null);
    deleteCustomer(dispatch, index);
  };

  const handleInputChange = (value, key, index) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const numberRegex = /^[0-9]*$/;

    // console.log('regex',value,!numberRegex.test(value));
    if (key === "contactInfo.primary" && !numberRegex.test(value)) {
      return;
    }

    if (key === "primaryInfo.firstName" && !nameRegex.test(value)) {
      return;
    }
    if (key === "primaryInfo.clientname" && !nameRegex.test(value)) {
      return;
    }
    if (key === "primaryInfo.agentname" && !nameRegex.test(value)) {
      return;
    }
    if (
      (key === "loanAccountDetails.emiAmount" || key === "primaryInfo.age") &&
      value === "0"
    ) {
      return;
    }

    // if (key === "primaryInfo.age" && value > 99 && value < 0) {
    if (
      clientName === "Mannapuram Personal Loans Testing" &&
      key === "noOfLoans" &&
      value === "0"
    ) {
      return;
    }
    if (key === "primaryInfo.age" && value > 99 && value < 0) {
      return;
    }
    // if (clientName === "Maia Testing" && key === "primaryInfo.gender") {
    if (
      (clientName === "Maia Testing" || clientName?.includes("Demo")) &&
      key === "primaryInfo.gender"
    ) {
      // if (value === "Male") {
      //   updateCustomerData(
      //     dispatch,
      //     "Ramakrishna",
      //     "primaryInfo.firstName",
      //     index
      //   );
      // } else {
      //   updateCustomerData(dispatch, "Zarina", "primaryInfo.firstName", index);
      // }
      //console.log(value);
      console.log("updateCustomerData(dispatch", value);
    }
    updateCustomerData(dispatch, value, key, index);
    // if (
    //   clientName === "Maia Testing" &&
    //   key === "primaryInfo.flow" &&
    //   value === "Due_Date"
    // ) {
    //   updateCustomerData(
    //     dispatch,
    //     "",
    //     "behaviourDetails.callDisposition",
    //     index
    //   );
    if (
      (clientName === "Maia Testing" ||clientName?.includes("Demo")) &&
      key === "primaryInfo.flow" &&
      value === "Due_Date"
    ) {
      updateCustomerData(
        dispatch,
        "",
        "behaviourDetails.callDisposition",
        index
      );
    }
  };

  const handleShowMoreToggle = (index, e) => {
    setShowExtraFields((prev) => (prev === index ? null : index));

    setTimeout(() => {
      const bodyContainer = document.querySelector(".container__body");
      const bodyDetail = bodyContainer.getBoundingClientRect();
      const bodyRow = e.target.closest(".fields-col");
      const bodyRowDetail = bodyRow?.getBoundingClientRect();

      // console.log(bodyRowEndPosition > bodyEndPosition);
      if (bodyRow) {
        const bodyEndPosition = bodyDetail.y + bodyDetail.height;
        const bodyRowEndPosition = bodyRowDetail.y + bodyRowDetail.height;
        if (bodyRowEndPosition > bodyEndPosition) {
          bodyRow.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }
    }, 10);
  };

  const handleCalenderClick = (e) => {
    e.target.type = "date";
    e.target.showPicker();
  };
  const handleCalenderBlur = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
    }
  };

  const handleSaveClick = () => {
    const set = async () => {
      setIsSaving(true);
      const isSuccess = await saveDataByApi(dispatch, clientName, data);
      setIsSaving(false);
      if (props.sidebarView) {
        setIsSaving(true);
        dispatch(tabSelected("API"));
        let accountId = accountDetails[0]?.id;

        const isSuccess = await saveCustomerDataByApi(
          dispatch,
          data,
          jwtToken,
          accountId
        );
        setIsSaving(false);
        setmoveToUploadData(true);
      }
    };
    set();
  };
  const handleExecuteCallClick = () => {
    const callexecute = async () => {
      setIsExecutingCall(true);
      let extraConfigFields = getExtraConfigFields(clientConfig);
      const isSuccessMsg = await executeCallByApi(
        dispatch,
        data,
        extraConfigFields,
        clientName
      );
      setIsExecutingCall(false);
    };
    callexecute();
  };
  const handleExecuteWpClick = () => {
    const whatsAppexecute = async () => {
      setIsExecutingWp(true);
      let extraConfigFields = getExtraConfigFields(clientConfig);
      const isSuccessMsg = await executeWpByApi(
        dispatch,
        data,
        extraConfigFields,
        accountDetails
      );
      setIsExecutingWp(false);
    };
    whatsAppexecute();
  };

  const handleDropdownClick = (e) => {
    setTimeout(() => {
      // console.log();
      const bodyContainer = document.querySelector(".container__body");
      const bodyDetail = bodyContainer.getBoundingClientRect();
      const dropdown = e.target.closest(".dropdownTopDiv")?.children[1];
      const dropdownDetail = dropdown?.getBoundingClientRect();

      // console.log(dropdownEndPosition > bodyEndPosition);
      if (dropdown) {
        const bodyEndPosition = bodyDetail.y + bodyDetail.height;
        const dropdownEndPosition = dropdownDetail.y + dropdownDetail.height;
        if (dropdownEndPosition > bodyEndPosition) {
          dropdown.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }
    }, 10);
  };
  console.log("data", data);
  return (
    <>
      {moveToUploadData ? (
        <div className="tab-section">
          <UploadCampaignDetails demoApiPage={"demoapipage"} />
        </div>
      ) : (
        <div className="wrapper-campaign-testing-info">
          {/* <div className="sidebar-div">
            {props.sidebarView ? (
              ""
            ) : (
              <Sidebar
                activeData={(data) => {
                  setIsActive(data);
                }}
              />
            )}
          </div> */}
          <div className="outer-container">
            <div className="campaign-testing-info__container">
              <div className="container__head">
                <div
                  className={`add-btn ${
                    isLoading ? "disablePointerEventUniversaljp" : ""
                  }`}
                  onClick={handleAddBtnClick}
                >
                  <AddBtn />
                </div>
              </div>
              <div className="container__body">
                {isLoading ? (
                  <LoaderSaarthi />
                ) : (
                  data?.map((item, index) => {
                    return (
                      <div className="body__row" key={index}>
                        <div className="checkbox-col">
                          <div className="form-field__checkbox">
                            <CheckBox
                              checked={item.isActive}
                              extraSpan="extra-class-checkbox-span"
                              onChange={(isChecked) =>
                                handleInputChange(isChecked, "isActive", index)
                              }
                            />
                          </div>
                        </div>
                        <div className="fields-col">
                          <div className="row__part1">
                            <div className="centerName centerFirst">
                              {" "}
                              <div className="row__title">
                                Calling Info
                              </div>{" "}
                            </div>
                            <div className="part__inner-div">
                              <div className="form-field__mobile">
                                <input
                                  type="text"
                                  className="mobnumberInput input-field"
                                  name="contactInfo.primary"
                                  placeholder="Phone Number"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e.target.value,
                                      "contactInfo.primary",
                                      index
                                    )
                                  }
                                  value={item["contactInfo.primary"]}
                                  onKeyDown={(e) =>
                                    ["e", "E", "+", "-", "."].includes(e.key) &&
                                    e.preventDefault()
                                  }
                                  onWheel={(e) => {
                                    return e.target.blur();
                                  }}
                                />
                                <div className="errorDiv">
                                  {item["contactInfo.primary"]?.length !== 10 &&
                                  item["contactInfo.primary"]?.length !== 0 ? (
                                    <ErrorMessage errorMessage="Enter 10 Digit Valid Mobile Number" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="form-field__name">
                                <input
                                  type="text"
                                  className="name-input input-field"
                                  name="name"
                                  placeholder="Customer Name"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e.target.value,
                                      "primaryInfo.firstName",
                                      index
                                    )
                                  }
                                  value={item["primaryInfo.firstName"]}
                                  onKeyDown={(e) =>
                                    ["+", "-", "."].includes(e.key) &&
                                    e.preventDefault()
                                  }
                                  onWheel={(e) => {
                                    return e.target.blur();
                                  }}
                                />
                              </div>
                              <div
                                className="form-field__flow"
                                // onClick={
                                //   data?.length - 1 == index
                                //     ? window.scrollTo({
                                //         top: "100px",
                                //         behavior: "smooth",
                                //       })
                                //     : ""
                                // }
                                onClick={handleDropdownClick}
                              >
                                <DropDown
                                  // droplist={{
                                  //   optionList: clientConfig?.flow,
                                  //   placeHolderText: item["primaryInfo.flow"]
                                  //     ? item["primaryInfo.flow"]
                                  //     : "flow",
                                  //   imgSrcRight: downArrow,
                                  // }}
                                  // editedItem={item["primaryInfo.flow"]}
                                  //     editedItem={item["primaryInfo.flow"]}
                                  droplist={{
                                    optionList: clientConfig?.flow,
                                    placeHolderText: item["primaryInfo.flow"]
                                      ? item["primaryInfo.flow"]
                                      : "flow",
                                    imgSrcRight: downArrow,
                                  }}
                                  editedItem={item["primaryInfo.flow"]}
                                  selectedItem={(value) =>
                                    handleInputChange(
                                      value,
                                      "primaryInfo.flow",
                                      index
                                    )
                                  }
                                  searchUi={false}
                                  extraClassPlaceHolder={
                                    "extraClassPlaceHolderDD"
                                  }
                                  extraClassSelectedArea={"languageDropdown"}
                                  extraClassToBeSelectedArea={
                                    "dropdowndListArea"
                                  }
                                />
                              </div>
                              <div
                                className="form-field__language"
                                onClick={handleDropdownClick}
                              >
                                <DropDown
                                  droplist={dropListLang}
                                  editedItem={item["primaryInfo.language"]}
                                  selectedItem={(value) =>
                                    handleInputChange(
                                      value,
                                      "primaryInfo.language",
                                      index
                                    )
                                  }
                                  searchUi={false}
                                  extraClassPlaceHolder={
                                    "extraClassPlaceHolderDD"
                                  }
                                  extraClassSelectedArea={"languageDropdown"}
                                  extraClassToBeSelectedArea={
                                    "dropdowndListArea"
                                  }
                                />
                              </div>
                              <div
                                // className={`"form-field__disposition" ${
                                //   clientName === "Maia Testing" &&
                                //   item["primaryInfo.flow"] === "Due_Date"
                                //     ? "disablePointerEventUniversal"
                                //     : ""
                                // }`}

                                className={`"form-field__disposition" ${
                                  (clientName === "Maia Testing" ||
                                  clientName?.includes("Demo")) &&
                                  item["primaryInfo.flow"] === "Due_Date"
                                    ? "disablePointerEventUniversal"
                                    : ""
                                }`}
                                onClick={handleDropdownClick}
                              >
                                <DropDown
                                  droplist={dropListDisposition}
                                  editedItem={
                                    item["behaviourDetails.callDisposition"]
                                  }
                                  selectedItem={(value) =>
                                    handleInputChange(
                                      value,
                                      "behaviourDetails.callDisposition",
                                      index
                                    )
                                  }
                                  maxDisplayLength={20}
                                  searchUi={false}
                                  extraClassPlaceHolder={
                                    "extraClassPlaceHolderDD"
                                  }
                                  extraClassSelectedArea={"languageDropdown"}
                                  extraClassToBeSelectedArea={
                                    "dropdowndListArea"
                                  }
                                />
                              </div>
                              <div
                                className="extra-fields-toggle"
                                onClick={(e) => handleShowMoreToggle(index, e)}
                              >
                                <img
                                  className={`expand-arrow ${
                                    showExtraFields === index
                                      ? "expanded-arrow"
                                      : ""
                                  }`}
                                  src={expandArrow}
                                  alt="expandArrow"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className={`optional__field-rows ${
                              showExtraFields !== index
                                ? "hide-extra-fields"
                                : ""
                            }`}
                          >
                            <div className="row__part2">
                              <div className="centerName">
                                {" "}
                                <div className="row__title rowTwo">
                                  Loan Info
                                </div>{" "}
                              </div>
                              <div className="part__inner-div">
                                <div className="form-field__bank-name">
                                  <input
                                    type="text"
                                    className="bank-name-input input-field"
                                    name="bank-name"
                                    placeholder="Bank Name"
                                    onChange={(e) => {
                                      handleInputChange(
                                        e.target.value,
                                        "primaryInfo.clientname",
                                        index
                                      );
                                    }}
                                    value={item["primaryInfo.clientname"]}
                                    onKeyDown={(e) =>
                                      ["+", "-", "."].includes(e.key) &&
                                      e.preventDefault()
                                    }
                                    onWheel={(e) => {
                                      return e.target.blur();
                                    }}
                                  />
                                </div>
                                <div className="form-field__bank-name">
                                  <input
                                    type="text"
                                    className="name-input input-field"
                                    name="primaryInfo.agentname"
                                    placeholder={
                                      item["primaryInfo.gender"] === "Male"
                                        ? "Female_agent_name"
                                        : "Male_agent_name"
                                    }
                                    onChange={(e) => {
                                      handleInputChange(
                                        e.target.value,
                                        "primaryInfo.agentname",
                                        index
                                      );
                                    }}
                                    value={item["primaryInfo.agentname"]}
                                    onKeyDown={(e) =>
                                      ["+", "-", "."].includes(e.key) &&
                                      e.preventDefault()
                                    }
                                    onWheel={(e) => {
                                      return e.target.blur();
                                    }}
                                  />
                                </div>
                                <div className="form-field__emi-amount">
                                  <input
                                    type="number"
                                    className="emi-input input-field"
                                    name="loanAccountDetails.emiAmount"
                                    placeholder="EMI Amount"
                                    onChange={(e) =>
                                      handleInputChange(
                                        e.target.value,
                                        "loanAccountDetails.emiAmount",
                                        index
                                      )
                                    }
                                    value={item["loanAccountDetails.emiAmount"]}
                                    onKeyDown={(e) =>
                                      ["e", "E", "+", "-", "."].includes(
                                        e.key
                                      ) && e.preventDefault()
                                    }
                                    onWheel={(e) => {
                                      return e.target.blur();
                                    }}
                                  />
                                  {/* <div className="errorDiv">
                              {item["loanAccountDetails.emiAmount"]?.length !== 10 &&
                              item["loanAccountDetails.emiAmount"]?.length !== 0 ? (
                                <ErrorMessage errorMessage="Enter 10 Digit Valid Mobile Number" />
                              ) : (
                                ""
                              )}
                            </div> */}
                                </div>
                                <div className="form-field-due-date">
                                  <input
                                    type={
                                      item["loanAccountDetails.emiDueDate"]
                                        ? "date"
                                        : "text"
                                    }
                                    placeholder="Due Date"
                                    name="loanAccountDetails.emiDueDate"
                                    onChange={(e) =>
                                      handleInputChange(
                                        e.target.value,
                                        "loanAccountDetails.emiDueDate",
                                        index
                                      )
                                    }
                                    onClick={handleCalenderClick}
                                    onBlur={handleCalenderBlur}
                                    value={
                                      item["loanAccountDetails.emiDueDate"]
                                    }
                                    className="due-date-input input-field"
                                  />
                                </div>
                                <div className="form-field-ptp-date">
                                  <input
                                    type={
                                      item["behaviourDetails.ptpDate"]
                                        ? "date"
                                        : "text"
                                    }
                                    className="ptp-date-input input-field"
                                    name="behaviourDetails.ptpDate"
                                    onClick={handleCalenderClick}
                                    onBlur={handleCalenderBlur}
                                    placeholder="PTP Date"
                                    onChange={(e) =>
                                      handleInputChange(
                                        e.target.value,
                                        "behaviourDetails.ptpDate",
                                        index
                                      )
                                    }
                                    // min={new Date().toISOString().slice(0, 10)}
                                    value={item["behaviourDetails.ptpDate"]}
                                  />
                                </div>
                              </div>
                              {(clientName === "Capri Global Testing" ||
                                clientName === "Capri Azure Testing") && (
                                <div className="part__inner-div part__inner-div2">
                                  <div
                                    className="form-field__payment_method"
                                    onClick={handleDropdownClick}
                                  >
                                    <DropDown
                                      droplist={{
                                        optionList: ["Nach", "Non-Nach"],
                                        placeHolderText: "Payment Method",
                                        imgSrcRight: downArrow,
                                      }}
                                      editedItem={item["payment_method"]}
                                      selectedItem={(value) =>
                                        handleInputChange(
                                          value,
                                          "payment_method",
                                          index
                                        )
                                      }
                                      searchUi={false}
                                      extraClassPlaceHolder={
                                        "extraClassPlaceHolderDD"
                                      }
                                      extraClassSelectedArea={
                                        "general-dropdown"
                                      }
                                      extraClassToBeSelectedArea={
                                        "dropdowndListArea"
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              {clientName ===
                                "Mannapuram Personal Loans Testing" && (
                                <div className="part__inner-div2">
                                  <div className="form-field__noOfLoans">
                                    <input
                                      type="number"
                                      className="noOfLoans input-field"
                                      name="noOfLoans"
                                      placeholder="No of Loans"
                                      onChange={(e) =>
                                        handleInputChange(
                                          e.target.value,
                                          "noOfLoans",
                                          index
                                        )
                                      }
                                      value={item["noOfLoans"]}
                                      onKeyDown={(e) =>
                                        ["e", "E", "+", "-", "."].includes(
                                          e.key
                                        ) && e.preventDefault()
                                      }
                                      onWheel={(e) => {
                                        return e.target.blur();
                                      }}
                                    />
                                    {/* <div className="errorDiv">
                              {item["loanAccountDetails.emiAmount"]?.length !== 10 &&
                              item["loanAccountDetails.emiAmount"]?.length !== 0 ? (
                                <ErrorMessage errorMessage="Enter 10 Digit Valid Mobile Number" />
                              ) : (
                                ""
                              )}
                            </div> */}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="row__part3">
                              <div className="centerName">
                                {" "}
                                <div className="row__title">
                                  {" "}
                                  <p>Customer Demography </p>
                                </div>{" "}
                              </div>

                              <div className="part__inner-div">
                                <div className="form-field__region toggle-field">
                                  <ToggleButton
                                    options={["Urban", "Rural"]}
                                    img1={[urban, urban]}
                                    img2={[rural, rural]}
                                    outSideSelected={item["primaryInfo.region"]}
                                    getSelectedData={(value) =>
                                      handleInputChange(
                                        value,
                                        "primaryInfo.region",
                                        index
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-field__gender toggle-field">
                                  <ToggleButton
                                    options={["Male", "Female"]}
                                    img1={[male, male]}
                                    img2={[female, female]}
                                    outSideSelected={item["primaryInfo.gender"]}
                                    getSelectedData={(value) =>
                                      handleInputChange(
                                        value,
                                        "primaryInfo.gender",
                                        index
                                      )
                                    }
                                  />
                                </div>
                                <div className="form-field__age">
                                  <input
                                    type="number"
                                    className="ageInput input-field"
                                    name="primaryInfo.age"
                                    placeholder="Enter Age"
                                    onChange={(e) =>
                                      handleInputChange(
                                        e.target.value,
                                        "primaryInfo.age",
                                        index
                                      )
                                    }
                                    value={item["primaryInfo.age"]}
                                    onKeyDown={(e) =>
                                      ["e", "E", "+", "-", "."].includes(
                                        e.key
                                      ) && e.preventDefault()
                                    }
                                    onWheel={(e) => {
                                      return e.target.blur();
                                    }}
                                  />
                                </div>
                                <div className="form-field__occupation toggle-field">
                                  <ToggleButton
                                    options={["Blue Collar", "White Collar"]}
                                    img1={[whiteColler, whiteColler]}
                                    img2={[normal, normal]}
                                    outSideSelected={
                                      item["primaryInfo.collared"]
                                    }
                                    getSelectedData={(value) =>
                                      handleInputChange(
                                        value,
                                        "primaryInfo.collared",
                                        index
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row__part4">
                              <div className="centerName">
                                {" "}
                                <div className="row__title">Typology</div>{" "}
                              </div>
                              <div className="part__inner-div">
                                <div
                                  className="form-field__typology"
                                  onClick={handleDropdownClick}
                                >
                                  <DropDown
                                    droplist={dropListCustomerTypology}
                                    editedItem={
                                      item["behaviourDetails.typology"]
                                    }
                                    selectedItem={(value) =>
                                      handleInputChange(
                                        value,
                                        "behaviourDetails.typology",
                                        index
                                      )
                                    }
                                    searchUi={false}
                                    extraClassPlaceHolder={
                                      "extraClassPlaceHolderDD"
                                    }
                                    extraClassSelectedArea={"typologyDropdown"}
                                    extraClassToBeSelectedArea={
                                      "dropdowndListArea"
                                    }
                                  />
                                </div>
                              </div>
                            </div>{" "}
                            {clientName === "Aadhar Housing Testing" && (
                              <div className="row__part5">
                                <div className="centerName">
                                  {" "}
                                  <div className="row__title">Other</div>{" "}
                                </div>
                                <div className="part__inner-div">
                                  <div
                                    className="form-field__status"
                                    onClick={handleDropdownClick}
                                  >
                                    <DropDown
                                      droplist={dropListStatus}
                                      editedItem={item["linkStatus"]}
                                      selectedItem={(value) =>
                                        handleInputChange(
                                          value,
                                          "linkStatus",
                                          index
                                        )
                                      }
                                      searchUi={false}
                                      extraClassPlaceHolder={
                                        "extraClassPlaceHolderDD"
                                      }
                                      extraClassSelectedArea={
                                        "typologyDropdown"
                                      }
                                      extraClassToBeSelectedArea={
                                        "dropdowndListArea"
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="remove-col">
                          <div className="remove__row">
                            <div className="minusSign">
                              <div onClick={() => handleRemoveClick(index)}>
                                -
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="container__foot">
                <div className="btnContainer">
                  <div
                    className={`exeBtn ${
                      disableBtn || isLoading
                        ? "disablePointerEventUniversaljp"
                        : ""
                    } ${isSaving ? "btn-color-modifier" : ""}`}
                    onClick={handleSaveClick}
                  >
                    <p>{isSaving ? "Saving..." : "Save"}</p>
                  </div>
                  {props.sidebarView ? (
                    ""
                  ) : (
                    <>
                      {channels?.includes("Call") && (
                        <div
                          className={`exeBtn ${
                            disableBtn || isLoading || disableExecuteBtn
                              ? "disablePointerEventUniversaljp"
                              : ""
                          } ${isExecutingCall ? "btn-color-modifier" : ""}`}
                          onClick={handleExecuteCallClick}
                        >
                          <img
                            src={isExecutingCall ? callWhite : callBlack}
                            width={"25px"}
                          ></img>
                          <p>
                            {" "}
                            {isExecutingCall ? "Executing..." : "Execute Call"}
                          </p>
                        </div>
                      )}
                      {channels?.includes("Whatsapp") && (
                        <div
                          className={`exeBtn exeBtnWhatApp ${
                            disableBtn || isLoading || disableExecuteBtn
                              ? "disablePointerEventUniversaljp"
                              : ""
                          } ${isExecutingWp ? "btn-color-modifier" : ""}`}
                          onClick={handleExecuteWpClick}
                        >
                          <img
                            src={isExecutingWp ? whatsAppWhite : whatsAppBlack}
                            width={"25px"}
                          ></img>
                          <p>
                            {" "}
                            {isExecutingWp
                              ? "Executing..."
                              : "Execute WhatsApp"}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            type="success"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            draggable={false}
            rtl={true}
          />
        </div>
      )}
    </>
  );
};

export default CampaignTestingInfo;
