import React, { useState, useEffect, useRef } from "react";

import "./OperationTable.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {getAllOperatedData ,getAllOperatedDownload} from "../../../redux/adminView/operation/actions";

import TableSaarthiJp from "../../../components/generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp";
import Pagination from "../../../components/generic/pagination/Pagination";
import { operationTableConstants } from "./operationTableContants";
import DownloadIcon from "../../../theme/assets/svg/generic/downloadBlack.svg";
import MailIcon from "../../../theme/assets/svg/adminView/mailIcon.svg";
import SendEmailForm from "../../../components/generic/sendemailform/SendEmailForm";
import MultiSelectDropdown from "../../../components/generic/multiselectdropdown/MultiSelectDropdown";
import MonthMultiselectFilter from "../../../components/generic/monthfilter/MonthMultiselectFilter";
import { downloadCsvFile } from "../../../utils/downloadCsvFile";
import { SERVER_URL, OPERATION } from "../../../services/ApiRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OperationTable = (props) => {
  let accountName = props.userLoginInfo?.userDetail?.accountDetails[0]?.name;
  const [operationData, setOperationData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [totalNoOfPage, setTotalNoOfPage] = useState();
  const [isEmailDropDownOn, setIsEmailDropDownOn] = useState(false);
  const [allClient, setAllClientList] = useState([]);
  const [selectclientName, setClientName] = useState();
  const [month, setMonth] = useState();
  const [isEmailSend, setIsEmailSend] = useState(null);
  const [operationDownloadData, setOperationDownloadData] = useState();
  const dispatch = useDispatch()
  // To get all report data with filter
  const getAllOperatedDataLocal = async () => {
    if (!month) {
      return;
    }

    let bodyData = {
      name: selectclientName,
      page: pageNo,
      limit: 17,
      // type:'External'
      dategte: month[0],
      datelte: month[1],
    };
    setIsLoading(null)
    let res = await dispatch(getAllOperatedData(bodyData));
    console.log("call 1" , res)
    if (res === undefined) {
      setIsLoading((prev) => "Loaded");
    } else {
      setTotalNoOfPage(res?.data?.totalPages);
      setOperationData((prev) => res?.data?.results);
      setIsLoading((prev) => "Loaded");
    }
  };

  //get All client Name
  useEffect( () => {
     axios.get(`${SERVER_URL}${OPERATION.GET_ALL_CLIENT}`).then((res) => {
      if (res.data) {
        let arrData = res.data.data;
       
        setAllClientList((prev) => arrData);
      }
    });
  }, []);

  // get download data
  const getAllOperationDownloadData = async () => {
    let downloadBodyData = {
      name: selectclientName,
      dategte: month[0],
      datelte: month[1],
    };

    let res = await dispatch(getAllOperatedDownload(downloadBodyData));
    if (res === undefined) {
      setIsLoading((prev) => null);
    } else {
      setOperationDownloadData((prev) => res);
      setIsLoading((prev) => "Loaded");
    }
  };

  //Email send Function SEND_EMAIL

  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
  };

  useEffect(() => {
    setIsLoading((prev) => null);
    getAllOperatedDataLocal();
  }, [pageNo]);

  useEffect(() => {
    if (month?.length) {
      setPageNo((prev) => 1);
      setIsLoading((prev) => null);
      getAllOperatedDataLocal();
    }
  }, [month]);

  useEffect(() => {
    if (month?.length || selectclientName) {
      getAllOperatedDataLocal();
      getAllOperationDownloadData();
    }
  }, [month, selectclientName]);

  // For multiselect

  const options = {
    imgSrcRight: "",
    imgSrcleft: "",
    placeHolderText: selectclientName?.length
      ? selectclientName[0] +
        (selectclientName?.length > 1
          ? "+" + (selectclientName?.length - 1)
          : "")
      : "select",
  };

  const onChangeClientName = (item) => {
    setClientName((prev) => item);
  };
  //gettiing Month from filter
  const getMonthfromFilter = (data) => {
    setMonth((prev) => data);
  };

  const handleEmailSuccessFul = (value) => {
    setIsEmailSend(prev => value)
    setTimeout(()=>{
      setIsEmailSend(prev => null)
    },1000);
  }
  useEffect(
    () => {
      if(isEmailSend?.length >0)
      toast.success(isEmailSend);

    },
    [isEmailSend]
  )
  
  let ans = operationData.sort((a, b) => {return a.clientName.localeCompare(b.clientName)}) 
  const Ref=useRef()
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if ( isEmailDropDownOn && Ref.current && !Ref.current.contains(e.target)) {
          setIsEmailDropDownOn(false)
      }
      
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isEmailDropDownOn])
  return (
    <div className="operationTableWrapperJp" >
      <div className="operationTableJp">
        <div className="operationHeaderjp">
          <div className="dropdownContainer">
            <div className="opDateRange">
              <MonthMultiselectFilter getData={getMonthfromFilter} />
            </div>
            <div>
              <MultiSelectDropdown
                options={options}
                toBeFilterData={allClient}
                extraSelectedClass="clientDropdown"
                selectedDataOutside={selectclientName}
                getFilteredData={(value) => onChangeClientName(value)}
                key="dispositionMultiSelectOne"
                isDisable={
                  props.disableFilterList?.includes("Disposition")
                    ? true
                    : false
                }
                extraPlaceHolderStyle="placeholderMultiStyleAgent"
              />
            </div>
          </div>
          <div>
            <div className="iconDownloadandEmail" ref={Ref}>
              <img
                src={DownloadIcon}
                className={`downloadIcon imgCursorPointer
              ${operationData?.length !== 0 ? "" : "disable-pointer-events"}
              `}
                alt="Download"
                onClick={() =>
                  downloadCsvFile(operationDownloadData, "Operation Data.csv")
                }
              />
              <img
                src={MailIcon}
                alt="Mail"
                className={`mailIcon imgCursorPointer ${operationData?.length !== 0 ? "" : "disable-pointer-events"}`}
                // ${paymentDownloadData===null ? "" : "disable-pointer-events"}`}
                onClick={() => 
                  setIsEmailDropDownOn((prev) => !prev)
                 }
              />
              {isEmailDropDownOn ? (
                <div className="dropDownEmailComponentContainer">
                  <SendEmailForm
                    filePathName={operationDownloadData}
                    isEmailDropDownOn={isEmailDropDownOn}
                    setIsEmailDropDownOn={(data) => setIsEmailDropDownOn(data)}
                    handleEmailSuccessFul={(value) =>
                      handleEmailSuccessFul(value)
                    }
                    operationMail = {true}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="toptabledivoperation">
          <div className="opTTableArea">
            <div>
              <TableSaarthiJp
                cols={operationTableConstants()}
                data={operationData}
                pageNo={pageNo}
                isLoading={isLoading}
                extraStyleTableDiv="operationtableExtraClass"
              />
            </div>
          </div>
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
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
    userLoginInfo: state.loginReducer?.userLoginInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      {},
      getAllOperatedData,getAllOperatedDownload
    ),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationTable);
