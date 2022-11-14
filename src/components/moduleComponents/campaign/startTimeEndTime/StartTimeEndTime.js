import React,{useEffect, useState} from "react";
import clockIcon from "../../../../theme/assets/svg/campaign/clockIcon.svg";
import ErrorMessage from "../../../generic/errorMessage/ErrorMessage";
import "./StartTimeEndTime.css";


function StartTimeEndTime(props) {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [hourtime,setHourTime]=useState(0)
    const [minTime,setMinTime]=useState(0)
    const [error,setError]=useState([])
   console.log("err" , error)
    const handleHourChange=(e,value)=>{
      if(e.target.value >12){
        let temp = error
        if(!temp?.includes("hour")){
          temp.push("hour")
        }
        setError(prev=>temp)
        setHourTime(12)
        props.handleHourChange(12,value)
      }
      else{
        let temp=error
        if(temp?.includes("hour")){
          let index = temp?.indexOf("hour")
          temp?.splice(index , 1)
        }
           setError(temp)
        setHourTime(e.target.value)
        props.handleHourChange(e.target.value,value)
      }
    }

    const handleMinChange=(e,value)=>{
        
      if(e.target.value > 60){
        let temp=error
        if(!temp?.includes("min")){
          temp.push("min")
        }
      
        setError(prev=>temp)
        setMinTime(59)
      props.handleMinChange(59,value)
      }else{
        let temp=error
        if( temp?.includes("min")){
          let index =temp?.indexOf("min")
          temp?.splice(index , 1)
        }
        setError(temp)
        setMinTime(e.target.value)
        props.handleMinChange(e.target.value,value)
      }
    
    }

    useEffect(()=>{
      setHourTime(props.value?.retryHrTime)
          // props.handleHourChange(props.hourVal , props.value?.respKey)
    },[props.value?.retryHrTime])

    useEffect(()=>{
      setMinTime(props.value.minTime)
    // props.handleMinChange(props.hourVal, props.value?.respKey)
    },[props.value.minTime])
   
   
  return (
    <div className="startEndTimeWrapper">
      <div style={{margin: "10px" , height : "30px"}}>
      <div className="inputBorderForm">
        <img src={clockIcon} alt="Email Id Icon" />
        {/* <input
            className="formInputArea"
            type="text"
            placeholder='9:00 PM'
  /> */}
        <input 
         type="number"
          className="dcb-Time"
          name='hourtime'
          value={props.hourVal?props.hourVal:props.value.retryHrTime}
          onChange={(e)=>{handleHourChange(e,props.value)}}
          onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
          onWheel={(e) => { return (e.target).blur() }}
          />
        <span className="time-font">Hrs</span>
      </div>
      <div style={{width: "160px"}}>
        {error.includes("hour") &&
           <ErrorMessage 
           errorMessage = "Hours should be less than 12 hours" />
            }
      </div>
      </div>
      <div style={{margin: "10px" , height : "30px"}}>
      <div className="inputBorderForm">
        <img src={clockIcon} alt="Email Id Icon" />
        <input
         type="number" 
          className="dcb-Time"  
          name='minutetime'
          value={props.minVal?props.minVal:props.value.retryMinTime}
          onChange={(e)=>{handleMinChange(e,props.value)}}
          onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
          onWheel={(e) => { return (e.target).blur() }}
          />
         <span className="time-font">Min</span>
      </div>
      <div style={{width: "200px"}}>
        {error.includes("min") &&
           <ErrorMessage 
           errorMessage = "Minutes should be less than 60 Minutes" />
            }
      </div>
     
      </div>
      
    </div>
  );
}

export default StartTimeEndTime;
