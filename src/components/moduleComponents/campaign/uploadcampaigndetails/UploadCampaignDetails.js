import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./UploadCampaignDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HistoryDetailsInfo from "./uploadedinfo/HistoryDetailsInfo";

//import UploadIcon from "../../../assets/uploadIcon.svg";
import UploadIcon from "./uploadFile.svg";

import callDetailsIcon from "../../../../theme/assets/svg/campaign/callingDetailsIcon.svg";
import paymentDetailsIcon from "../../../../theme/assets/svg/campaign/paymentDetailsIcon.svg";
import dunnyNoticesIcon from "../../../../theme/assets/svg/campaign/dunnyNoticesIcon.svg";
import crossIcon from "../../../../theme/assets/genericSvg/crossIcon.svg";
import whatsAppIcon from "../../../../theme/assets/svg/campaign/whatsAppDataUploadIcon.svg";
import campaignDownloadIcon from "../../../../theme/assets/svg/campaign/campaignDownload.svg";
import PaymentStatusUpdate from "../../../../utils/file/PaymentStatusUpdate.csv";
import CustomerInformationSheet from "../../../../utils/file/CustomerInformationSheet.csv";
import DunningNoticeCustomerSheet from "../../../../utils/file/DunningNoticeCustomerSheet.csv";
import DPD10 from "../../../../utils/file/DPD 10.docx";
import DPD330 from "../../../../utils/file/DPD-30.docx";
import DPD1530 from "../../../../utils/file/DPD 15-30.docx";

import DragDropFileInput from "../../../generic/dragdropfile/DragDropFileInput";

import { downloadCsvFile } from "../../../../utils/downloadCsvFile";
import { downloadDocsFile } from "../../../../utils/downloadDocsFile";

import {
  SERVER_URL_CONNECTOR,
  SERVER_REACT_APP_MAPPING_CSV,
  CAMPAIGN_URL,
  PAYMENT_URL,
  SERVER_URL_MAPPING_CSV,
} from "../../../../services/ApiRoutes";

import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as campaignAction from "../../../../redux/campaign/actions";
import * as loginAction from "../../../../redux/onboarding/login/actions";
// import * as dashboardAction from "../../../actions/dashboardActions";
import * as breadcrumActions from "../../../../redux/breadcrum/actions";

import FileMappinng from "../../../moduleComponents/campaign/filemapping/FileMappinng";
import CsvUploadModal from "../../../generic/csvUploadModal/CsvUploadModal";
import { isArray } from "lodash";
import Button from "../../../generic/button/Button";

const UploadCampaignDetails = (props) => {
  const [isShowUploadModel, setIsShowUploadModel] = useState(false);
  const [showFieldMappingModal, setShowFieldMappingModal] = useState(false);
  const [csvHeader, setCsvHeader] = useState([]);
  const [inputCsvFile, setInputCsvFile] = useState();
  const [inputDummyCsvFile, setInputDummyCsvFile] = useState();
  const [dummyFileData, setDummyFileData] = useState();
  const [inputDummyDocsFile, setInputDummyDocsFile] = useState();
  const [selectedRowData, setSelectedRowData] = useState();
  const [isShowUploadedModal, setIsShowUploadedModal] = useState(false);

  const [saarthiHeader, setSaarthiHeader] = useState([]);
  const [responseDataSaarthi, setResponseDataSaarthi] = useState([]);
  const [campaignId, setCampaignId] = useState();
  const [campaignName, setCampaignName] = useState();
  const [path, setPath] = useState("");

  const [sampleFile, setSampleFile] = useState();
  const [sampleFileName, setSampleFileName] = useState();
  const [headerByApi, setHeaderByApi] = useState();
  const [isDisable, setIsDisable] = useState(false);
  const [loop, setLoop] = useState();
  const [isUploaded, setIsUploaded] = useState(true);
  const CancelToken = Axios.CancelToken;
  const source = CancelToken.source();
  const [progress, setProgress] = useState(0);

  const breadcrumName = useSelector((store) => {
    return store.breadcrumReducer.breadcrumName;
  });

  const omniChannelData = useSelector((store) => {
    return store.omniChannelReducer.selectedOmniChannelByNavigation;
  });

  const whatsappCampaignData = useSelector((store) => {
    return store.campaignReducer?.campaignAllCampaignChannelData;
  });

  const isShowConfirm = useSelector((store) => {
    return store.campaignReducer?.isShowConfirm;
  });

  const omniReducer = useSelector((store) => {
    return store.omniChannelReducer;
  });

  useEffect(() => {
    setCallDetailsOptions((prev) => {
      return {
        ...prev,
        title:
          omniChannelData == "WhatsApp" ? "Messaging Details" : "Call Details",
      };
    });
  }, [omniChannelData]);

  const [callDetailsOptionns, setCallDetailsOptions] = useState({
    title: omniChannelData == "WhatsApp" ? "Messaging Details" : "Call Details",
    pageNo: 1,
    isLoading: null,
    data: null,
    imgLeft: callDetailsIcon,
    imgRight: UploadIcon,
    uploadId: "uploadOne",
  });

  const [paymentDetailsOptionns, setPaymentDetailsOptions] = useState({
    title: "Payment Details",
    pageNo: 1,
    isLoading: null,
    data: null,
    imgLeft: paymentDetailsIcon,
    imgRight: UploadIcon,
    uploadId: "uploadTwo",
  });

  const [dunnyDetailsOptionns, setDunnyDetailsOptions] = useState({
    title: "Dunning Notice",
    pageNo: 1,
    isLoading: null,
    data: null,
    imgLeft: dunnyNoticesIcon,
    imgRight: UploadIcon,
    uploadId: "uploadThree",
  });

  //for whatsApp omni channel
  const [whatsAppDetailsOptionns, setwhatsAppDetailsOptions] = useState({
    title: "Messaging Details",
    pageNo: 1,
    isLoading: null,
    data: null,
    imgLeft: whatsAppIcon,
    imgRight: UploadIcon,
    uploadId: "uploadOne",
  });

  let accountType = props.userLoginInfo?.accountDetails[0]?.type;

  // useEffect(()=>{
  //   if(allocationLength != PreviousAllocation){
  //     setLoop()
  //   }
  //   if(dunnyLength!= PreviousDunny){
  //     setLoop()
  //   }
  //   if(paymentLength != PreviousPayment){
  //     setLoop()
  //   }
  // },[allocationLength,dunnyLength,paymentLength])
  const history = useNavigate();

  //dataupload for whatsApp  redux
  const omniChannel = useSelector((store) => {
    return store.omniChannelReducer.selectedOmniChannelByNavigation;
  });

  const getCampaignUploadedFileInfo = async (
    upload,
    callLengthData,
    paymentLengthData,
    dunnyLengthData,
    type
  ) => {
    let dat = whatsappCampaignData
      ?.map((each) => {
        if (
          isArray(each.channels) &&
          each.channels[0] == omniReducer.selectedOmniChannelByNavigation
        ) {
          return each;
        }
      })
      .filter((o) => o);

    let id = dat?.length > 0 ? dat[0]?.id : props.campaignIdNameEdit?.id;
    // let id = props.campaignIdNameEdit?.id;
    //console.log("bhai id real" ,id ,props.campaignIdName?.id ,props.campaignIdNameEdit?.id  )
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    const res = await props.getCampaignFileUploadedList(
      id,
      tokenZx,
      history,
      accountType
    );
    res?.map((each, i) => {
      if (each.area === "Allocation") {
        const flData = each.details.map((each) => {
          return each.status;
        });
        setCallDetailsOptions((prev) => {
          return {
            ...prev,
            data: each.details,
            isLoading: "Loaded",
          };
        });
        if (upload == "upload" && type == "uploadOne") {
          if (
            each.details.length != callLengthData + 1 ||
            each.details[callLengthData].status == "In Progress"
          ) {
            //  alert(flData.includes("In Progress"))
            setTimeout(() => {
              getCampaignUploadedFileInfo(
                upload,
                callLengthData,
                paymentLengthData,
                dunnyLengthData,
                type
              );
            }, 2000);
          }
        }
      } else if (each.area === "Dunning") {
        const flData = each.details.map((each) => {
          return each.status;
        });
        setDunnyDetailsOptions((prev) => {
          return {
            ...prev,
            data: each.details,
            isLoading: "Loaded",
          };
        });
        if (upload == "upload" && type == "uploadThree") {
          if (
            each.details.length != dunnyLengthData + 1 ||
            each.details[dunnyLengthData].status == "In Progress"
          ) {
            //  alert(flData.includes("In Progress"))
            setTimeout(() => {
              getCampaignUploadedFileInfo(
                upload,
                callLengthData,
                paymentLengthData,
                dunnyLengthData,
                type
              );
            }, 2000);
          }
        }
        //  if(upload=="upload" && type=="uploadThree"){
        //   if(each.details.length != (dunnyLengthData +1)|| (flData.includes("In Progress"))){
        //     getCampaignUploadedFileInfo(upload,callLengthData,paymentLengthData,dunnyLengthData,type)
        //    }
        //  }
      } else if (each.area === "Payment") {
        const flData = each.details.map((each) => {
          return each.status;
        });
        setPaymentDetailsOptions((prev) => {
          return {
            ...prev,
            data: each.details,
            isLoading: "Loaded",
          };
        });

        if (upload == "upload" && type == "uploadTwo") {
          if (
            each.details.length != paymentLengthData + 1 ||
            each.details[paymentLengthData].status == "In Progress"
          ) {
            setTimeout(() => {
              getCampaignUploadedFileInfo(
                upload,
                callLengthData,
                paymentLengthData,
                dunnyLengthData,
                type
              );
            }, 2000);
          }
        }
      }
      setwhatsAppDetailsOptions((prev) => {
        return {
          ...prev,
          data: each.details,
          isLoading: "Loaded",
        };
      });
      // else if (each.area === "Messaging Details") {
      //   const flData = each.details.map((each) => {
      //     return each.status;
      //   });
      //   setwhatsAppDetailsOptions((prev) => {
      //     return {
      //       ...prev,
      //       data: each.details,
      //       isLoading: "Loaded",
      //     };
      //   });
      //   if (upload == "upload" && type == "uploadThree") {
      //     if (
      //       each.details.length != messageLengthData + 1 ||
      //       each.details[messageLengthData].status == "In Progress"
      //     ) {
      //       //  alert(flData.includes("In Progress"))
      //       setTimeout(() => {
      //         getCampaignUploadedFileInfo(
      //           upload,
      //           callLengthData,
      //           paymentLengthData,
      //           dunnyLengthData,
      //           messageLengthData,
      //           type
      //         );
      //       }, 2000);
      //     }
      //   }

      // }
    });
  };

  useEffect(() => {
    getCampaignUploadedFileInfo();
  }, []);

  useEffect(() => {
    let id =
      props.campaignIdNameEdit?.id?.length > 0
        ? props.campaignIdNameEdit?.id
        : whatsappCampaignData?.id;
    if (id?.length > 0) {
      props.storedCSVData(id);
    }
  }, [props.campaignIdNameEdit, whatsappCampaignData]);

  useEffect(() => {
    setCallDetailsOptions((prev) => {
      return {
        ...prev,
        isLoading: null,
      };
    });
    getCampaignUploadedFileInfo();
  }, [omniReducer.selectedOmniChannelByNavigation]);

  // to download csv file

  const downloadSampleFileFetchCsv = async () => {
    const response = await fetch(sampleFile);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);
    downloadCsvFile(csv, sampleFileName);
  };

  // to download docs file
  const downloadSampleDocFileFetchCsv = async () => {
    const responseOne = await fetch(DPD10);
    const readerOne = responseOne.body.getReader();
    const resultOne = await readerOne.read();
    const decoderOne = new TextDecoder("utf-8");
    const csvOne = await decoderOne.decode(resultOne.value);
    downloadDocsFile(csvOne, "DPD 10");

    const responseTwo = await fetch(DPD330);
    const readerTwo = responseTwo.body.getReader();
    const resultTwo = await readerTwo.read();
    const decoderTwo = new TextDecoder("utf-8");
    const csvTwo = await decoderTwo.decode(resultTwo.value);
    downloadDocsFile(csvTwo, "DPD 30");

    const responseThree = await fetch(DPD1530);
    const readerThree = responseThree.body.getReader();
    const resultThree = await readerThree.read();
    const decoderThree = new TextDecoder("utf-8");
    const csvThree = await decoderThree.decode(resultThree.value);
    downloadDocsFile(csvThree, "DPD 15-30");
  };

  // To Upload dummy notices
  const handleUploadDummyNotics = async () => {
    setIsUploaded(false);
    var formData = new FormData();
    formData.append("uploadFile", inputDummyCsvFile);
    formData.append("uploadFile", inputDummyDocsFile);
    let accountNam = props.userLoginInfo?.userDetail?.accountDetails[0]?.name;
    formData.append("accountName", accountNam);
    formData.append("remarks", "health issue");
    formData.append("area", "dunning");
    let cMIdTemp = props.userLoginInfo?.userDetail?.accountDetails[0]?.name;
    let dat = whatsappCampaignData
      ?.map((each) => {
        if (
          isArray(each.channels) &&
          each.channels[0] == omniReducer.selectedOmniChannelByNavigation
        ) {
          return each;
        }
      })
      .filter((o) => o);

    let fId = dat?.length > 0 ? dat[0]?.id : props.campaignIdNameEdit?.id;
    formData.append("campaignManagerId", fId);
    let payload = formData;

    const createDunnyUrl = `${SERVER_URL_CONNECTOR}${PAYMENT_URL.CREATE_DUNNY_NOTICES}`;
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    const options = {
      url: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerUploadInfo/v1/uploadCsv`,

      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
      headers: {
        "Content-Type": "application/json",
        "x-access-token": tokenZx,
      },
      cancelToken: source.token,
      method: "post",
    };
    setIsShowUploadedModal((prev) => true);
    await Axios(options)
      .then((res) => {
        if (res?.data) {
          toast.success("CSV uploaded successfully");
          getCampaignUploadedFileInfo(
            "upload",
            callDetailsOptionns.data?.length,
            paymentDetailsOptionns.data?.length,
            dunnyDetailsOptionns.data?.length,
            props.typeUploadClick
          );

          setIsShowUploadModel(false);
        }
      })
      .catch((err) => {
        toast.error("CSV uploading is not successfull");
      });
  };

  const filechange = (e) => {
    setInputCsvFile(e.target.files[0]);
    setDummyFileData("");
    if (e.target.files[0].name) {
      setIsDisable(true);
    }
    // setInputfile(prev => e.target?.files[0]?.name ? e.target?.files[0]?.name : props.label);
  };

  const handleDragDropFile = (file) => {
    var formData = new FormData();
    formData.append("uploadFile", file);
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;

    let headers = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": tokenZx,
      },
    };
    props.getCSVHeaders(formData, headers);
    setInputCsvFile((prev) => file);
    setDummyFileData("");
  };

  const handleDragDropFileTemplate = (file) => {
    setInputDummyDocsFile((prev) => file);
  };
  const handleDragDropDunnyCsvFile = (file) => {
    setInputDummyCsvFile((prev) => file);
    setDummyFileData((prev) => file);
  };

  const handleCloseDragDropModel = () => {
    setIsShowUploadModel((prev) => false);
  };

  const handleCloseUploadedDetailsModal = () => {
    setIsShowUploadedModal((prev) => false);
  };

  const closeAdminModal = (list) => {
    setShowFieldMappingModal(false);
    setResponseDataSaarthi(list);
  };

  const openAdminModal = () => {
    // document.getElementById('fileButton').click();
    // document.getElementById('fileButton').onchange = () => {
    //     console.log(document.getElementById('fileButton').value)
    //     setPath(document.getElementById('fileButton').files[0])
    //     CSVImportGetHeaders(document.getElementById('fileButton').files[0])
    // }
    setPath((prev) => inputCsvFile);
    // if(props.csvHeaderDataList?.length>0){
    setCsvHeader((prev) => props.csvHeaderDataList);

    setShowFieldMappingModal(true);

    // }

    // CSVImportGetHeaders(inputCsvFile);
  };

  useEffect(() => {
    if (props.csvHeaderDataList?.length > 0) {
      setCsvHeader((prev) => props.csvHeaderDataList);
    }
  }, [props.csvHeaderDataList]);

  function CSVImportGetHeaders(data) {
    let file = data;
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function (evt) {
      let data = evt.target.result;
      let byteLength = data.byteLength;
      let ui8a = new Uint8Array(data, 0);
      let headerString = "";
      for (let i = 0; i < byteLength; i++) {
        let char = String.fromCharCode(ui8a[i]);

        // if (char.match(/[^\r\n]+/g) !== null) {
        if (char.match(/[^\r]/) !== null) {
          headerString += char;
        } else {
          break;
        }
      }

      // Split our header string into an array
      window.headers = headerString.split(",");
      let dat = window.headers
        .map((each) => {
          if (each.length > 0) {
            return each.replace(/['"]+/g, "");
          } else {
            return "";
          }

          // .replace(/[^a-zA-Z ]/g, "");
        })
        .filter((e) => e);

      if (dat) {
        // setCsvHeader(prev=>dat);
        setShowFieldMappingModal(true);
      }
    };
  }

  //   useEffect(()=>{
  //     if(jobFetchStatus=="Completed"){
  //         clearInterval(loop);
  //         setLoop()
  //         getListDetails()
  //     }

  // },[jobFetchStatus])

  useEffect(() => {
    if (inputCsvFile) {
      if (accountType != "External" && breadcrumName != "Data Upload") {
        openAdminModal();
      } else {
        var formData = new FormData();
        var area =
          props.typeUploadClick == "uploadOne"
            ? "allocation"
            : props.typeUploadClick == "uploadTwo"
            ? "payment"
            : "";
        formData.append("uploadFile", inputCsvFile);
        let dat = whatsappCampaignData
          ?.map((each) => {
            if (
              isArray(each.channels) &&
              each.channels[0] == omniReducer.selectedOmniChannelByNavigation
            ) {
              return each;
            }
          })
          .filter((o) => o);

        let fId = dat?.length > 0 ? dat[0]?.id : props.campaignIdNameEdit?.id;
        formData.append("campaignManagerId", fId);
        formData.append("area", area);
        formData.append("userType", accountType);
        let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
        const options = {
          url: `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerUploadInfo/v1/uploadCsv`,

          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            let percent = Math.floor((loaded * 100) / total);
            setProgress(percent);
          },
          data: formData,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": tokenZx,
          },
          cancelToken: source.token,
          method: "post",
        };
        setIsShowUploadedModal((prev) => true);
        let payload = formData;
        let headers = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": tokenZx,
          },
        };
        Axios.post(
          `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerUploadInfo/v1/uploadCsv`,
          payload,
          options,
          {
            cancelToken: source.token,
          },
          headers
        )
          .then((res) => {
            if (res?.data?.data?.error) {
              toast.error(res?.data?.data?.error);
            } else {
              toast.success("CSV uploaded successfully");
              props.updateData("Data Mapping");
              getCampaignUploadedFileInfo(
                "upload",
                callDetailsOptionns.data?.length,
                paymentDetailsOptionns.data?.length,
                dunnyDetailsOptionns.data?.length,
                props.typeUploadClick
              );
            }
          })
          .catch((err) => {
            toast.error("CSV upload unsuccessfull");
          });
      }

      handleCloseDragDropModel();
    }
  }, [inputCsvFile]);

  const getSaarthiheaderlist = (list) => {
    // props.setsaarthiHeaderList(list);
    console.log(list)
  };

  const getCsvheaderlist = (list) => {
    props.setCsvHeaderList("CSV_HEADER", list);
  };

  const getCSVdata = (data, isNew, list, resetList) => {
    var formData = new FormData();
    let dat = whatsappCampaignData
      ?.map((each) => {
        if (
          isArray(each.channels) &&
          each.channels[0] == omniReducer.selectedOmniChannelByNavigation
        ) {
          return each;
        }
      })
      .filter((o) => o);
    console.log(dat, whatsappCampaignData, "test");
    let fId = dat?.length > 0 ? dat[0]?.id : data.campaignManagerId;
    var storeMappedData = {
      campaignManagerId: fId,
      action:
        props.typeUploadClick === "uploadOne"
          ? "Allocation"
          : props.typeUploadClick === "uploadTwo"
          ? "Payment"
          : "",
      mapping: {
        csvHeaders: list["csv header"],
        saarthiHeaders: list["saarthi header"],
      },
    };
    let pathData =
      selectedRowData?.uploadCsvPath[0]?.length > 0
        ? selectedRowData.uploadCsvPath[0]
        : selectedRowData?.downloadablePath
        ? [selectedRowData.downloadablePath]
        : "";
    Object.entries(data)?.map((each, i) => {
      if (each[0] == "uploadFile" && isNew == "new") {
        formData.append("uploadFile", each[1]);
      } else if (each[0] == "uploadFile") {
        formData.append("uploadFile", pathData);
        formData.append("customerUploadInfoId", selectedRowData.id);
      } else {
        formData.append(each[0], each[1]);
      }
    });
    let payload = formData;
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    let headers = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": tokenZx,
      },
    };
    let uploadCsvUrl;
    if (props.typeUploadClick === "uploadOne") {
      formData.append("area", "Allocation");
      uploadCsvUrl =
        isNew == "new"
          ? `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/customerInfo/v1/create`
          : `${SERVER_REACT_APP_MAPPING_CSV}${CAMPAIGN_URL.UPLOAD_CSV_CAMPAIGN}`;
    } else if (props.typeUploadClick === "uploadTwo") {
      uploadCsvUrl =
        isNew == "new"
          ? `https://${process.env.REACT_APP_CONNECTOR}/campaign/api/campaignManagement/paymentDetails/v1/update`
          :`${SERVER_REACT_APP_MAPPING_CSV}${PAYMENT_URL.UPLOAD_CSV_PAYMENT}`;
          // : `${SERVER_URL_CONNECTOR}${PAYMENT_URL.UPLOAD_CSV_PAYMENT}`;
    }

    props.storeMappedData(storeMappedData);
    const options = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    };

    Axios.post(uploadCsvUrl, payload, options, {
      cancelToken: source.token,
      headers: headers,
    })
      .then((res) => {
        if (res?.data) {
          toast.success("CSV uploaded successfully");
          props.goToCallingList("true");
          // uoioioioiio
          // setIsShowUploadedModal((prev) => true);
          getCampaignUploadedFileInfo(
            "upload",
            callDetailsOptionns.data?.length,
            paymentDetailsOptionns.data?.length,
            dunnyDetailsOptionns.data?.length,
            props.typeUploadClick
          );
          setShowFieldMappingModal((prev) => false);
        }
        closeAdminModal(resetList);
      })
      .catch((err) => {
        closeAdminModal(resetList);
        toast.error("CSV uploading is not successfull");
      });
  };

  const getAllData = async () => {
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    const typeUpload = props.typeUploadClick;
    const res = await props.getSaarthiHeaderList(typeUpload, tokenZx);
    if (props.typeUploadClick === "uploadOne") {
      let filteredHeader = res?.map((each) => {
        return Object.keys(each);
      });
      setSaarthiHeader((prev) => filteredHeader);
    } else if (props.typeUploadClick === "uploadTwo") {
      setSaarthiHeader((prev) => res);
    }

    if (res?.length > 0) {
      setResponseDataSaarthi([...res]);
    }
  };

  const storeSelectedData = (data) => {
    setSelectedRowData((prev) => data);
  };

  useEffect(() => {
    if (props.typeUploadClick === "uploadOne") {
      setSampleFile((prev) => CustomerInformationSheet);
      setSampleFileName((prev) => "Customer Information Sheet");
    } else if (props.typeUploadClick === "uploadTwo") {
      setSampleFile((prev) => PaymentStatusUpdate);
      setSampleFileName((prev) => "Payment Information Sheet");
    } else if (props.typeUploadClick === "uploadThree") {
      setSampleFile((prev) => DunningNoticeCustomerSheet);
      setSampleFileName((prev) => "Dunning Notice Customer Sheet");
    }

    getAllData();
  }, [props.typeUploadClick]);

  const setCsvHeaderToMap = (data) => {
    setCsvHeader((prev) => data?.data);
  };

  useEffect(() => {
    if (inputDummyCsvFile && inputDummyDocsFile) {
      setIsUploaded(true);
    }
  }, [inputDummyCsvFile && inputDummyDocsFile]);

  const saveTypeOfUploadClick = () => {
    if (props.typeUploadClick === "Allocation") {
      props.setUploadType("uploadOne");
    } else if (props.typeUploadClick === "Payment") {
      props.setUploadType("uploadTwo");
    } else {
      props.setUploadType("Dunning");
    }
  };
  const selectedTab = useSelector((store) => {
    return store.breadcrumReducer.tabName;
  });

  const submitData = () => {
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    props.sendApiDetails(isShowConfirm.data, tokenZx).then((res) => {
      toast.success("Uploaded successfully");
      props.goToCallingList("true");
      props.tabSelected("");
    });
  };

  return (
    <>
      <div className="uploadCampaignDetailsWrapper">
        {((isShowUploadModel && !showFieldMappingModal) ||
          isShowUploadedModal) && (
          <div className="showingModal">
            <div className="uPLCampaignmodelPosition">
              <div className="DragDropModel">
                <div className="dragDropModelHeader">
                  <div>
                    <img
                      src={crossIcon}
                      alt="close icon"
                      className="clickAbleCursorPointerU"
                      onClick={() => {
                        if (isShowUploadedModal) {
                          handleCloseUploadedDetailsModal();
                        } else {
                          handleCloseDragDropModel();
                        }
                      }}
                    />
                  </div>
                  <div className="sampleFileUCD">
                    <div
                      className="downloadIconModel"
                      onClick={() => downloadSampleFileFetchCsv()}
                    >
                      <img
                        src={campaignDownloadIcon}
                        className="clickAbleCursorPointerU"
                        alt="close icon"
                      />
                      <p style={{ fontSize: "10px" }}>
                        {props.typeUploadClick === "uploadThree"
                          ? "Download Allocation Sample"
                          : "Download Sample File"}
                      </p>
                    </div>{" "}
                    &nbsp;&nbsp;&nbsp;
                    {
                      props.typeUploadClick === "uploadThree" && (
                        // <a href="../../../assets/delete.png" download="jai.png">
                        <div
                          className="downloadIconModel"
                          onClick={() => downloadSampleDocFileFetchCsv()}
                        >
                          <img
                            src={campaignDownloadIcon}
                            className="clickAbleCursorPointerU"
                            alt="close icon"
                          />
                          <p style={{ fontSize: "10px" }}>
                            Download Dunning sample
                          </p>
                        </div>
                      )
                      // </a>
                    }
                  </div>
                </div>
                {isShowUploadedModal && !showFieldMappingModal ? (
                  <>
                    <div className="">
                      <div>
                        {/* <img src={uploadIcon} onClick={() => saveTypeOfUploadClick()}/> */}
                      </div>
                      <div className="csv-upload-md">
                        <CsvUploadModal
                          fileName={
                            inputDummyCsvFile
                              ? inputDummyCsvFile.name
                              : inputCsvFile?.name
                          }
                          percentage={progress}
                        />
                      </div>
                    </div>
                    <div className={`positionFromTop`}>
                      {props.typeUploadClick != "uploadThree" ? (
                        <label
                          className="custom-file-upload"
                          onClick={() => {
                            handleCloseUploadedDetailsModal();
                            if (accountType == "External") {
                              props.goToCallingList("true");
                            }
                          }}
                        >
                          <p>Done</p>
                        </label>
                      ) : (
                        <label
                          className={`custom-file-upload`}
                          onClick={() => {
                            handleCloseUploadedDetailsModal();
                            setInputDummyCsvFile((prev) => "");
                            setInputDummyDocsFile((prev) => "");
                            if (accountType == "External") {
                              props.goToCallingList("true");
                            }
                          }}
                        >
                          <p>Done</p>
                        </label>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dragDropAreaModel">
                      {props.typeUploadClick === "uploadThree" ? (
                        <>
                          <DragDropFileInput
                            dragdropfile={(file) =>
                              handleDragDropFileTemplate(file)
                            }
                            titleDunny={"Upload Dunning Templates"}
                            docTrue={true}
                          />
                          <DragDropFileInput
                            dragdropfile={(file) =>
                              handleDragDropDunnyCsvFile(file)
                            }
                            titleDunny={"Allocation File"}
                          />
                        </>
                      ) : (
                        <DragDropFileInput
                          dragdropfile={(file) => handleDragDropFile(file)}
                        />
                      )}
                    </div>
                    <div className={`positionFromTop`}>
                      {props.typeUploadClick != "uploadThree" ? (
                        <label className="custom-file-upload">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.0676 17.0014H25.9933V23.1968C25.9933 23.8129 25.745 24.4039 25.3034 24.8397C24.8616 25.2753 24.2625 25.5202 23.6377 25.5202H3.22376C2.59905 25.5202 1.99986 25.2753 1.55807 24.8397C1.11646 24.4039 0.868164 23.813 0.868164 23.1968V17.0014H4.79393V21.6479H22.0673L22.0676 17.0014ZM7.95585 8.86221H11.0756V18.5503H15.7865V8.86221H18.9063C19.0587 8.86059 19.1977 8.77596 19.2674 8.64218C19.3371 8.50857 19.326 8.34777 19.2387 8.22461L13.8918 0.970896C13.7844 0.825946 13.6132 0.740234 13.4312 0.740234C13.2491 0.740234 13.0779 0.825946 12.9706 0.970896L7.62357 8.22461C7.53631 8.34777 7.52517 8.50857 7.59491 8.64218C7.66465 8.77596 7.80357 8.86059 7.95602 8.86221H7.95585Z"
                              fill="white"
                            />
                          </svg>
                          <input
                            type="file"
                            id="tju"
                            onChange={(e) => {
                              filechange(e);
                            }}
                            accept=".csv"
                          />
                          <p>Upload</p>
                        </label>
                      ) : (
                        <label
                          className={`custom-file-upload ${
                            inputDummyCsvFile && inputDummyDocsFile
                              ? isUploaded
                                ? ""
                                : "disablePointerEventUniversaljp"
                              : "disablePointerEventUniversaljp"
                          }`}
                          onClick={() => {
                            handleUploadDummyNotics();
                          }}
                        >
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.0676 17.0014H25.9933V23.1968C25.9933 23.8129 25.745 24.4039 25.3034 24.8397C24.8616 25.2753 24.2625 25.5202 23.6377 25.5202H3.22376C2.59905 25.5202 1.99986 25.2753 1.55807 24.8397C1.11646 24.4039 0.868164 23.813 0.868164 23.1968V17.0014H4.79393V21.6479H22.0673L22.0676 17.0014ZM7.95585 8.86221H11.0756V18.5503H15.7865V8.86221H18.9063C19.0587 8.86059 19.1977 8.77596 19.2674 8.64218C19.3371 8.50857 19.326 8.34777 19.2387 8.22461L13.8918 0.970896C13.7844 0.825946 13.6132 0.740234 13.4312 0.740234C13.2491 0.740234 13.0779 0.825946 12.9706 0.970896L7.62357 8.22461C7.53631 8.34777 7.52517 8.50857 7.59491 8.64218C7.66465 8.77596 7.80357 8.86059 7.95602 8.86221H7.95585Z"
                              fill="white"
                            />
                          </svg>
                          <p>Upload</p>
                        </label>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {/* {isShowUploadedModal &&
           (
            <div className="showingModal">
              <div className="uPLCampaignmodelPosition">
                <div className="DragDropModel">
                  <div className="">
                    <div>
                      <img
                        src={crossIcon}
                        alt="close icon"
                        className="clickAbleCursorPointerU"
                        onClick={() => handleCloseUploadedDetailsModal()}
                      />
                    </div>
                    <div className="csv-upload-md">
                      <CsvUploadModal  percentage={progress}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        } */}

        {showFieldMappingModal && (
          <div className="showingModal">
            <div className="uPLHeaderMappingmodelPosition">
              {/* <MappingPart /> */}
              <FileMappinng
                onClose={(list) => {
                  closeAdminModal(list);
                }}
                csvHeaderData={csvHeader?.length > 0 ? csvHeader : []}
                saarthiHeaderData={saarthiHeader}
                saarthiHeaderList={(list) => {
                  getSaarthiheaderlist(list);
                }}
                csvHeaderList={(list) => {
                  getCsvheaderlist(list);
                }}
                saarthiList={props.saarthiHeader}
                csvList={props.csvHeader}
                uploadCSV={(data, status, list, resetList) => {
                  getCSVdata(data, status, list, resetList);
                }}
                path={path}
                editData={props.EditData}
                campaignId={props.campaignIdNameEdit?.id}
                responseData={responseDataSaarthi}
              />
            </div>
          </div>
        )}
        {selectedTab == "API" && (
          <div className="api-int">
            <div className="header-data">{props.demoApiPage? "":"API"}</div>
            <div className="campaign-name">
              Campaign Name - {whatsappCampaignData[0].campaignNameInternal}
            </div>
          </div>
        )}
        {omniChannel == "Call" ? (
          <div className="uploadCampaignDetailsArea">
            <div className="uploadCampaignDetailsChild">
              <HistoryDetailsInfo
                options={callDetailsOptionns}
                uploadClick={() => {
                  setIsShowUploadModel((prev) => true);
                }}
                mappingModal={() => {
                  setShowFieldMappingModal((prev) => true);
                }}
                getHeader={(data) => setCsvHeaderToMap(data)}
                getSelectedData={(data) => {
                  storeSelectedData(data);
                }}
                channel="allocation"
              />
            </div>
            <div className="uploadCampaignDetailsChild">
              <HistoryDetailsInfo
                options={paymentDetailsOptionns}
                uploadClick={() => {
                  setIsShowUploadModel((prev) => true);
                }}
                mappingModal={() => {
                  setShowFieldMappingModal((prev) => true);
                }}
                getHeader={(data) => setCsvHeaderToMap(data)}
                getSelectedData={(data) => {
                  storeSelectedData(data);
                }}
                channel="payment"
              />
            </div>
            <div className="uploadCampaignDetailsChild">
              <HistoryDetailsInfo
                options={dunnyDetailsOptionns}
                uploadClick={() => {
                  setIsShowUploadModel((prev) => true);
                }}
                mappingModal={() => {
                  setShowFieldMappingModal((prev) => true);
                }}
                getHeader={(data) => setCsvHeaderToMap(data)}
                getSelectedData={(data) => {
                  storeSelectedData(data);
                }}
                channel="dunning"
              />
            </div>
          </div>
        ) : (
          <div className="uploadCampaignDetailsArea">
            <div className="uploadCampaignDetailsChild">
              <HistoryDetailsInfo
                options={callDetailsOptionns}
                uploadClick={() => {
                  setIsShowUploadModel((prev) => true);
                }}
                mappingModal={() => {
                  setShowFieldMappingModal((prev) => true);
                }}
                getHeader={(data) => setCsvHeaderToMap(data)}
                getSelectedData={(data) => {
                  storeSelectedData(data);
                }}
                channel="allocation"
              />
            </div>

            <div className="uploadCampaignDetailsChild">
              <HistoryDetailsInfo
                options={dunnyDetailsOptionns}
                uploadClick={() => {
                  setIsShowUploadModel((prev) => true);
                }}
                mappingModal={() => {
                  setShowFieldMappingModal((prev) => true);
                }}
                getHeader={(data) => setCsvHeaderToMap(data)}
                getSelectedData={(data) => {
                  storeSelectedData(data);
                }}
                channel="dunning"
              />
            </div>
          </div>
        )}
        {selectedTab == "API" && isShowConfirm?.isShow && (
          <div className="set-btn">
            <Button
              text="Confirm"
              extraClass="btnNext"
              onClick={() => submitData()}
            />
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    typeUploadClick: state.campaignReducer?.typeUploadClick,
    csvHeader: state.campaignReducer?.csvHeader,
    saarthiHeader: state.campaignReducer?.saarthiHeader,
    campaignIdName: state.campaignReducer?.campaignIdName,
    userLoginInfo: state.loginReducer.userLoginInfo,
    campaignIdNameEdit: state.campaignReducer?.campaignIdNameEdit,
    campaignEditUpdateType: state.campaignReducer?.campaignEditUpdateType,
    csvHeaderDataList: state.campaignReducer.csvHeaderDataList,
    uploadedFileName: state.campaignReducer?.uploadedCamapignFile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      {},
      campaignAction,
      loginAction,
      breadcrumActions
    ),
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCampaignDetails);

//export default UploadCampaignDetails;
