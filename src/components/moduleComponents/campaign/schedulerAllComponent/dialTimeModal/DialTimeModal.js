import React, { useEffect, useState, useRef } from "react";

import "./DialTimeModal.css";
import DateFilter from "../../../../generic/datefilter/DateFilter";
import clockIcon from "../../../../../theme/assets/svg/campaign/clockIcon.svg";
import arrowTime from "../../../../../theme/assets/svg/campaign/arrowTime.svg";
import timeZoneIcon from "../../../../../theme/assets/svg/campaign/timeZone.svg";
import ToggleSwitch from "../../../../generic/toggleSwitch/ToggleSwitch";
import MaxAttempt from "../../schedulerAllComponent/attempModal/MaxAttempt";
import DropDown from "../../../../generic/dropdownsaarthi2/DropdownSaarthi";
import downArrow from "../../../../../theme/assets/svg/campaign/dropdownIconDown.svg";
import * as schedulerAction from "../../../../../redux/campaign/scheduler/actions";
import * as filterAction from "../../../../../redux/filter/actions";
import * as campaignAction from "../../../../../redux/campaign/actions";
import DatePicker from "react-datepicker";
 import 'react-datepicker/dist/react-datepicker.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  SERVER_URL_CONNECTOR,
  CAMPAIGN_URL,
} from "../../../../../services/ApiRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import ErrorMessage from '../../../../generic/errorMessage/ErrorMessage'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

function DialTimeModal(props) {
  const history=useNavigate();
  const [optionLabels, setOptionLabels] = useState(["On", "Off"]);
  const [isNavToggleActive, setIsNavToggleActive] = useState(String(props.schedulerData?.dialTimeData?.autoDial)?.length !==9 ? props.schedulerData?.dialTimeData?.autoDial : true);
  const [selectedPer, setSelectedPer] = useState();
  const [startTime, setStartTime] = useState(props.schedulerTime?.startTime ? props.schedulerTime?.startTime : null);
  const [endTime, setEndTime] = useState(props.schedulerTime?.endTime ? props.schedulerTime?.endTime :null);
  const [maxAttempt, setmaxAttempt] = useState();
  const[sTime , setSTime] = useState()
  const[eTime , setETime] = useState()
  const[startMinutes , setStartMinutes] = useState(null)
  const[endMinutes , setEndMinutes] = useState(null)
  const[startPlaceholder , setStartPlaceholder] = useState()
  const[endPlaceholder ,setEndPlaceholder] = useState()
  const[datechange , setDateChange] = useState()
  const[errorStartTime , setErrorStartTime] = useState()
  const[errorEndTime , setErrorEndTime] = useState()

  const handleDisableToggleSwitch = (checked) => {
    setIsNavToggleActive((prev) => checked);
  };
  const propsForPre = {
    optionList: ["Day", "Hour", "Campaign"],
    imgSrcRight: downArrow,
    placeHolderText: props.schedulerData?.dialTimeData?.frequency ? props.schedulerData?.dialTimeData?.frequency: selectedPer ? selectedPer : "select",
  };
  const onChangePer = (item) => {
    setSelectedPer((prev) => item);
  };
  useEffect(() => {
    setSelectedPer("Day");
  }, []);
  let map = {
    data: [
      [
        {
          text: "Date Range",

          type: "date",

          respKey: "dateRange",
        },

        {
          text: "Start Time",

          type: "24htime",

          respKey: "startTime",
        },

        {
          text: "End Time",

          type: "24htime",

          respKey: "endTime",
        },
      ],

      [
        {
          text: "Timezone",

          type: "string",

          value: "UTC +5:30 IST",

          respKey: "timezone",
        },

        {
          text: "Max no. of attempts",

          type: "nested",

          values: [
            {
              // text: '',

              type: "p_counter",

              default: 3,

              max: 1000,

              min: 0,

              respKey: "attempts",
            },

            {
              type: "dropdown",

              respKey: "frequency",

              values: [
                {
                  text: "Day",

                  value: "day",
                },

                {
                  text: "Hour",

                  value: "hour",
                },

                {
                  text: "Campaign",

                  value: "campaign",
                },
              ],
            },

            {
              type: "boolean",

              respKey: "autoDial",

              default: false,
            },
          ],
        },
      ],
    ],
  };
  //    let arr = map["data"][0][0]["text"]
  //    console.log(map["data"][0][0]["text"], "abhi")
  //console.log(d.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))
  //To set autodial on off by props
  // useEffect(
  //   () => {
  //     setIsNavToggleActive(prev=> props.schedulerData?.dialTimeData?.autoDial)
  //     // setSelectedPer(prev => props.schedulerData?.dialTimeData?.frequency)
  //   },[props.schedulerData]
  // )
 
 
  let fromDate = props.filteredDateRangeData?.fromDate;
  let toDate = props.filteredDateRangeData?.toDate;
  //For getting time in minute
  useEffect(
    () => {
      if(startTime){
        let start = new Date(startTime)
        ?.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
        ?.split(",")[1];
      let startArray = start?.split(":");
       let startMinute = new Date(startTime)?.getHours() * 60 + Number( new Date(startTime)?.getMinutes());
       setStartMinutes(prev => startMinute)
         if(startMinute >=0){
        let endMinute
         if(endTime){
        let end = new Date(endTime)
        ?.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
        ?.split(",")[1];
      let endArray = end?.split(":");
        endMinute = new Date(endTime)?.getHours() * 60 + Number( new Date(endTime)?.getMinutes());}
            if(startMinute < (endMinute || props.schedulerData?.dialTimeData?.e_time)){
              setStartMinutes(prev => startMinute)
              setErrorStartTime(prev => false)
              setErrorEndTime(prev => false)
             }
             else{
               if(endMinute|| props.schedulerData?.dialTimeData?.e_time){
                setErrorStartTime(prev => true)
               }
              
             }
       }else{
        setStartMinutes(prev => startMinute)
       }

      }
      // else{
      //   if(props.schedulerData?.dialTimeData?.s_time){
      //     setStartMinutes(prev => props.schedulerData?.dialTimeData?.s_time)
          
      //   }
        else{
          setStartMinutes(prev => null)
        }
      // }
    },[startTime]
  )
  useEffect(
    () => {
      if(endTime){
        let end = new Date(endTime)
        ?.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
        ?.split(",")[1];
      let endArray = end?.split(":");
      let endMinute = new Date(endTime)?.getHours() * 60 + Number( new Date(endTime)?.getMinutes());
      // setEndMinutes(prev => endMinute)
      if(endMinute <=1439){
        let startMinute 
        if(startTime){
        let start = new Date(startTime)
        ?.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
        ?.split(",")[1];
      let startArray = start?.split(":");
       startMinute = new Date(startTime)?.getHours() * 60 + Number( new Date(startTime)?.getMinutes());}
             
            if(endMinute  > (startMinute || props.schedulerData?.dialTimeData?.s_time)){
              setEndMinutes(prev => endMinute)
               setErrorEndTime(prev => false)
               setErrorStartTime(prev => false)
             }
             else{
               if(startMinute || props.schedulerData?.dialTimeData?.s_time){
                setErrorEndTime(prev => true)
               }
             }
       }else{
        setEndMinutes(prev => endMinute)
       }
      }
      // else{
      //   if(props.schedulerData?.dialTimeData?.e_time){
      //     setEndMinutes(prev => props.schedulerData?.dialTimeData?.e_time)
      //   }
        else{
          setEndMinutes(prev => null)
        }
      // }

    }
    ,[ endTime ]
  )
 
  //ww
  // let start = new Date(startTime?.length && startTime)
  //   ?.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
  //   ?.split(",")[1];
  // let startArray = start?.split(":");
  // let startMinutes = startArray?.[0] * 60 + Number(startArray?.[1]);

  // let end = new Date(endTime)
  //   ?.toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
  //   ?.split(",")[1];
  // let endArray = end?.split(":");
  // let endMinutes = endArray?.[0] * 60 + Number(endArray?.[1]);
  let obj = {
    s_time: errorStartTime ? null :startMinutes,
    e_time: errorEndTime ? null : endMinutes,
    autoDial: isNavToggleActive,
    max_attempts: maxAttempt,
    frequency: selectedPer,
    start_date_range: fromDate,
    end_date_ranfge: toDate,
  };
  // store in redux
  const prevData = usePrevious(obj);
  useEffect(() => {
    // props.storeSelectedDialTime({ dialTimeData: obj });
    let reduxObj = props.schedulerData
    if(reduxObj?.["preferedTime"]) {
      let prfered = reduxObj["preferedTime"]
      props.storeSelectedDialTime({ dialTimeData: obj , preferedTime : prfered});
    }else{
      props.storeSelectedDialTime({ dialTimeData: obj });
    }
    if (prevData != obj ) {
      props.setCheckBox("Dial Time");
    }
 
  }, [
   startMinutes, endMinutes,
    isNavToggleActive,
    maxAttempt,
    fromDate,
    toDate,
    selectedPer,errorStartTime, errorEndTime
  ]);

  //store current time
  useEffect(
    () => {
      let dataT = {
        startTime : startTime,
        endTime : endTime
      }
      if(startTime || endTime){
       
        props.storeTime(dataT)
      } 
    },[startTime , endTime]
  )
//api hitting for time update of campaign
//  useEffect(
//     async () => {
//       let fromDate = props.campaignSelectedData?.startDate
//       let toDate = props.campaignSelectedData?.endDate
//       console.log("abhishek Bhai" ,fromDate , toDate)
//      await props.setDateFilterData({ fromDate: fromDate , toDate: toDate });
//    },[]
//  )



 useEffect(
      () => {
        const urlUpdate = `${SERVER_URL_CONNECTOR}${CAMPAIGN_URL.UPDATE_CAMPAIGN}`;
      //  let fromDate = new Date(datechange?.)?.toISOString()
      //  let toDate = new Date(props.filteredDateRangeData?.toDate)?.toISOString()

      let fromDate = datechange?.fromDate
      let toDate = datechange?.toDate
    //   if(props?.campaignSelectedData?.startDate && props.campaignSelectedData?.endDate  && props?.filteredDateRangeData){
    //  if((fromDate?.split('T')[0]  !== props.campaignSelectedData?.startDate?.split('T')[0]) || (toDate?.split('T')[0]  !== props.campaignSelectedData?.endDate?.split('T')[0] )){
       let obj = {
        "id" :  [props.campaignCredentials?.id],
         "startDate" : fromDate,
         "endDate" : toDate ,
         "mode" : "update"
       }
       let headers = {
        headers:{"Content-Type": "application/json" ,
     "x-access-token":props?.userLoginInfo?.userSessionDetails?.accessToken}
   };
     if(datechange){
        axios.post(urlUpdate,obj,headers)
          .then((res) => {
            if (res?.data) {
              toast.success("Campaign Date Range updated successfully!");
              props.setCamapignSelectedData(res.data.data?.[0]);
              props.setSelectedCampaignCredentials(res.data.data)
            }
            if(res.status==401){
              history("/login");
              props.setLoggedInUserInfo();
            }
    
          })
          .catch((err) => {
            toast.error("Campaign  Date Range Updation not successful");
            if(err.status==401){
              history("/login");
              props.setLoggedInUserInfo();
            }
          });
        }
      // }
    //  }
    },[datechange]
 )
 //converting minutes time in hour
  let ans 
 useEffect(
 () => {
   
  if(props.schedulerData?.dialTimeData?.s_time){
    setStartMinutes(prev => props.schedulerData?.dialTimeData?.s_time)
  let hours = Math.floor( props.schedulerData?.dialTimeData?.s_time/ 60);          
  let  minutes = props.schedulerData?.dialTimeData?.s_time % 60;
  let hh= hours < 10 ? `0${hours}` : hours
  
   ans = `${hours}:${minutes}:00` 
   setSTime(prev => `${hh}:${minutes}:00`)
  }
  if(props.schedulerData?.dialTimeData?.e_time ){
    setEndMinutes(prev => props.schedulerData?.dialTimeData?.e_time)
   let hoursE = Math.floor(  props.schedulerData?.dialTimeData?.e_time / 60);  
   let he =  hoursE < 10  ?  `0${hoursE}` : hoursE   
   let  minutesE =  props.schedulerData?.dialTimeData?.e_time % 60;
   setETime(prev => `${he}:${minutesE}:00`)
  }

 },[props.schedulerData]
 )
// startPlaceholder  and endPlaceholder endTime ? endTime : endPlaceholder ? new  Date(endPlaceholder): endTime 

let d = `Tue Jul 12 2022 18:28:00 GMT+0530 (India Standard Time)`

 useEffect(
   () => {
     if(sTime?.length >0){
      setStartPlaceholder(prev => new Date(`Tue Jul 12 2022 ${sTime} GMT+0530 (India Standard Time)`)) }
    if(eTime?.length >0 ){
      setEndPlaceholder(prev => new Date(`Tue Jul 12 2022 ${eTime} GMT+0530 (India Standard Time)`)) 
    }
   
   },[sTime , eTime]
 )
//  useEffect(
//    () => {
//     let dataT = {
//       startTime : startPlaceholder,
//       endTime : endPlaceholder
//     }
//     if(startPlaceholder ){
//       // console.log("me in")
//       // props.storeTime(dataT)
      
//     } 
//    },[startPlaceholder , endPlaceholder]

//  )
  return (
    <div className="dialTimeWrapper">
      <div className="outerDivDialTime">
        <div className="dialRowDiv">
          <div className="dialTimeColumnDiv">
            <div className="headingDivDial">Date Range:</div>
            <div className="calender">
              <DateFilter id="dateRangeOne" dateHeader={"show"} disableRangeMin ={true} typeText = "update"  onChangeValue ="true" getonChangeValue = {setDateChange}/>
            </div>
          </div>
          <div className="dialTimeColumnDiv">
            <div className="headingDivDial">Start Time:</div>
            <div>
              <div className="inputBorderForm">
                <img src={clockIcon} alt="Email Id Icon" />
                {/* <input
                      className="formInputArea"
                      type="text"
                      placeholder='9:00 PM'
                    /> */}
                <DatePicker
                  selected={ startTime ? startTime : startPlaceholder ? new Date(startPlaceholder) : startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" || e.key === "Delete") {
                      return false;
                  }
                    else{
                    return e.preventDefault();}
                  }}
                />
              </div>
                 <div className='errorDiv'>
                     {errorStartTime?
                    <ErrorMessage 
                    errorMessage = "Start Time should be smaller than End Time" />
                    : ""
                     }
                    </div>
            </div>
          </div>
          <div className="arrow">
            <img src={arrowTime}></img>
          </div>
          <div className="dialTimeColumnDiv">
            <div className="headingDivDial">End Time:</div>
            <div>
              <div className="inputBorderForm">
                <img src={clockIcon} alt="Email Id Icon" />
                <DatePicker
                  selected={  endTime ? endTime : endPlaceholder ? new  Date(endPlaceholder): endTime }
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" || e.key === "Delete") {
                      return false;
                  }
                    else{
                    return e.preventDefault();}
                  }}
                />
              </div>
              <div className='errorDiv'>
                     {errorEndTime?
                    <ErrorMessage 
                    errorMessage = "End Time should be greater than Start Time " />
                    : ""
                     }
                    </div>
            </div>
          </div>
        </div>

        <div className="dialRowDiv">
          <div className="dialTimeColumnDiv">
            <div className="headingDivDial">Time Zone:</div>
            <div>
              <div className="timeZoneDiv">
                <img src={timeZoneIcon}></img>
                <p className="paraTime">UTC +5:30 IST</p>
              </div>
              {/* <DateFilter  id="dateRangeOne" dateHeader={'show'} /> */}
            </div>
          </div>
          <div className="dialTimeColumnDiv">
            <div className="headingDivDial">Max no. of attempts:</div>
            <div className="containerDropDown">
              <MaxAttempt setAttempt={setmaxAttempt}  MaxAttempt ={props.schedulerData?.dialTimeData?.max_attempts}/>
              <p className="perDial">Per</p>
              <DropDown
                droplist={propsForPre}
                // isFilter={true}
                searchUi={false}
                handleSearchItem={selectedPer}
                selectedItem={(item) => onChangePer(item)}
                extraClassSelectedArea={"preEmidropdown"}
                extraClassToBeSelectedArea={"dropdowndListArea"}
              />
            </div>
          </div>

          <div className="dialTimeColumnDiv">
            <div className="headingDivDial">Auto Dial:</div>
            <div>
              <ToggleSwitch
                id="dialTimeModal"
                checked={isNavToggleActive}
                optionLabels={optionLabels}
                small={true}
                onChange={(checked) => handleDisableToggleSwitch(checked)}
                data = {props.schedulerData?.dialTimeData?.autoDial}
              />
              <span className="togglePara">
                {isNavToggleActive ? "ON" : "OFF"}
              </span>
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
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    filteredDateRangeData: state.filterReducer?.filteredDateRangeData,
    schedulerData: state.schedulerReducer?.dialtimeData,
    campaignCredentials: state.campaignReducer?.campaignCredentials,
    campaignSelectedData: state.campaignReducer?.campaignSelectedData,
    userLoginInfo: state?.loginReducer?.userLoginInfo,
    schedulerTime : state.schedulerReducer?.time,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, schedulerAction, filterAction ,campaignAction),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DialTimeModal);
