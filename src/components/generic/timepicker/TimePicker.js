import React, { useState } from "react";
import { useEffect } from "react";
import "./TimePicker.css";
import clocktp from "../../../theme/assets/svg/generic/clocktp.svg";
import { useSelector } from "react-redux";
//usage
//<TimePicker twentyFourHour={true|false}/>

export default function TimePicker(props) {
  // all data
  const [data, setData] = useState(props.dataOutside ? props.dataOutside  :{
    hasdata: false,
    am: true,
    hour: "",
    minute: "00",
  });
  const storedDataScheduler = useSelector(
    store => store?.omniChannelReducer?.storedschedulerSettingwhatsApp
  )
  // Abhishek sended outside data 
  useEffect(
    () => {
      if(storedDataScheduler?.time){
        setData(prev =>storedDataScheduler?.time )
      }
    },[storedDataScheduler?.time?.am , storedDataScheduler?.time?.hour , storedDataScheduler?.time?.minute]
  )
 
  //
  const handleHourChange = (e) => {
    let val = parseInt(e.target.value);
    if (val <= 12 && val >=0) {
     
      if (val > 12) {
        val = val % 12;
        if (val == 0) val = 1;
      }

      val = val + [];
      val = val.padStart(2, "0");
     
      setData({ ...data, hour: val });
    }
  };
  const handleMinChange = (e) => {
    let val = parseInt(e.target.value);
    if (val <= 60 && val >=0) {
      if (val >= 60) {
        val = val % 60;
        if (val == 0) val = 0;
      }
      val = val + [];
      val = val.padStart(2, "0");
  
      setData({ ...data, hour: val });

      setData({ ...data, minute: val });
    }
  };
  const handleHourChange24 = (e) => {
    let val = parseInt(e.target.value);

    if (val <= 23) {
      if (val >= 24) {
        val = val % 24;
      }

      val = val + [];
      val = val.padStart(2, "0");
    
      setData({ ...data, hour: val });
    }
  };
  const handleMinChange24 = (e) => {
    let val = parseInt(e.target.value);
    if (val <= 59) {
      if (val >= 60) {
        val = val % 60;
        if (val == 0) val = 0;
      }
      val = val + [];
      val = val.padStart(2, "0");
  
      setData({ ...data, hour: val });

      setData({ ...data, minute: val });
    }
  };

  useEffect(()=>{
    props.sendTime(data)
  },[data])

  return (
    <div className="timePickercont"
    style={props?.twentyFourHour?{width:"165px"}:{width:"227px"}}
    
    >
      <div
        className={`${
          props?.twentyFourHour ? "time-select-sm" : "time-select"
        }`}
      >
        <div
          style={{ display: "flex", justifyContent: "center",margin:"7px" ,marginLeft:"0px" }}
        >
          <img src={clocktp} alt="T" />
        </div>
        <div className="inputgrp">
          <input
            type="number"
            onChange={(e) => {
              props?.twentyFourHour
                ? handleHourChange24(e)
                : handleHourChange(e);
              setData((prev) => {
                return { ...prev, hasdata: true };
              });
            }}
            className={`${data?.hasdata ? "hrselact" : "hrsel"}`}
            value={data?.hour}
            onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
          />
          :
          <input
            type="number"
            onChange={(e) => {
              props?.twentyFourHour ? handleMinChange24(e) : handleMinChange(e);
              setData((prev) => {
                return { ...prev, hasdata: true };
              });
            }}
            className={`${data?.hasdata ? "minselact" : "minsel"}`}
            value={data?.minute}
            onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
          ></input>
        </div>
        {!props?.twentyFourHour && (
          <div className={`btngrp`}>
            <button
              onClick={() => {
                setData((prev) => {
                  return { ...prev, am: true, hasdata: true };
                });
              }}
              className={` ${
                data?.hasdata ? (data?.am ? "ambtnact" : "ambtninc") : "ambtninc"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => {
                setData((prev) => {
                  return { ...prev, am: false, hasdata: true };
                });
              }}
              className={` ${
                data?.hasdata ? (!data?.am ? "pmbtnact" : "pmbtninc") : "pmbtninc"
              }`}
            >
              PM
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
