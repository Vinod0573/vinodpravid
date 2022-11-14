import React, { useState } from 'react'
import "./InitialScreen.css"
import initialIcon from "../../../../theme/assets/svg/campaign/initialScreen.svg"
import ProgressBar from '../../../generic/progressBar/ProgressBar'
import UseCaseScreen from '../useCaseScreen/UseCaseScreen'
import backIcon from "../../../../theme/assets/svg/campaign/backicon.svg";
function InitialScreen(props) {
let arr = ["Campaign Creation" , "Scheduler Setting" ,"Data Upload", "Schedule Campaign"]
const [selectUseCasePage , setSelectUseCasePage] = useState(false)

const pushOnNextPage =() => {
  setSelectUseCasePage(prev => true)
}
const toPrevPage =() => {
  setSelectUseCasePage(prev => false)
}
  return (
     selectUseCasePage ?  <UseCaseScreen EditData ={props.EditData}  prevPage = {toPrevPage }/> 
      :  (
    <div className='initial'>
      <div className="backIcon" onClick = {() => props.prevPages()} ><img src={backIcon} className="icon"></img></div>
          <div className='initialScreenWrapperScheduler'>
         <div className='initialScreenOuterDiv'>
             <div className='initialIconScheduler'>
               <img className= "initialScreenIconsrc" src ={initialIcon}></img>
             </div>
             <div className='initialParaScheduler'>
                 <p>Let's get your campaign up and running in 5 easy steps</p>
             </div>
             <div className='initialProgressBarScheduler'>
                 <ProgressBar
                  arr = {arr}
                  currentStep = {5}
                  /> 
                  
             </div>
             <div className='BtnDivScheduler'>
                 <button className='btnSchedulerInitial'
                  onClick={() => pushOnNextPage ()}
                 >
                     Create Campaign
                 </button>
             </div>
         </div>
         </div>
    </div>) 
  )
}

export default InitialScreen