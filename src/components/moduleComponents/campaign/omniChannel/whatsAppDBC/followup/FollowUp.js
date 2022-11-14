import React, { useEffect, useState } from 'react'
import MaxAttempt from '../../../schedulerAllComponent/attempModal/MaxAttempt'
import StartTimeEndTime from '../../../startTimeEndTime/StartTimeEndTime'
import "./FollowUp.css"
import { useSelector,  } from "react-redux";
import { useDispatch } from 'react-redux';
import {setDCBdataforwhatsApp ,setDCBdataforwhatsAppflowupTime , setNumberOfFollowUp} from "../../../../../../redux/omniChannel/actions";


function FollowUp() {
    const [maxAttempt ,setmaxAttempt] = useState(2)
    const [followUpTime , setFollowUpTime] = useState([{

    }])
    const dispatch = useDispatch()
    const timeflowupObj = useSelector((store) => {
        return store.omniChannelReducer?.dcbDataWhatsAppflowUp;
      });
      const flowUpDBCdata =  useSelector((store) => {
        return store.omniChannelReducer.dcbDataWhatsApp;
      });
  let finalTimeArray =Object.values(flowUpDBCdata)
  const hourChange = (hourValue, propsValue) => {
    getModifiedData(propsValue, hourValue, "retryHrTime");
  };

  const minChange = (minValue, propsValue) => {
    getModifiedData(propsValue, minValue, "retryMinTime");
  };
  const getModifiedData = (Key, time, type) => {
      let flowupArray =  [...timeflowupObj]
     let objflow = flowupArray[Key-1] ? flowupArray[Key-1] : {}
     objflow[type] =time
   
      dispatch(setDCBdataforwhatsAppflowupTime(Key-1 ,objflow ))
    //  let totalTime = Number( timeflowupObj?.[Key-1]?.retryHrTime) *60 + Number(timeflowupObj?.[Key-1]?.retryMinTime)
    //      console.log("vv9", totalTime ,timeflowupObj , timeflowupObj?.[Key-1]?.retryHrTime )
    //   dispatch(setDCBdataforwhatsApp( Key ,totalTime,`${Key}_FollowupInterval`))
    // let tempVal = Object.assign(tableBodyData);

  };
  console.log("abhiji" , maxAttempt)
  useEffect(
      () => {
       let data = timeflowupObj?.map(
           ( e,i) => {
            let totalH =  e?.retryHrTime ? Number( e?.retryHrTime) *60 : 0
            let totalM = e?.retryMinTime  ? Number(e?.retryMinTime) : 0
            let totalTime = totalH +totalM
            dispatch(setDCBdataforwhatsApp( i ,totalTime,`${i+1}_FollowupInterval`))
           }
       )

      },[timeflowupObj]
  )

  useEffect(
      () => {
          if(maxAttempt){
              dispatch(setNumberOfFollowUp(maxAttempt))
          }
      },[maxAttempt]
  )
  return (
    <div className='followupWp-wrapper'>
        <div className='followUp-row'>
            <p className='para-FollowUp'>No of followups in 24 hrs :</p>
             <div className='component-flowUp disableComponentflow'> <MaxAttempt setAttempt={setmaxAttempt} MaxAttempt = {2} /> </div>
        </div>
        { maxAttempt && Array(maxAttempt).fill(0)?.map(( e,i )=> {
         return  <div className='followUp-row'> 
             <p className='para-FollowUp'>{i+1}st Follow Up Time Interval :</p>
             <div className='componentDiv-flowUp'>    <StartTimeEndTime  
                value={i+1}
                handleHourChange={hourChange}
                handleMinChange={minChange}
                hourVal={Math.floor(finalTimeArray[i] /60)}
                minVal={finalTimeArray[i]%60}/>
                </div>
         </div>}
        )
        }
    </div>
  )
}

export default FollowUp