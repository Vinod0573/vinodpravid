import React, { useEffect, useState } from 'react'
import Steps from './Steps'
import "./ProgressBar.css"

function ProgressBar(props) {
  const[currentStep , setCurrentStep] = useState(1)

  const updateSteps =(step) => {
      setCurrentStep(step)
  }
  useEffect(
    () => {
       setCurrentStep(props.currentStep)
    }
    , [props.currentStep]
  )
  let arr =["first" , "second" , "third" , "fourth" , "five"]
  return (
    <div className='progressBarWrapper'>
      <div className='stepWrapper'> 
          
        {props.arr.map((e , i) => {
            return  <Steps key={i} index ={i} label = {e} 
                 currentStep = {currentStep}
                 updateStep ={updateSteps}
                 selected = { i+1 <= currentStep}
                 />
        })}
       
      </div>
    </div>
  )
}

export default ProgressBar