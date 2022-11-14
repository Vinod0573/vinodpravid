import React, { useEffect, useState } from "react";
import "./MaxAttempt.css";
import minusIcon from "../../../../../theme/assets/svg/campaign/minusSign.svg"
import plusIcon from "../../../../../theme/assets/svg/campaign/plusSign.svg"
function MaxAttempt(props) {
  const [inputData, setInputData] = useState(props.MaxAttempt ? props.MaxAttempt : 1);
  const decreceData =() => {
      if(inputData >1){
    setInputData(inputData-1)
      if(props.setCallingDay){
      props.setCallingDay(Number(inputData)-1)
      }
      }
  }
  const increaseData =() => {
    if(inputData <99 ){
  setInputData(Number(inputData)+1)
  if(props.setCallingDay){
    props.setCallingDay(Number(inputData)+1) 
  }
    }
  
}
const setDataByInput =(data) => {
     if(data?.length <=2  && data !=="0"){
       setInputData(data)
     }
}
useEffect(
    () => {
        props.setAttempt(inputData )
    }, [inputData]
)
// useEffect(
//   () => {
//     setInputData(prev => props.MaxAttempt)
//   },[props.MaxAttempt]
// )
  return (
    <div className="maxAttemptsWrapper">
      <div className="outerMaxDiv">
          <div className="imgContainer cursorPointer" onClick={() => {decreceData()}}>
            <img src={minusIcon} ></img>
         </div>
        <div className="imgContainer">
          <input className="inputDiv" 
          type="number"
          value={props?.attemptData?props.attemptData:inputData} 
          onChange= {(e) =>  {
            if(!props.isDataActive){
              setDataByInput(e.target.value)
                props.setCallingDay(e.target.value)
            }
            
           }}
          onKeyDown={e => ["e", "E", "+", "-", "." ].includes(e.key) && e.preventDefault()}
          onWheel= {(e) => {return (e.target).blur()}}
          disabled={props.isDataActive}
          />
        </div>
        <div className="imgContainer cursorPointer" onClick={() => {
         
          increaseData()
        }}><img src={plusIcon} className= "cursorPointer" ></img></div>
      </div>
    </div>
  );
}

export default MaxAttempt;
