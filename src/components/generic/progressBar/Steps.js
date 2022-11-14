import React from 'react'
import "./Steps.css"
import checkIcon from "../../../theme/assets/svg/demo/checkedIcon.svg"
function Steps(props) {
  return (
    <div className={ `stepBlock ${ (props.selected ) ? 'selected' : ""}`}>
        
        <div className='circlewrapper'
        // onClick={() => props.updateStep(props.index +1)}
        >
       <div className='circle'>
           {props.selected && <img className='imgIcon' src={checkIcon}></img>}
       </div>
    
        </div>
        <div className = "container">
        <span >{props.label}</span>
        </div>
    </div>
  )
}

export default Steps