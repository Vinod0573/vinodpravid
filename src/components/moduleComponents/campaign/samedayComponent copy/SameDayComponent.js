import React, { useEffect, useState } from "react";
import MaxAttempt from "../../schedulerAllComponent/attempModal/MaxAttempt";
import "./SameDayComponent.css";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as breadcrumActions from "../../../actions/breadcrumActions";


function SameDayComponent(props) {
  const [maxAttempt, setmaxAttempt] = useState();
  const [isActive, setIsActive] = useState();
  const [attemptData,setAttemptData]=useState(1);
  const [storedDay,setStoredDay]=useState("");

  useEffect(()=>{
    if(!isActive){
      props.setCallingDay(attemptData)
    }
  },[isActive])
  
  useEffect(()=>{
    setmaxAttempt(prev=>attemptData.day)
  },[attemptData])

  const callingDay=useSelector((store)=>{
    return store.breadcrumReducer.callingDay
  })

  useEffect(()=>{
    if(callingDay=="Same Day"){
      setIsActive(prev=>true)
    }else{
      setIsActive(prev=>false)
      setStoredDay(prev=>callingDay)
    }
  },[callingDay])
  return (
    <div className="sameDay-wrapper">
      <div
        className={`day-div ${isActive ? "isActive" : ""}`}
        onClick={() => {
          setIsActive((prev) => !isActive);
          props.setCallingDay("Same Day");
          
        }}
      >
        Same Day
      </div>
      <div className={`day-div `}>
        Call Before
      </div>
      <div>
        <MaxAttempt
          attemptData={storedDay}
          setAttempt={setmaxAttempt}
          isDataActive={false}
          day={false}
          setCallingDay={(day) => {
            setIsActive(false)
            props.setCallingDay(day);
            setAttemptData(day)
          }}
        />
      </div>
      <div className={`day-div `}>Days</div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectsameday :state.breadcrumReducer?.selectsamedaybtn
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign({}, breadcrumActions),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SameDayComponent);
