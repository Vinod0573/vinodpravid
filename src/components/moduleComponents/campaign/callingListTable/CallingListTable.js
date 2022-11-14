import React, { useEffect, useState } from "react";
import "./CallingListTable.css";
import DateFilter from "../../../generic/datefilter/DateFilter";
import Inputbox from "../../../generic/inputBox/InputBox";
import SearchIcon from "../../../../theme/assets/svg/generic/searchIcon.svg";
import Button from "../../../generic/button/Button";
import TableSaarthiJp from "../../../generic/table/TableSaarthi/TableSaarthiJpFi/TableSaarthiJp";
import { tableConstants } from "./tableConstant";
import backIcon from "../../../../theme/assets/svg/campaign/backicon.svg";
import { format } from "date-fns";
import clockIcon from "../../../../theme/assets/svg/campaign/clockRangeIcon.svg"
import axios from "axios";
import {
  SERVER_URL_CONNECTOR,
  SCHEDULER_URL,
} from "../../../../services/ApiRoutes";
import Pagination from "../../../generic/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterAction from "../../../../redux/filter/actions";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import DropdownComponent from "./DropdownComponent/DropdownComponent";
import downArrow from "../../../../theme/assets/svg/campaign/dropdownIconDown.svg"

function CallingListTable(props) {
  const [searchInput, setSearchInput] = useState();
  const [value, onChange] = useState(["10:00 Am", "11:00 Pm"]);
  const [callingData, setCallingData] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [paginationData, setPaginationData] = useState([]);
  const [load, setLoad] = useState("Loaded");
  const [userId, setUserId] = useState([]);
  const [selectAllBtn, setSelectAllBtn] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [selectedData,setSelectedData]=useState(false);
  const [maxAttemptData,setMaxAttemptData]=useState();
  const [flowData,setFlowData]=useState();
  const [selectedLanguageData,setSelectedLanguageData]=useState();
  const [selectedConnectionData,setSelectedConnectionData]=useState();
  const [selectedDispositionData,setSelectedDispositionData]=useState();
  const [startTime,setStartTime]=useState("0:00")
  const [endTime,setEndTime]=useState("23:59")
  const [listData,setListData]= useState(["No. of Attempts","Flow","Language","Connection Status","Disposition","Disabled Accounts"])
  const[disableList , setDisableList] = useState(false)
  const[dataLength , setDataLength] = useState()
  const[allSelected , setAllSelectedData] = useState([])
  const[hourStart , setHourStart] = useState()
  const[startAmPm , setStartAmPm] = useState()
  const[minStart , setMinstart] = useState()
  const[hourEnd , setHourEnd] = useState()
  const[minEnd , setMinEnd] = useState()

  

   //For set date range  of campaign 
   useEffect(
     () => {
      
      let  start =  props.data?.startDate
      let end = props.data?.endDate
     props.setDateFilterData({ fromDate: start, toDate: end });
     },[props.data]
   )
   useEffect(
     () => {
        let temp =[]
        if(selectedLanguageData?.length){
          temp.push(...selectedLanguageData)
        }
        if(flowData?.length){
          temp.push(...flowData)
        }
        if(selectedConnectionData?.length){
          temp.push(...selectedConnectionData)
        }
       if(selectedDispositionData?.length){
        temp.push(...selectedDispositionData)
       }
       if(disableList){
        temp.push("Disabled Accounts")
     }
    
        setAllSelectedData(prev => temp)
     },[selectedLanguageData , selectedConnectionData , selectedDispositionData ,flowData , disableList]
   )

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleEdit = (e, id) => {
    if (e.target.checked) {
      setUserId([...userId, id]);
    } else {
      let temp = userId;
      const idx = temp.indexOf(id);
      if (idx > -1) {
        temp.splice(idx, 1);
      }
      setUserId((prev) => [...temp]);
    }
  };
  const handleClickPageNo = (newPageNo) => {
    const tempNewPage = newPageNo + 1;
    setPageNo((prev) => tempNewPage);
    // setClickData(value)
    // setResetClickData(value)
  };
  let  tokenZx=props?.userLoginInfo?.userSessionDetails?.accessToken;
  let headers = {
        headers:{"Content-Type": "application/json" ,
     "x-access-token":tokenZx}
   };
  //function to get all table data
  const getAllCallingListData = () => {
    let fromDate = format(new Date(props.filteredDateRangeData?.fromDate), "yyyy-MM-dd");
    let toDate = format(new Date(props.filteredDateRangeData?.toDate), "yyyy-MM-dd");
    setLoad();
    let url = SERVER_URL_CONNECTOR + "" + SCHEDULER_URL.GET_CALLINGLIST_API;
    let obj = {
      campaignId: props.data?.id,
      startDate: fromDate,
      endDate: toDate,
    };
    if (searchInput?.length) {
      obj["search"] = searchInput;
    }
    axios.post(url, obj,headers).then((res) => {

      setCallingData(res?.data?.data);
      setLoad("Loaded");
    });
  };
  useEffect(() => {
    let ans = callingData?.sort((a, b) => {
      if (a?.isEnabled === false) {
        return 1;
      } else {
        return -1;
      }
    });
    setCallingData((prev) => ans);
  }, [callingData]);

  useEffect(() => {
    getAllCallingListData();
  }, [props.data, props.filteredDateRangeData, searchInput]);
  const getPagination = () => {
    let arrSize = callingData?.length;
    arrSize = Math.ceil(arrSize / 15);
    setTotalPage((prev) => arrSize);
    let tempData = callingData;
    let startValue = (pageNo - 1) * 15;
    let endValue = pageNo * 15;
    tempData = tempData?.slice(startValue, endValue);
    setPaginationData(tempData);
  };
  useEffect(() => {
    getPagination();
  }, [pageNo, callingData]);

  //get Length 
  useEffect(
  () => {
    let arr = callingData?.map((e) => {
      if (e?.isEnabled !== false) {
        return e?.callingId;
      }
    });
    setDataLength(prev => arr?.length)
   
  },[callingData]
  )
 
  //for getting all id by select all
  const getAllselect =() => {
    let arr = callingData?.map((e) => {
      if (e?.isEnabled !== false) {
        return e?.callingId;
      }
      else if(disableList){
         if(e?.isEnabled == false){
           return e?.callingId
         }
      }
    });
    setUserId((prev) => arr);
    setDataLength(prev => arr.length)
    setSelectAllBtn(prev => true)
  }
  const getUnSelect =() => {
    setUserId((prev) => []);
    // setDataLength(0)
    setSelectAllBtn(prev => false)
  }
  useEffect(
    () => {
      if(dataLength){
      if(dataLength !== userId?.length){
        setSelectAllBtn(prev => false)
      }
      else if(dataLength === userId?.length){
        setSelectAllBtn(prev => true)
      }
      
    }
  },[userId]
  )
  // useEffect(() => {
  //   if (selectAllBtn) {
  //     let arr = callingData?.map((e) => {
  //       if (e?.isEnabled !== false) {
  //         return e?.callingId;
  //       }
  //     });
  //     setUserId((prev) => arr);
  //     setDataLength(prev => arr.length)
  //   } else {
  //     setUserId((prev) => []);
  //     setDataLength()
  //   }
  // }, [selectAllBtn]);

  //for making disable perticuler ids
  
  const toHandleDisable = () => {
    if (userId?.length) {
      let url = `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.CALLINGLIST_DISABLE_API}`;
      let obj = {
        callingIdList: userId,
        status: false,
      };
      axios
        .post(url, obj,headers)
        .then((res) => {
          return (
            setUserId((prev) => []),
            toast.success(
              "The selected number have been disabled from the calling list"
            ),
            // getAllCallingListData()
            setFilters()
          );
        })
        .catch((err) => console.log(err));
    }
  };

  //for  making enable perticuler ids
  const toHandleEnable = () => {
    if (userId?.length) {
      let url = `${SERVER_URL_CONNECTOR}${SCHEDULER_URL.CALLINGLIST_DISABLE_API}`;
      let obj = {
        callingIdList: userId,
        status: true,
      };
      axios
        .post(url, obj,headers)
        .then((res) => {
          return (
            setUserId((prev) => []),
            toast.success(
              "The selected number have been successfully enabled"
            ),
            // getAllCallingListData()
            setFilters()
          );
        })
        .catch((err) => console.log(err));
    }
  };
  const format1 = "h:mm a";

  const now = moment().hour(0).minute(0);
  const end = moment().hour(23).minute(59)
  


  function onChangeTimeFormatStartTime(value) {
  
    if(value){
    let t =  value?.format("h:mm a")
    if(t?.includes("pm")){
      setStartAmPm(prev => "pm")
       let total = t?.split(":")
       let hour = total?.[0]
       setHourStart(prev => Number(hour)+12)
       let minutes = total?.[1]?.split(" ")[0]
       let totalTime = `${Number(hour)+12}:${minutes}`
       setStartTime(prev => totalTime)
       setMinstart(prev => minutes)
    }
    else{
      setStartAmPm("am")
      let total = t?.split(":")
     
      let hour = (total?.[0] == "12") ? "00" :  total?.[0]
      let minutes = total?.[1]?.split(" ")[0]
      let totalTime = `${Number(hour)}:${minutes}`
      setStartTime(prev => totalTime)
      setHourStart(prev =>{ if(hour ==12 ) {
           return 0
      }else{ return Number(hour)}} )
      setMinstart(prev => minutes)
    }
  }
  else{
      setStartTime()
  }
  }
  
  function onChangeTimeFormatEndTime(value) {
    if(value){
    let t =  value?.format("h:mm a")
    if(t?.includes("pm")){
       let total = t?.split(":")
       let hour = total?.[0]
       let minutes = total?.[1]?.split(" ")[0]
       let totalTime = `${Number(hour)+12}:${minutes}`
       setEndTime(prev => totalTime)
       setHourEnd(prev =>Number(hour)+12 )
       setMinEnd(prev => minutes)
    }
    else{
      let total = t?.split(":")
      let hour =  (total?.[0] == "12") ? "00" :  total?.[0]
      let minutes = total?.[1]?.split(" ")[0]
      let totalTime = `${Number(hour)}:${minutes}`
      setEndTime(prev => totalTime)
      setHourEnd(prev =>Number(hour) )
      setMinEnd(prev => minutes)
    }
  }
  else{
    setEndTime()
  }
  }


  const options = {
    imgSrcRight: downArrow,
    imgSrcleft: "",
    placeHolderText: allSelected?.length ? allSelected : 'Filter By'
  };

  const getFilteredData = (value) => { 
  
    props.setCallingListFilter(value)
    // props.setLanguageFilterData(value);
    setSelectedData(prev => value);
  // let tempAllFilter = {
  //   ...props.allSelectedFilterData,
  //   "Language": value
  // };
  // props.setAllSelectedFilterData(tempAllFilter);
}


useEffect(()=>{
  if(props.data?.id){
    props.getCallingListFilters({campaignId:props.data.id},tokenZx)
  }
},[props.data])

const setFilters = () => {
  let fromDate = format(new Date(props.filteredDateRangeData?.fromDate), "yyyy-MM-dd");
  let toDate = format(new Date(props.filteredDateRangeData?.toDate), "yyyy-MM-dd");
  let temp=[]
  temp.push(`0-${maxAttemptData}`)
  setLoad();
  let url = SERVER_URL_CONNECTOR + "" + SCHEDULER_URL.GET_CALLINGLIST_API;
  let obj = {
    campaignId: props.data?.id,
    startDate: fromDate,
    endDate: toDate,
    // language: selectedLanguageData?.length>0 && selectedLanguageData,
    // connectionStatus:selectedConnectionData?.length>0?[selectedConnectionData]:[],
    // disposition: selectedDispositionData?.length>0? selectedDispositionData:[],
    // flow: flowData?.length>0?[flowData]:[],
    // attempt: maxAttemptData?temp:[],
    // isDisabled:disableList
  };
  if(selectedLanguageData?.length>0){
    obj["language"] = selectedLanguageData
  }
  if(selectedConnectionData?.length>0){
    obj["connectionStatus"] = selectedConnectionData
  }
  if(selectedDispositionData?.length>0){
    obj["disposition"] = selectedDispositionData
  }
  if(flowData?.length>0){
    obj["flow"] = flowData
  }
  if(maxAttemptData ){
    obj["attempt"] = temp
  }
  if(disableList){
    obj["isDisabled"] = disableList
  }
  if (searchInput?.length) {
    obj["search"] = searchInput;
  }
  if(startTime && endTime){
    obj["startTime"] = startTime
    obj["endTime"] = endTime
  }
  axios.post(url, obj,headers).then((res) => {
    setCallingData(res?.data?.data);
    setLoad("Loaded");
  });
};
useEffect(()=>{
    setFilters()
},[maxAttemptData,flowData,selectedLanguageData,selectedConnectionData,selectedDispositionData,disableList , startTime, endTime])
 


 // for disableList 
 useEffect(
   () => {
        if(props.filterByCallingListData?.includes("Disabled Accounts")){
          setDisableList(prev => true)
        }
        else{
          setDisableList(prev => false)
        }
   },[props.filterByCallingListData?.length]
 )

// disabling time filter 
const disabledHours =() =>{
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11,12,13,14,15,16,17,18,19,20,21,22,23]

 let result = arr?.filter((e) => e < hourStart)
 
 return result
}
const disabledEndHours =() =>{
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11,12,13 , 14,15,16,17,18,19,20,21,22,23]

 let result = arr?.filter((e) => e >hourEnd)

 return result
}


const disable =(min) => {
   let arr =[]
   for (let value = 0; value <=59; value++) {
    if (value <=min) {
      arr.push(value );
    }
  }
  return arr;
}
const disabledMin =(min) => {
  let arr =[]
  for (let value = 0; value <=59; value++) {
   if (value >=min) {
     arr.push(value );
   }
 }
 return arr;
}

function disabledMinutes(h) {
  switch (h) {
    case  hourStart:
      return  disable(minStart)
    
  }
}
function disabledEndMinutes(h) {
  switch (h) {
    case  hourEnd:
      return  disabledMin(minEnd)
    
  }
}
   return (
    <div className="callingListTableWrapper">
      <div>
        <div className="backIconDiv">
          <img src={backIcon} onClick={() => props.back(false)}></img>
        </div>
        <div className="filterDiv">
          <div className="dateFilterContainer">
            <div className="filterName">Date Range:</div>
            <div className="dateFilter">
              <DateFilter id="dateRangescheduler" dateHeader={"show"} />
            </div>
          </div>
          <div className="time-range">
            <div className="filterName">Time Range:</div>
            <div className="time-range-div">
              <TimePicker
                showSecond={false}
                defaultValue={now}
                className="xxx"
                onChange={onChangeTimeFormatStartTime}
                format={format1}
                // use12Hours
                inputReadOnly
                disabledHours={disabledEndHours}
                disabledMinutes={disabledEndMinutes}
               
              />
              &nbsp;<div>-</div>&nbsp;
              <TimePicker
                showSecond={false}
                defaultValue={end}
                className="xxx"
                onChange={onChangeTimeFormatEndTime}
                format={format1}
                // use12Hours
                inputReadOnly
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
              />
              <img className ="clockIcon" src={clockIcon} alt ={"icon"}></img>
            </div>
          </div>
          {/* <div className="time-range">
            <div style={{visibility:"hidden"}}>Filter</div>
            <div className="multiple-dropdown">
              <MultipleDropdown 
              inputArray={["No. of Attempts","Flow","Language","Connection Status","Disposition","Disabled Accounts"]}
              />
            </div>
          </div> */}
          <div className="time-range">
            <div style={{visibility:"hidden"}}>Filter</div>
            <div >
             <DropdownComponent 
              isHideFooter={true}
              isHideSearchBar={true}
              isHideAllCheckbox={true}
              toBeFilterData={listData}
              options={options}
              extraSelectedClass="extraSelectedClass"
              getFilteredData={(value) => getFilteredData(value)}
              key="languageMultiSelectOne"
              selectedDataOutside={selectedData}
              isDisable={false}
              maxAttempt={(data)=>{setMaxAttemptData(data)}}
              flowData={(data)=>{setFlowData(data)}}
              selectedLanguageData={(data)=>{setSelectedLanguageData(data)}}
              connectionStatus={(data)=>{setSelectedConnectionData(data)}}
              selectedDispositionData={(data)=>{setSelectedDispositionData(data)}}
            
             />
            </div>
          </div>
        </div>
        <div className="searchBoxDiv">
          <Inputbox
            className="userListSearchInput"
            type="search"
            placeholder="Loan Id or Phone Number"
            imgSrcLeft={SearchIcon}
            onChangeValue={(e) => handleSearchChange(e)}
          />
        </div>
        <div className="campaignNameDiv">
          <div className="campaignName">
            {" "}
            Campaign Name - {props.data?.campaignName ? props.data?.campaignName : props.data?.campaignId}
          </div>
          <div className="buttonContainer">
            <div>
              <Button
                text={(selectAllBtn  )? "Unselect all" : "Select all"}
                extraClass={
                  (selectAllBtn )
                    ? "unselectallButtonStyle "
                    : "selectallButtonStyle "
                }
                onClick={() => (selectAllBtn )?  getUnSelect() : getAllselect()}
              />
            </div>
            <div>
              {disableList ? 
              <Button
              text="Enable from calling list"
              extraClass={
                userId?.length ? "disableCallButton" : "disableButtonStyle "
              }
              onClick={() => toHandleEnable()}
            />
              :
              <Button
                text="Disable from calling list"
                extraClass={
                  userId?.length ? "disableCallButton" : "disableButtonStyle "
                }
                onClick={() => toHandleDisable()}
              />
               }
            </div>
          </div>
        </div>
        <div className="tableListDiv">
          <TableSaarthiJp
            cols={tableConstants(handleEdit, userId , disableList)}
            data={paginationData}
            pageNo={pageNo}
            isLoading={load}
          />
        </div>
        {totalPage > 1 && (
          <div>
            <Pagination
              totalNoOfPage={totalPage}
              handleClickPageNo={(value) => handleClickPageNo(value)}
              forcePage={pageNo}
            />
          </div>
        )}
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
    userLoginInfo: state.loginReducer.userLoginInfo,
    filterByCallingListData : state?.filterReducer?.filterByCallingListData
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, filterAction), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CallingListTable);
