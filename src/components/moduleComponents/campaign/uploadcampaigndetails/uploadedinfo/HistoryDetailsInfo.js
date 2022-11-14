import React, { useEffect, useState } from "react";
import "./HistoryDetailsInfo.css";

import TableByJp from "../../../../generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp";
import UploadFile from "../uploadfile/UploadFile";
import { callDetailsTableConstants } from "./historyDetailsInfoTableConstants";
import {ApiTableConstants} from "./ApiTableConstants";

import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as campaignAction from "../../../../../redux/campaign/actions";
import * as breadCrumActions from "../../../../../redux/breadcrum/actions";
// import fileNodataImg from "../../../../../theme/assets/svg/campaign/uploadFileNodata.svg";
import axios from "axios";
import { isArray } from "lodash";
import { ToastContainer, toast } from "react-toastify";
//import TableSaarthiJp from "../../../../components/widlyuse/TableSaarthiJp/TableSaarthiJpFi/TableSaarthiJp";

const HistoryDetailsInfo = (props) => {
  const [optionsProps, setPropsOption] = useState();
  const [responseData, setResponceData] = useState();
  const [csvHeader, setCsvHeader] = useState([]); 
  const [pushedApiData, setPushedApiData] = useState();
  const [pushedApiDataIndex, setPushedApiDataIndex] = useState();
  const [CSVList,setSelectedCSVList]=useState({allocation:[],payment:[],dunning:[]});
  const accountType = window.sessionStorage.getItem("userType");
    const [isShowConfirm,setIsShowConfirm]=useState(false)

    const campaignDataAllInfo = useSelector((store) => {
      return store.campaignReducer?.campaignAllCampaignChannelData;
    });

   

    const csvList=useSelector((store)=>{
      return store.breadcrumReducer.csvList
    })

    useEffect(()=>{
      props.storeAPICSVList(CSVList)
    },[CSVList])

  useEffect(() => {
    setPropsOption((prev) => props.options);
  }, [props.options]);

  const headerUpload = {
    imgLeft: optionsProps?.imgLeft,
    imgRight: optionsProps?.imgRight,
    title: optionsProps?.title,
    uploadId: optionsProps?.uploadId,
  };
  const breadcrumName = useSelector((store) => {
    return store.breadcrumReducer.breadcrumName;
  });

  const downloadcsvFunc = (path, fileName) => {
    if (path) {
      var link = document.createElement("a");
      link.download = fileName;
      link.href = path;
      document.body.appendChild(link);
      link.click();
    }
  };
  const downloadIdFun = (path, fileName) => {
    if (path) {
      var link = document.createElement("a");
      link.download = fileName;
      link.href = path;
      document.body.appendChild(link);
      link.click();
    }
  };
  const saveTypeOfUploadClick = (rowdata) => {
    if (rowdata.area === "Allocation") {
      props.setUploadType("uploadOne");
    } else if (rowdata.area === "Payment") {
      props.setUploadType("uploadTwo");
    } else {
      props.setUploadType("Dunning");
    }
  };
  const tomap = (data, rowdata) => {
    props.getSelectedData(rowdata);

    let obj = {
      url: data?.[0],
    };

    axios
      .post(
        `https://${process.env.REACT_APP_CONNECTOR}/api/tools/v1/fetchCsvData`,
        obj
      )
      .then((resp) => {
        setResponceData((prev) => resp?.data);
      })
      .catch((err) => console.log(err));
    props.mappingModal();
    saveTypeOfUploadClick(rowdata);
  };

  const handleCSVData=(data,channel)=>{
    console.log("tempArr")
    let tempArr=Object.assign({},csvList)
        // if(tempArr.map((e)=>{
        //      if(e.actualDay==data.actualDay && e.actualMonth == data.actualMonth && e.dayOfTheYear== data.dayOfTheYear && e.hour == data.hour && e.intervalStart == data.intervalStart && e.year== data.year ){
        //         return e
        //      }
        // })?.length>0){
        //   let tval=tempArr.map((item) => {
            // if(item.actualMonth == data.actualMonth ||
            // item.actualDay == data.actualDay &&
            // item.dayOfTheYear == data.dayOfTheYear &&
            // item.hour == data.hour &&
            // item.intervalStart == data.intervalStart &&
            // item.year == data.year
            // ){
            //     return ""
            // }else{
            //     return item
            // }}).filter(e=>e)
            // console.log(tval)

        if(tempArr[channel].includes(data)){
            let index=tempArr[channel].indexOf(data)
            if(index>-1){
              tempArr[channel].splice(index,1)
            }

          setSelectedCSVList(prev=>{return {...tempArr,[channel]:tempArr[channel]}})
        }else{
          tempArr[channel].push(data)
            setSelectedCSVList(prev=>{return {...tempArr,[channel]:tempArr[channel]}})
            console.log(tempArr)
            // setSelectedCSVList(prev=>tempArr)
        }


  }
  const submitData=()=>{

  }

  const pushApiDataCsvDownload=useSelector((store)=>{
    return store.campaignReducer?.pushApiDataCsvDownload;
  })

  const downloadCsvFileAuto = async (bodyData,index) =>{ 
    let accountId = props?.userLoginInfo?.userDetail?.accountDetails[0]?.id
    bodyData['accountId']= accountId

    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    let resForCsv =  await props.getAllReportCsvPushData(bodyData,tokenZx);
    setPushedApiData({...resForCsv});
    setPushedApiDataIndex(index)
    toast.success("We are processing csv file. It will take some time. Please don't close tab");
  }


  useEffect(() =>{
    setPushedApiData((prev) => pushApiDataCsvDownload);
  },[pushApiDataCsvDownload?.sessionInfo?.status])

  useEffect(()=>{
    let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
    let data={
      // accountId:"62e8fd39b667707db671c276",
             accountId:dat&&dat[0]?.accountId,
             "campaignId": dat && dat[0]?.id,
             "payment": CSVList.payment,
             "allocation": CSVList.allocation,
             "dunning": CSVList.dunning
         }

    if(CSVList["allocation"].length>0 ||CSVList["payment"].length>0 || CSVList["dunning"].length>0 ){
        setIsShowConfirm(prev=>true)
        props.isShowConfirm({data:data,isShow:true})
    }else{
        props.isShowConfirm({data:data,isShow:false})
    }

  },[CSVList])

  const omniReducer = useSelector((store)=>{
    return store.omniChannelReducer
  })

  const whatsappCampaignData=useSelector((store) => {
    return store.campaignReducer?.campaignAllCampaignChannelData;
  });

  const campaignData=useSelector((store)=>{
    return store.campaignReducer?.callingDetailsData;
  })

  let dat=whatsappCampaignData?.map((each)=>{
    if(isArray(each?.channels) &&each?.channels?.[0]==omniReducer?.selectedOmniChannelByNavigation){
      return each
    }
  }).filter(o=>o)

//   const getListOfUploadedCSV=()=>{
//     // let accountId=props?.userLoginInfo?.userDetail?.accountDetails?.[0]?.id;
//     // let accountId="62e8fd39b667707db671c276"
//    //getting client id from list
//    const selectedCliet=props.selectedClientName;
//    const id=props.allClientInfo?.find(e=>e?.name==selectedCliet)?.id

// let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
// // props.getUploadedCSV(accountId,tokenZx,0,0)
// props.getUploadedCSV(id,tokenZx,1,0)
//   }
  const getListOfUploadedCSV=()=>{
    // let accountId=props?.userLoginInfo?.userDetail?.accountDetails?.[0]?.id;
    let accountId = campaignDataAllInfo?.[0]?.accountId
    // let accountId="62e8fd39b667707db671c276"
   //getting client id from list
   const selectedCliet=props.selectedClientName;
   const id=props.allClientInfo?.find(e=>e.name==selectedCliet)?.id

let tokenZx = props?.userLoginInfo?.userSessionDetails?.accessToken;
// props.getUploadedCSV(accountId,tokenZx,0,0)
  if(id){props.getUploadedCSV(id,tokenZx,1,0)} 
  else {
    props.getUploadedCSV(accountId,tokenZx,1,0)
  }
 
  }
  const selectedTab=useSelector((store)=>{
    return store.breadcrumReducer.tabName
  })

  useEffect(() => {
    if (responseData) {
      props.getHeader(responseData);
    }
  }, [responseData]);

  useEffect(()=>{
    getListOfUploadedCSV()
  },[])

  console.log(CSVList,"popo")
  return (
    <>
      <div className="callDetailsInfoWrapper">
        <div className="historyDetailsInfoDiv">
          <div className="callDIHeader">
            <UploadFile
              label={headerUpload}
              uploadClick={() => {
                props.uploadClick();
              }}
            />
          </div>
          <div className="callDITable">
            {console.log(
              optionsProps?.title,
              optionsProps?.data,
              optionsProps?.isLoading,
              "ittt"
            )}
            {/* {optionsProps?.data?.length >0? */}
            {selectedTab != "API"?
            <TableByJp
              cols={callDetailsTableConstants(
                downloadcsvFunc,
                downloadIdFun,
                tomap,
                accountType,
                breadcrumName
              )}
              data={optionsProps?.data}
              pageNo={optionsProps?.pageNo}
              isLoading={optionsProps?.isLoading}
              extraTableTheadClass="extraStyleTheadHDI"
              theadTrExtraStyle="theadTrExtraStyleHDI"
              trThExtraStyle="trThExtraStyleHDI"
              tbodytrExtraStyle="trThExtraStyleHDI"
              tbodytrtdExtraStyle="trTdExtraStyleHD2"
              noDataUploaded={"No Data Uploaded"}
              // imgNoData={fileNodataImg}
            />:
            <TableByJp
              cols={ApiTableConstants(
                downloadcsvFunc,
                downloadIdFun,
                tomap,
                downloadCsvFileAuto,
                accountType,
                breadcrumName,
                handleCSVData,
                CSVList,
                props?.channel,
               pushedApiData,
               pushedApiDataIndex
              )}
              data={props.channel && campaignData?campaignData[props.channel]?.data:[]}
              pageNo={optionsProps?.pageNo}
              isLoading={optionsProps?.isLoading}
              extraTableTheadClass="extraStyleTheadHDI"
              theadTrExtraStyle="theadTrExtraStyleHDI"
              trThExtraStyle="trThExtraStyleHDI"
              tbodytrExtraStyle="trThExtraStyleHDI"
              tbodytrtdExtraStyle="trTdExtraStyleHD20"
              noDataUploaded={"No Data Uploaded"}
              // imgNoData={fileNodataImg}
            />
            }

            {/* : <img ></img>
            } */}
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
      {/* {
                isShowConfirm &&
                <div className="set-btn">
                        <Button
                   text = "Confirm"
                   extraClass = "btnNext"
                   onClick ={() => submitData()}
                 />
                </div>

            } */}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    campaignIdName: state.campaignReducer.campaignIdName,
    userLoginInfo:state.loginReducer.userLoginInfo,
    pushApiDataCsvDownload:state?.campaignReducer?.pushApiDataCsvDownload,
    selectedClientName:state?.campaignReducer?.campaignClientName,
    allClientInfo:state.allClientReducer?.allClientList
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, campaignAction, breadCrumActions),
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailsInfo);

// export default HistoryDetailsInfo;
