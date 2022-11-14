import React, { useState, useEffect } from "react";
import axios from "axios";

import "./RazorPayTable.css";

import DownloadIcon from "../../../../../theme/assets/svg/demo/downloadBlack.svg";
import MailIcon from "../../../../../theme/assets/svg/demo/mailIcon.svg";
import Pagination from "../../../../generic/pagination/Pagination";
import Table from '../../../../generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp';
import TableConstant from './tableConstant';
import { useSelector, useDispatch } from "react-redux";

import { downloadCsvFile } from "../../../../../utils/downloadCsvFile";
import {
  CONNECTOR_PAYMENT_INFO,
  PAYMENT_INFO_URL,
} from "../../../../../services/ApiRoutes";
import {getRazorpayPaymentDetails} from "../../../../../redux/razorpay/actions"

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import * as razorpayAction from "../../../actions/razorpayActions";


import SendEmailForm from "../../../../generic/sendemailform/SendEmailForm";
import DateFilter from "../../../../generic/datefilter/DateFilter";


const RazorPayTable = (props) => {
  const [paymentData, setPaymentData] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [filePathName, setFilePathName] = useState(null);
  const [isEmailSend, setIsEmailSend] = useState(null);
  const [isFetchStatusComplete, setIsFetchStatusComplete] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [totalNoOfPage, setTotalNoOfPage] = useState();
  const [paymentDownloadData, setPaymentDownloadData] = useState();
  const [isEmailDropDownOn, setIsEmailDropDownOn] = useState(false);
  const [isUrlPaymentInfoStatus,setIsUrlPaymentInfoStatus] = useState();

  const dispatch = useDispatch()
  const userLoginInfo = useSelector(
    (store ) => store.loginReducer?.userLoginInfo
  )
  const razorpayData = useSelector(
    (store ) => store.razorpayReducer?.razorpayData
  )
  const filteredDateRangeData =  useSelector(
    (store ) => store.filterReducer?.filteredDateRangeData
  )  
 
  
  
  let accountName = userLoginInfo?.userDetail?.accountDetails[0]?.name
 

  const getAllPaymentData = async () => {
    let fromDate = filteredDateRangeData?.fromDate;
    let toDate = filteredDateRangeData?.toDate;
    if (!fromDate) {
      return;
    }

    let bodyData = {
      clientName: accountName,
      page: pageNo,
      limit: 15,
      dategte: `${fromDate}T00:00:00`,
      datelte: `${toDate}T23:59:59`,
    };


    let res = await dispatch(getRazorpayPaymentDetails(bodyData));
    if (res === undefined) {
      setIsLoading((prev) => null);
    }
    else {
      setTotalNoOfPage(res?.data?.totalPages);
      setPaymentData((prev) => res?.data?.results);
      setIsLoading((prev) => "Loaded");
    }

  };

  const getAllPaymentDownloadData = async () => {
    let fromDate = filteredDateRangeData?.fromDate;
    let toDate = filteredDateRangeData?.toDate;
    if (!fromDate) {
      return;
    }

    let downloadBodyData = {
      clientName: accountName,
      dategte: `${fromDate}T00:00:00`,
      datelte: `${toDate}T23:59:59`,
    };


    let res = await dispatch(getRazorpayPaymentDownloadData(downloadBodyData));
    if (res === undefined) {
      setIsLoading((prev) => null);
    }
    else {
      setPaymentDownloadData((prev) => res);
      // console.log(res,"999")
      setIsLoading((prev) => "Loaded");
    }
  };

  // to get payment info status- inprogress or completer
  const getPaymentInfoStatus = async () => {
    // console.log(paymentInfoName)
    const urlPaymentInfoStatus = `${CONNECTOR_PAYMENT_INFO}${PAYMENT_INFO_URL.PAYMENT_INFO_STATUS}`;
    setIsUrlPaymentInfoStatus(prev => urlPaymentInfoStatus)
    const res = await axios.get(urlPaymentInfoStatus);
    const statusOfFetch = res?.data?.data?.status;
    if (statusOfFetch === "Completed") {
      const filePathName = res?.data?.data?.filepath || null;
      // console.log(filePathName,"6666")
      setIsFetchStatusComplete("Completed");
      setFilePathName((prev) => filePathName);
    } else if (statusOfFetch === "InProgress") {
      setIsFetchStatusComplete("InProgress");
    }
  };

  const handleEmailSuccessFul = (value) => {
    setIsEmailSend(prev => value)
    setTimeout(()=>{
      setIsEmailSend(prev => null)
    },1000);
  }


  useEffect(() => {
    // alert("date");
    setPageNo(prev => 1);
    setIsLoading((prev) => null);
    getAllPaymentData();
    getAllPaymentDownloadData();
    getPaymentInfoStatus();
  }, [filteredDateRangeData]);

  useEffect(() => {
    setIsLoading((prev) => null);
    getAllPaymentData();
  }, [pageNo]);

  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
  };

  return (
    <>

      <div className="rzpayTableContainer">
        <div className="rpfunctionlityjp">
          <div className="dateFilterDiv">
            <DateFilter id="dateRangeOne" dateHeader={'show'} />
          </div>

          <div className="razorPayTableFunctionalities">
            <img
              src={DownloadIcon}
              className={`downloadIcon imgCursorPointer
              ${paymentData?.length !==0 ? "" : "disable-pointer-events"}
              `}
              alt="Download"
            onClick={() => 
              downloadCsvFile(paymentDownloadData, "Payment Data.csv")
            }
            />
            <img
              src={MailIcon}
              alt="Mail"
              className={`mailIcon imgCursorPointer disable-pointer-events`}
              // ${paymentDownloadData===null ? "" : "disable-pointer-events"}`}
              onClick={() => 
                setIsEmailDropDownOn((previousState) => !previousState)
              }
            />
            {isEmailDropDownOn ? (
              <div className="dropDownEmailComponentContainer">
              <SendEmailForm filePathName={paymentDownloadData} isEmailDropDownOn={isEmailDropDownOn} setIsEmailDropDownOn={setIsEmailDropDownOn} handleEmailSuccessFul={(value) =>handleEmailSuccessFul(value)} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="paymentTableDiv">
          <Table
            data={paymentData}
            cols={TableConstant()}
            isLoading={isLoading}
            extraStyleTableDiv= "paymenttableExtraClass"
            pageNo= {pageNo}
          />
        </div>
        <div>
          {totalNoOfPage > 1 && (
            <div style={{ paddingTop: "20px" }}>
              <Pagination
                totalNoOfPage={totalNoOfPage}
                handleClickPageNo={(value) => handleClickPageNo(value)}
                forcePage={pageNo}
              />
            </div>
          )}
        </div>
      </div>

    </>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
 
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(Object.assign({}, razorpayAction, filterAction), dispatch);
// };
export default RazorPayTable;
