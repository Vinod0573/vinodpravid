import React, { useEffect, useState } from 'react'
import "./ToggleButton.css"

function ToggleButton(props) {
    const {options , getSelectedData ,img1 , img2 ,outSideSelected} = props
    const[active , setActive] = useState( outSideSelected ? outSideSelected : options[0])
   

    const setActiveButton = (data ) => {
       setActive(data) 
    }  
    useEffect(
        () => {
            getSelectedData(active)
        }
        ,[active]
       )   
  return (
    <div className='toggleButton-wrapper'>
        <div className='toggleButtonOuterDiv'>
          <div className= { active ==options[0] ? 'activeDiv' : 'notActiveDiv' }
            onClick = {() => setActiveButton(options[0])}
           > 
              <img src ={ active ==options[0] ? img1?.[1] :img1?.[0]}  className = "imgCampaignTesting"></img>
               <p> {options[0]}</p>
          </div>
          <div className={ active ==options[1]? 'activeDiv' : 'notActiveDiv' } onClick = {() => setActiveButton(options[1])}>
               <img src ={active ==options[1] ? img2[1] :img2[0]} alt= "img" className = "imgCampaignTesting"></img>
               <p> {options[1]}</p>
          </div>
        </div>
    </div>
  )
}

export default ToggleButton